import test from "node:test";
import assert from "node:assert/strict";
import { createHash, randomUUID } from "node:crypto";
import { mkdtemp, readFile, rename, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const digest = (content) => createHash("sha256").update(content).digest("hex");

async function fixture(t) {
  const dir = await mkdtemp(join(tmpdir(), "myforge-stale-probe-"));
  t.after(() => rm(dir, { recursive: true }));
  const live = join(dir, "live.json");
  const draft = join(dir, "draft.json");
  const base = '{"value":"base"}\n';
  await writeFile(live, base, { flag: "wx" });
  await writeFile(draft, '{"value":"draft"}\n', { flag: "wx" });
  return { dir, live, draft, baseDigest: digest(base) };
}

// Deliberately non-production: this illustrates why check-then-rename is not CAS.
async function unsafeCandidate({ dir, live, draft, baseDigest }, beforeRename) {
  const draftContent = await readFile(draft, "utf8");
  const current = await readFile(live, "utf8");
  if (digest(current) !== baseDigest) return "conflict";
  const staged = join(dir, `staged-${randomUUID()}.json`);
  await writeFile(staged, draftContent, { flag: "wx" });
  if (beforeRename) await beforeRename();
  await rename(staged, live);
  return "saved";
}

test("a stale save is rejected and both versions remain", async (t) => {
  const files = await fixture(t);
  const external = '{"value":"external"}\n';
  await writeFile(files.live, external);
  assert.equal(await unsafeCandidate(files), "conflict");
  assert.equal(await readFile(files.live, "utf8"), external);
  assert.equal(await readFile(files.draft, "utf8"), '{"value":"draft"}\n');
});

test("an unchanged base allows the candidate to replace the live fixture", async (t) => {
  const files = await fixture(t);
  assert.equal(await unsafeCandidate(files), "saved");
  assert.equal(await readFile(files.live, "utf8"), '{"value":"draft"}\n');
  assert.equal(await readFile(files.draft, "utf8"), '{"value":"draft"}\n');
});

test("an external write after the check is lost, despite atomic rename", async (t) => {
  const files = await fixture(t);
  const external = '{"value":"external"}\n';
  const result = await unsafeCandidate(files, () => writeFile(files.live, external));
  assert.equal(result, "saved");
  assert.equal(await readFile(files.live, "utf8"), '{"value":"draft"}\n');
  assert.notEqual(await readFile(files.live, "utf8"), external);
});
