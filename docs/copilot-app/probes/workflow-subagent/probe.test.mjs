import test from "node:test";
import assert from "node:assert/strict";
import { createProbe, MARKER } from "./probe.mjs";

function fixture() {
  const calls = [];
  const session = {
    workflow: {
      async start(workflow) {
        calls.push(workflow);
        return { runId: "probe-1", status: "running" };
      },
      async getRun(runId) {
        return { runId, status: "completed", result: { marker: MARKER } };
      },
    },
  };
  return { ...createProbe((definition) => definition, () => session), calls };
}

test("probe never starts on registration or without confirmation", async () => {
  const { tools, calls } = fixture();
  assert.equal(calls.length, 0);
  const result = await tools[0].handler({ confirmed: false });
  assert.equal(result.resultType, "rejected");
  assert.equal(calls.length, 0);
});

test("authorized start returns admission, not a completion claim", async () => {
  const { tools, calls, workflow } = fixture();
  const result = JSON.parse(await tools[0].handler({ confirmed: true }));
  assert.deepEqual(result, { runId: "probe-1", status: "running" });
  assert.deepEqual(calls, [workflow]);
  assert.equal(workflow.meta.limits.maxTotalSubagents, 1);
});

test("subagent result must contain the exact marker", async () => {
  const { workflow } = fixture();
  const context = (answer) => ({ phase() {}, async agent() { return answer; } });
  assert.deepEqual(await workflow.run(context(` ${MARKER}\n`)), { marker: MARKER });
  await assert.rejects(workflow.run(context(null)), /expected marker/);
  await assert.rejects(workflow.run(context("unexpected")), /expected marker/);
});

test("status checks reject missing IDs and report only verified markers", async () => {
  const { tools } = fixture();
  assert.equal((await tools[1].handler({ runId: "" })).resultType, "rejected");
  assert.deepEqual(JSON.parse(await tools[1].handler({ runId: "probe-1" })), {
    runId: "probe-1", status: "completed", markerMatched: true,
  });
});

test("failed runs do not report a matching marker and API failures propagate", async () => {
  const session = {
    workflow: {
      async getRun(runId) {
        if (runId === "missing") throw new Error("Run not found");
        return { runId, status: "error", result: { marker: MARKER } };
      },
    },
  };
  const { tools } = createProbe((definition) => definition, () => session);
  assert.equal(JSON.parse(await tools[1].handler({ runId: "failed" })).markerMatched, false);
  await assert.rejects(tools[1].handler({ runId: "missing" }), /Run not found/);
});
