export const MARKER = "MYFORGE_PROBE_OK";
export const WORKFLOW_NAME = "myforge-capability-probe";

export function createProbe(defineWorkflow, getSession) {
  const workflow = defineWorkflow({
    meta: {
      name: WORKFLOW_NAME,
      description: "Run one harmless MyForge capability probe subagent.",
      phases: [{ title: "Probe" }],
      limits: { maxTotalSubagents: 1, maxConcurrentSubagents: 1 },
    },
    run: async (ctx) => {
      ctx.phase("Probe");
      const result = await ctx.agent(
        `Reply with exactly ${MARKER}. Do not use any tools, read files, or change anything.`,
        { label: "myforge-capability-probe" },
      );
      if (typeof result !== "string" || result.trim() !== MARKER) {
        throw new Error("Probe subagent did not return the expected marker.");
      }
      return { marker: MARKER };
    },
  });

  const tools = [
    {
      name: "myforge_probe_start",
      description:
        "Start one billable, harmless subagent probe only after the user explicitly authorizes this invocation.",
      parameters: {
        type: "object",
        properties: { confirmed: { type: "boolean" } },
        required: ["confirmed"],
      },
      handler: async ({ confirmed }) => {
        if (confirmed !== true) {
          return {
            resultType: "rejected",
            textResultForLlm: "Explicit user authorization is required before starting the probe.",
          };
        }
        const run = await getSession().workflow.start(workflow);
        return JSON.stringify({ runId: run.runId, status: run.status });
      },
    },
    {
      name: "myforge_probe_status",
      description: "Inspect the status of an explicitly supplied probe run ID.",
      parameters: {
        type: "object",
        properties: { runId: { type: "string" } },
        required: ["runId"],
      },
      handler: async ({ runId }) => {
        if (typeof runId !== "string" || !runId.trim()) {
          return {
            resultType: "rejected",
            textResultForLlm: "A nonempty run ID is required.",
          };
        }
        const run = await getSession().workflow.getRun(runId);
        return JSON.stringify({
          runId: run.runId,
          status: run.status,
          markerMatched: run.status === "completed" && run.result?.marker === MARKER,
        });
      },
    },
  ];

  return { workflow, tools };
}
