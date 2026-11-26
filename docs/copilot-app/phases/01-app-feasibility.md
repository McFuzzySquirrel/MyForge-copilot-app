# P01: prove app-managed feasibility

[Main plan](../IMPLEMENTATION-PLAN.md) | [Previous](00-baseline-and-traceability.md) | [Next](02-contracts-and-core.md)

**Prerequisite:** G00. **Exit:** G01. **Status:** in progress; the operator
approved evaluating workflow-owned subagents without requiring separate app
project sessions (E-P01-010). Interrupted-worker recovery and non-Copilot provider
routing remain unverified; v1 is sequential (D-11) and task-scope only (D-12).
**Requirements:** APP-01, APP-07, APP-12,
APP-13, APP-14; evaluate APP-18 separately, do not require it for G01.
**Sources:** S-03, S-07, S-13 and the main plan's external API references.

## Deliverables and work checklist

- [ ] **P01-T01:** Record supported app, CLI and extension SDK versions and
  exact public API references; compare baseline `HarnessAdapter` requirements
  with extension-callable APIs. Distinguish built-in agent tools, external SDK
  clients, workflow-owned subagents and actual app-owned sessions.
- [ ] **P01-T02:** On a trusted disposable repository on Linux,
  install the smallest probe extension/canvas. Capture the actual composition
  root, workspace identity, trust prompts, permissions and extension ownership.
  This future probe must be reviewable and removable; no production behavior.
- [ ] **P01-T03:** Demonstrate extension-driven workflow-owned task dispatch,
  observation, terminal outcome, cancellation and resume, including
  specialist/model choice. Capture requested versus actual route and task/run
  identities. Separate project sessions are not required. No independent CLI
  child, detached engine or private undocumented API counts as proof.
- [ ] **P01-T04:** Exercise app quit/restart, window close, canvas close, plugin
  reload and duplicate instances. Establish host ownership and reachable durable
  state; prove safe reconciliation or identify the exact missing capability.
- [ ] **P01-T05:** Publish a capability matrix by platform/version/provider:
  supported, unsupported, experimental, or not tested. Resolve Q01/Q02 and
  document candidate approaches and a human go/no-go decision.

Outputs: capability report, probe source/procedure, redacted observations and
explicit decision. The disposable canvas probe exists in a separate uncommitted
worktree; its final artifact location and runtime dependencies remain undecided.

## Preliminary Linux capability matrix

These are observations, not the G01 decision. The serving app reported `1.5.0`;
the probe session reported bundled CLI `1.0.115-7` and SDK protocol `4`
(E-P01-006). The separate SDK package version remains unknown. The host CLI
reported in E-P01-002/E-P01-005 is not assumed to be the bundled CLI.

| Capability | Status | Evidence or gap |
| --- | --- | --- |
| Project extension and canvas load | Observed; partial | E-P01-004 is a probe-session report; trust/version failure paths remain untested. |
| Distinct canvas instances, close and reopen | Observed; partial | E-P01-006 is a probe-session report; visual rendering and app restart remain untested. |
| Extension-originated workflow-owned subagent | Experimental; observed | E-P01-014 reports one completed worker launched through the disposable extension. Isolation, routing, cancellation and recovery remain unproven. |
| Separate project-session dispatch | Disabled in probe session; not required | `session.rpc.management.create` was disabled (E-P01-008); the operator approved evaluating workflow-owned subagents instead (E-P01-010). |
| Task cancellation, resume and crash reconciliation | Partial | E-P01-015 reports same-provider checkpoint/resume, E-P01-016 cancellation, and E-P01-018 paused-checkpoint restart. E-P01-020 reports that an active-worker quit left the run in error with a cancelled worker; E-P01-021 shows a one-worker cap blocked a replacement on resume. Interrupted-worker recovery and hard-crash recovery remain unproven. |
| Per-task workspace isolation and integration | Deferred for v1 | E-P01-022 found no documented per-worker directory, worktree or sandbox option; the operator chose sequential execution for the initial release (E-P01-023). |
| Specialist/model selection and provider routing | Partial | E-P01-025 reports a requested model matching the resolved model for one worker; run detail has no provider field, E-P01-032 shows a fabricated model ID failed visibly after admission rather than rerouting, though requested and resolved both echoed the invalid ID. Valid-but-unavailable, BYOK and local-provider routes remain untested. |
| Task/phase session scope | Task scope only for v1 | E-P01-026: workflow workers cannot continue a prior conversation, so phase scope is deferred (D-12). |
| No hidden runtime during dispatch (V01) | Inconclusive | E-P01-031 captured the process tree during an active worker with no `-p`/`--prompt` process, but one transient process exited before identification; snapshots cannot prove absence. |
| Extension reload during an active worker | Observed; partial | E-P01-033: reload halted the run (`workflow_provider_disconnected`) and cancelled the worker; the reloaded provider rediscovered the same run by saved ID without a second dispatch. Execution did not continue. |
| Duplicate canvas starts | Observed; partial | E-P01-029: two concurrent panel starts in one provider admitted one run via a durable lock. Independent provider processes untested. |
| Desktop close, quit and restart | Partial | E-P01-018 resumed a paused workflow after restart. E-P01-020 shows the active worker did not continue across quit; E-P01-034 shows an active worker completed across an operator-confirmed window close without quit, with app/runtime/provider unchanged. |

