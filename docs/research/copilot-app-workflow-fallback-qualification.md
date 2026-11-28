# Copilot app workflow fallback qualification

**2026-11-28 · Research, not qualification or approval.** Experimental
workflow-owned workers are a plausible **sequential** fallback, not equivalent
to app-managed project sessions or a qualified MyForge execution mode. A
bounded extension-origin dispatch has been observed, as have cancellation,
checkpoint restart and interruption outcomes in earlier disposable sessions.
Safe recovery of an interrupted working task, workspace isolation and the
complete N01 contract remain unproven.

## Source scope

The serving desktop app reports version **1.5.0**. Its extension guide points
to the local SDK root
`/tmp/.mount_GitHubPhCLng/usr/lib/GitHub Copilot/copilot-sdk`; the mount is
host-specific and may disappear. Paths below are relative to that root, with
line numbers from the inspected bundle. `cliVersion.d.ts:1` declares CLI
`1.0.115-7`; `sdkProtocolVersion.d.ts:1-5` declares protocol `4`. These are
declarations, not the independently measured CLI process or SDK package
version. The [pinned public SDK workflow reference](https://github.com/microsoft/copilot-sdk/blob/661f503e957165d29a16918efb1b629e6b5db85a/nodejs/docs/workflows.md)
is a useful durable reference, but has not been established as identical to
this bundle.

The following are **documented API behavior**, not new host tests:

| Area | Bundled primary source and implications |
|---|---|
| Dispatch | `docs/extensions.md:19-23,64-69`, `extension.d.ts:39-45,57-71`, `docs/workflows.md:1-45`: an extension joins the foreground session and registers `defineWorkflow` handles; the experimental workflow runs `ctx.agent`. Workflows are not declared in request-driven `extension.json`. `workflow.d.ts:318-351`: `start` returns admission, while `run` and `resume` wait for the attempt to settle. SDK run/resume do not request permission; enforce explicit human authorization outside the SDK. No nested workflows (`docs/workflows.md:74-79`). |
| Identity and visibility | `workflow.d.ts:43-55,137-156,195-201,251-259`: a worker may use a catalog name or workflow-local opaque agent reference; references are not global catalog entries. `generated/rpc.d.ts:46495-46559,47236-47248,47281-47373`: run ID, attempt and direct worker `agentId`, `toolCallId`, label, type, status and optional model are distinct; labels are non-unique. No child session ID or workspace appears in the worker summary. `docs/workflows.md:79,250-303`: workflow workers are hidden from `read_agent`/`write_agent`; inspect them via the owning session's workflow APIs. A requested or resolved model is not a provider identity. |
| Failure and limits | `docs/workflows.md:81-104,136-152`: identical prompt/options calls, including label, are memoized; an ordinary worker failure can return `null`. Cancellation and hard failures reject instead. Total admissions, active time and spend accumulate across attempts; credit and time limits are soft, and spend is post-paid. `workflow.d.ts:137-156` exposes worker timeout and model options, but no per-worker workspace or sandbox option. A no-tools instruction is not enforcement. |
| Inspection and cancellation | `workflow.d.ts:351-395`, `docs/workflows.md:250-303`: use `getRun`, paged `listRuns`, `getRunDetail`, `getRunProgress` and `waitForRun`; a paused attempt is settled but resumable. `workflow.run_updated` is an ephemeral invalidation, not a complete log; reread durable state. Aborting a wait **does not stop** a run; `cancel(runId)` or `pause(runId)` is a separate operation. Observation requires a valid owning session; eligibility, missing runs and storage failures must be surfaced, not silently treated as empty history. |
| Persistence and recovery | `docs/workflows.md:59-77,187-214,234-258`: `ctx.step` replays by key, but is best-effort at-least-once across crashes/concurrent callers; side effects must be idempotent and keys versioned. `ctx.pause` is a one-shot checkpoint; resume restarts the body using the run's journal/accounting. On runtime disappearance, documented lease expiry plus subsequent observation reconciles to `halted`; unpersisted spend is not reconstructed. Custom session filesystems need SQLite support. `workflow.d.ts:297-311` also declares `workflow_role_definition_mismatch`; the bundled prose's resume-error list is narrower. None of these declarations proves restart recovery on a particular host. |

## Existing real-host evidence

All findings below are bounded to their recorded Linux app configurations;
historical P01 reports are probe-session observations, not independent
reproduction in this investigation. Raw IDs and private diagnostics belong in
private evidence, not this note.

- [E-P01-014](../copilot-app/evidence/README.md#e-p01-014-extension-originated-workflow-dispatch)
  reports one extension-origin worker and marker completion. Separately,
  [E-N01-005](../copilot-app/evidence/README.md#e-n01-005-bounded-subagent-response)
  records the repository probe returning its marker; its no-workspace-operations
  statement is explicitly narrowed by
  [E-N01-009](../copilot-app/evidence/README.md#e-n01-009-corrections-to-prior-evidence):
  the marker does not prove tool non-use.
- [E-P01-015](../copilot-app/evidence/README.md#e-p01-015-extension-originated-checkpoint-resume)
  observed same-provider checkpoint replay; [E-P01-018](../copilot-app/evidence/README.md#e-p01-018-paused-checkpoint-app-restart)
  observed paused-run journal and nonce recovery across operator-led app restart.
  Neither proves exactly-once side effects or recovery of an active worker.
- [E-P01-016](../copilot-app/evidence/README.md#e-p01-016-extension-originated-cancellation)
  observed cancellation of one active worker. After an active-worker app quit,
  [E-P01-020](../copilot-app/evidence/README.md#e-p01-020-active-worker-app-quit)
  found an error, cancelled worker and persisted nonce;
  [E-P01-021](../copilot-app/evidence/README.md#e-p01-021-interrupted-run-resume-under-a-one-worker-cap)
  found resume failed at the cumulative one-worker cap, not reattachment.
  [E-P01-033](../copilot-app/evidence/README.md#e-p01-033-extension-reload-with-an-active-worker)
  found reload halted the run and cancelled its worker; [E-P01-034](../copilot-app/evidence/README.md#e-p01-034-app-window-close-without-quit)
  observed completion across a window close without process exit. These are
  different interruption modes; none demonstrates hard-crash recovery.
- [E-P01-022](../copilot-app/evidence/README.md#e-p01-022-workflow-worker-workspace-isolation-inspection)
  found no documented per-worker worktree sandbox. [E-P01-025](../copilot-app/evidence/README.md#e-p01-025-explicit-model-workflow-worker-probe)
  observed requested/resolved model equality but not provider identity and
  incurred substantial credits; [E-P01-032](../copilot-app/evidence/README.md#e-p01-032-invalid-model-negative-probe)
  shows matching model fields can coexist with failure. Neither proves strict
  provider routing. [E-P01-026](../copilot-app/evidence/README.md#e-p01-026-operator-decision-on-session-scope)
  records task scope only; [E-P01-027](../copilot-app/evidence/README.md#e-p01-027-operator-decision-on-interrupted-worker-recovery)
  records a proposed new-attempt recovery decision, not an implementation.

## Proposed bounded real-host probe — not run

Use the [existing opt-in probe](../copilot-app/probes/workflow-subagent/README.md)
as a starting point, not as a ready-made interruption test: its
[`probe.mjs`](../copilot-app/probes/workflow-subagent/probe.mjs) has only
start/status controls and no durable checkpoint, detail, cancel or recovery
controls. A separately reviewed disposable variant must add these controls
by explicit run ID, a versioned journaled random nonce and a pause before
dispatch; it must not automatically resume or spawn a replacement. It should
expose read-only `getRun`/`getRunDetail` and cancellation, and a supervised
nonblocking resume control so inspection can proceed while `resume()` waits.
Report asynchronous errors rather than losing them. Capture the nonce through
the probe's own reviewed control, not an assumed journal-inspection API;
preserve the run ID and nonce privately outside extension process memory. Do
not copy or load it until the operator authorizes preparation and any
necessary extension reload.

1. **Preconditions:** trusted disposable project/session with known clean
   baseline and no unrelated active work; record app/bundle versions and
   reviewed probe revision. Confirm the same session and provider registration
   can be reopened, storage supports workflow persistence, and the operator
   knows how to stop the probe. No policy changes, dependency installation,
   real task edits or external data. A prompt asking for no tools is not
   isolation; use a reviewed available tool restriction if supported and
   independently inspect workspace state.
2. Obtain explicit consent for **one** billable Auto-routed worker, total and
   concurrent caps of one, and operator-selected time and credit ceilings.
   The ceilings are soft. Start once, save session/run IDs privately, and verify
   the run pauses after journaling the nonce with zero workers. Admission alone
   is not success. Stop on unsupported API, uncertain identity or storage
   error; do not retry.
3. Obtain separate consent for one resume that may start that worker. Resume
   once via that nonblocking control, observe the same run and a live worker
   using `getRunDetail`, then issue one `cancel(runId)` while still active. If
   concurrent observation/cancellation is unavailable, stop and record unknown;
   do not pretend a blocking `resume()` has finished. If it already completed,
   record **unknown/inconclusive** for active cancellation; do not rerun
   without fresh consent. Inspect the terminal envelope, direct worker status,
   live and total counts, limits, nonce and workspace diff. Abort a wait only to
   stop waiting, not as a substitute for cancellation.
4. **Pass** only for this bounded cancellation if the same run reports
   cancelled, its one worker is inactive/cancelled, live count is zero, total
   admissions stay at one, nonce matches and independent workspace inspection
   finds no unexpected changes. **Fail** on contradictory state, extra admission
   or unexpected edits. **Unknown** if identity, activity, terminal state,
   workspace evidence or accounting cannot be established; a missing
   observation is not a pass. Report scoped observations and soft-budget
   uncertainty, not eventual zero cost or proof of isolation.
5. Optional **separate** active-interruption exercise requires fresh consent
   for another bounded worker and, separately, operator-led app quit/reopen;
   never restart on the strength of worker consent. After confirmed active
   state, the operator quits and reopens the same session; inspect the saved
   run, provider registration, nonce, status, counts and workspace read-only.
   If the worker finished before interruption or identity cannot be recovered,
   the result is unknown. A halted/error/cancelled run with zero live workers
   establishes only observed interruption, not successful task recovery.
   Never simulate a hard crash or force-kill without separate authorization.
6. **Recovery is operator-led:** preserve the partial diff and evidence,
   establish the original worker is inactive, reconcile changes against the
   clean baseline without overwriting unrelated work, and record an interrupted
   attempt. Only after explicit fresh approval may a new attempt receive its own
   bounded worker allowance; never raise the cancelled run's cap or blindly
   resume/retry. If inactivity or reconciliation cannot be established, stop
   blocked. Verify any resulting changes and checks independently.
7. After all runs settle and the operator has preserved evidence, remove only
   the specifically staged disposable probe files, preserving unrelated files;
   reload extensions only with separate authorization. If a run may still be
   live, do not clean up its provider; report the unresolved state. Sanitize
   public evidence and keep IDs, raw logs and sensitive paths private.

## Exact remaining gaps

The probe above would not establish actual task edits, stale-write conflict
resolution, durable MyForge attempt-to-worker mapping, specialist identity,
per-worker filesystem confinement, concurrent worktree isolation, provider
identity/strict routing, active-worker reattachment, hard-crash lease recovery,
or exactly-once effects. A completed new attempt would not prove reuse of the
old worker. The existing [proposed execution contract](../copilot-app/contracts/v1/execution.md)
still requires verified extension-origin execution and recovery, project writes
and conflict handling, distribution/permissions/storage decisions and human
gate review. Separate app-managed project-session creation from an extension
is also unproven; conversation-created child sessions are not evidence of it.
