# Execution and recovery contract

**Status:** Proposed for N01 review. No execution mode described here is
qualified for the MyForge extension. This document specifies required behavior,
not APIs or controls that are already available.

## Mode selection

The operator sees the available, qualified modes and explicitly selects one
before execution. Prefer app-managed project sessions when their creation,
handoff and workspace behavior have been verified through the extension's
actual host integration. Offer workflow-owned subagents only after their
execution and recovery behavior has been independently qualified. If neither
mode is qualified, show a blocker and do not dispatch. Do not silently substitute
another mode, a CLI, detached engine or undocumented API.

An interactive app conversation creating a child session does not prove that an
extension can create one. A worker returning a marker does not prove workspace
access, isolation or recovery. Surface these distinctions and the selected mode
in the canvas and evidence. Run sequentially until isolation and integration
of concurrent work are demonstrated; a worktree alone is not a security
boundary. Do not imply that closing or restarting the app preserves a run.

## Dispatch and handoff

Before a dispatch, require current human-approved spec and plan definitions,
valid dependencies and phase gates, a prepared team, and a selected, qualified
mode. A work item must have one owner and a bounded brief with its stable ID,
attempt number, relevant approved revisions, inputs, deliverables, checks and
acceptance criteria. Specify permitted workspace and expected handoff without
embedding secrets or unrelated project content.

Persist the intent and attempt identity before requesting dispatch. If the
host returns a native session, worker or run ID, record it as an observation,
not as evidence of completion. Admission is not execution or success. Preserve
the actual mode, identity where available, result, changed paths and check
outcomes; reconcile changes before importing results from an isolated worktree.
Do not treat a worker's self-report as verification. Verify deliverables and
declared checks independently before completing the item and attaching evidence
to the authoritative plan. The phase gate is a separate decision.

App session IDs, runtime worker IDs and canvas instance IDs are distinct
namespaces; use the ID and provider returned by the owning API. Never infer
that a host has accepted a message, started a worker or completed work when it
has not reported that outcome.

JSON schema validation alone cannot authenticate a human review or authorize
an installation: the implementation must obtain those decisions through a
trusted human-facing host flow and bind them to the reviewed content. A
`pending` external skill can be recorded as a recommendation, but cannot be
installed or replaced without explicit human approval.

## Failures, uncertainty and recovery

- Failed checks, missing deliverables, denied permissions, unavailable modes
  and unresolved conflicts block completion with an actionable explanation.
- If dispatch admission or a worker's outcome is uncertain, stop further
  dispatch for that item. Inspect known host identities, the authoritative
  plan, evidence, worktree status and partial outputs. Preserve unrelated user
  work and never assume the original worker has stopped.
- An interruption is not success. Record the observed failure or interruption
  and any unknowns. Do not automatically resume, resend or create a replacement
  while the previous attempt may still be active.
- The operator reviews partial changes and chooses a safe resolution. When the
  earlier attempt is confirmed inactive and reconciliation is complete, a
  retry is a new, recorded attempt; do not claim exactly-once execution.
- A stale artifact edit must preserve the draft and live content and require
  reconciliation as specified in the [artifact contract](README.md).
  Preserve failed attempts and evidence; never erase them to make a run appear
  successful.
- Never auto-commit or overwrite existing project content without authorization.
  Expose pause, cancel, resume or other controls only if the selected mode's
  behavior has been demonstrated. Do not substitute human approval with an
  agent decision.

## Distribution, permissions and storage

The operator deferred the distribution decision on 2026-11-28. Project-scoped,
user-scoped and plugin distribution remain candidates, not promises. Before
dependent implementation or release, establish a supported distribution path,
trust and permissions prompts, required filesystem access, update and removal
behavior, and a safe mechanism for installing or replacing extensions.

The accepted artifact-location basis is `.myforge/` in the target project.
Read access to an existing project file and an extension-origin write to a
disposable worktree fixture have been observed. Atomic updates, host-managed
concurrent-edit reconciliation, retention and recovery have not been
qualified. Session workspace storage is not a
substitute for durable project artifacts. Credentials and private diagnostics
must not enter public project evidence; access and retention decisions for
private evidence remain open.

## Qualification required

Record source revision, app and runtime versions, procedure, expected and actual
results and limits for each check in the [evidence ledger](../../evidence/README.md).
Do not mark N01 accepted until the operator reviews the contract and the
evidence protocol's gate requirements are met. At minimum the evidence must
cover the advertised extension-origin dispatch mode, real workspace writes and
conflict handling, interruption and operator-led recovery, and a resolved
distribution/permissions/storage path. Any unavailable requirement remains
visibly blocked.