## Recovery probe preparation

Do not run this until the extension has a supported workflow-owned task
dispatch path and the operator has saved unrelated work. If dispatch is
unavailable, record recovery as blocked rather than substituting an external
SDK session or hidden CLI process.

For an initial settled-checkpoint test, obtain explicit authorization for the
SDK start and resume and for operator-led app quit/restart. Prepare a reviewed
one-shot probe with a journaled non-secret nonce, a checkpoint before worker
dispatch, and an action that resumes only a validated, explicitly supplied run
ID. The previous probe's in-memory ID and consumed guard do not survive restart.
Before quit, privately preserve the exact session and run IDs, checkpoint, nonce,
status, limits and worker count; require a paused, resumable run with no workers.
After the operator reopens the same session and extension, inspect the same run
and journal before resuming it once. Stop on missing state or uncertain admission,
not with a replacement run or blind retry. Compare the returned nonce and
terminal worker details. A matching nonce supports replay of that journaled
step, not exactly-once effects. This test does not cover interruption of active
work. See E-P01-017.

Separately, test in-flight recovery only with its own operator authorization.
Before quit, confirm and persist the original run and active worker identities,
status and journal, and check for other active sessions. The operator must quit
and reopen the app. Inspect the same run without automatically resuming or
replacing its worker; record whether it remains active, settles, or becomes
halted. Stop if the worker has already settled before quit or admission is
uncertain. Resume a halted run only with separate authorization and after
checking the cumulative worker budget; never assume reattachment or raise the
limit silently. This is a normal-quit test, not a hard-crash test. See
E-P01-019.

1. In a disposable Linux project, prepare one bounded task with no external
   effects and an observable completion marker. Record the app/CLI/SDK
   versions, run/attempt and worker identity, and the number of
   dispatch requests in private evidence.
2. Start the task through the extension. Once in-flight status is observable,
   have the operator fully quit the app; do not terminate unrelated processes.
   Record whether the task settled, continued or became indeterminate.
3. Reopen the app and project. Reconcile the original workflow and attempt
   before any retry. Verify that no second dispatch occurred; if the outcome
   cannot be established, the extension must block rather than guess success
   or automatically dispatch again.
4. Separately exercise supported pause and resume controls, recording their
   actual states and whether the same attempt/worker is resumed or replaced.
   Preserve failed or unsupported results in the evidence ledger.

This tests interruption handling only; it does not claim continuation after
app quit. Repeat at verification and integration boundaries when those
boundaries exist, and keep logs and session identifiers in approved private
storage.

## Specific future sub-agent opportunities

A documentation researcher can inventory versioned APIs without accessing
credentials. A Linux platform specialist can run the approved probe on a
test host. A runtime reviewer can compare
results against APP-01/APP-07 without modifying the probe or scheduler.
Coordinator owns the shared probe/API contract; platform agents must not
rewrite that contract or infer support from another platform.

## G01 review draft (pending operator decision)

This draft summarizes E-P01-001 to E-P01-034 for the operator. It is not an
acceptance; the operator records go or no-go.

**Proposed Q01 answer.** Qualify only the observed Linux configuration:
serving desktop app `1.5.0`, bundled CLI `1.0.115-7`, SDK protocol `4`
(E-P01-006); the separate SDK package version is unknown. The dispatch API is
the experimental Dynamic Workflows surface: `session.workflow.start`,
`getRun`, `getRunDetail`, `cancel` and `resume` from a project extension, with
`ctx.agent` workers, `ctx.step` journals and `ctx.pause` checkpoints
(E-P01-013). Host-managed session creation is disabled (E-P01-008). Session
scope is task-only (D-12). Pin these versions; any change requires re-running
the P01 probes (R02).

**Proposed Q02 answer.** The extension runs as a project-scoped Node provider
forked by the app runtime and joined to the foreground session (E-P01-004,
E-P01-030). Workers run in the session workspace; the SDK offers no per-worker
directory, worktree or sandbox, so v1 is sequential (D-11, E-P01-022). The
environment is not sandboxed; permissions and trust are the app's ordinary
session settings, and SDK-originated start and resume do not prompt. The probe
stored durable locks and run identities in the session's `files/` directory;
workflow journals are runtime-managed. The production state location is
decided in P02 (Q03).

**Assessment against G01.**

| Criterion | Result | Evidence |
| --- | --- | --- |
| App-managed dispatch, observation and terminal outcome | Met (experimental API) | E-P01-014, E-P01-029 |
| Cancellation | Met | E-P01-016 |
| Pause/resume and paused restart | Met | E-P01-015, E-P01-018 |
| Active work across quit or extension reload | Interrupted, rediscoverable, no double dispatch; retry as a new attempt (D-13) | E-P01-020, E-P01-021, E-P01-033 |
| Active work across window close | Continued | E-P01-034 |
| Duplicate starts | One admission via durable lock (single provider) | E-P01-029 |
| No hidden runtime (V01) | Inconclusive; no positive evidence of an unauthorized runtime | E-P01-030, E-P01-031 |
| Model routing | Requested model reported as resolved; invalid model fails visibly | E-P01-025, E-P01-032 |
| Provider routing (APP-13) | Not observable; provider identity absent from run detail | E-P01-024, E-P01-025 |
| Hard crash, independent providers, BYOK/local providers | Not tested | — |

**Recommendation: conditional go** for the sequential, task-scope, Linux-only
v1 on the pinned versions, with these conditions:

1. Accept V01 as "no positive evidence of an unauthorized runtime", and add a
   recurring process check to P03 validation.
2. Narrow APP-13 for v1 to Copilot catalog models with requested-versus-resolved
   model checks; provider identity, BYOK and local providers are deferred or
   reported as unavailable, never claimed.
3. Carry hard-crash and lease-expiry recovery into P04 as mandatory tests
   (V07); D-13 governs interrupted attempts.
4. Treat the experimental workflow API as a pinned dependency risk (R02).

The no-go alternative is to stop at P01 and record the missing capabilities
above, chiefly provider observability and continuation of active work after a
quit or extension reload.

## Validation and exit gate G01

Run V01/V02 and lifecycle portions of V07/V08/V16 in actual app sessions.
Capture install/log paths, process ownership and applicable run/worker IDs without
credentials. App-native lifecycle must permit deterministic orchestration,
truthful terminal outcomes, independent validation and recovery on the initial
Linux configurations claimed as supported; evidence cannot consist solely of
screenshots, release notes or mocks. Windows and macOS are deferred to a
potential v2 and do not block G01.

Operator accepts a supported approach or records **no-go** with missing APIs.
If mandatory support is absent or not tested, P02-P08 remain blocked pending
operator scope revision. Do not substitute prompt-only coordination for parity.
Continue-after-close may remain unresolved and unavailable.

**Risks:** R01/R02/R03/R10. **Evidence:** E-P01-* with API permalinks, host matrix,
probe results and human decision. No G01 acceptance exists yet.
