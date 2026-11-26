# P04: durable ownership, recovery and review safety

[Main plan](../IMPLEMENTATION-PLAN.md) | [Previous](03-native-execution.md) | [Authoring](05-authoring-and-packaging.md) | [Canvas](06-canvas-and-control.md)

**Prerequisite:** G03. **Exit:** G04. **Status:** not started.
**Requirements:** APP-06-APP-10, APP-16, APP-20.
**Sources:** S-03-S-05, S-08-S-10, S-13.

## Deliverables and work checklist

- [ ] **P04-T01:** Implement one durable workflow owner and attempt identity,
  including app/plugin/session reload and duplicate extension instances.
  Choose storage/locking from P01/P02 evidence; do not assume PID identity,
  shared local paths, graceful shutdown or extension uniqueness.
- [ ] **P04-T02:** Reconcile in-flight native sessions before deciding retry,
  cancellation or continuation. Persist before external dispatch and after
  settlement; an unknown result must block safely rather than rerun blindly.
  Recovery must not depend on a final shutdown callback.
- [ ] **P04-T03:** Implement safe pause/stop/resume/replay and state revision
  checks. Define behavior during dispatch, verification and integration;
  preserve manual selection and relevant phase fingerprints on reconciliation.
- [ ] **P04-T04:** Reuse content-bound operator attestation. App controls and
  agent-callable methods must not manufacture approval; relevant requirements
  edits invalidate evidence. Preserve validation gaps shown to dependent review.
- [ ] **P04-T05:** Implement explicit state import/compatibility validation,
  backups and recoverable failure. Preserve stable completed IDs only under
  accepted reconciliation semantics; quarantine incompatible or corrupt state.
- [ ] **P04-T06:** Freeze authoring/canvas interfaces: immutable projections,
  revision-aware controls, operator identity boundary, attempt evidence and
  error shapes. P05/P06 may begin independently only after this gate.

Outputs: ownership/recovery implementation, migration contract, human review
boundary, fault-injection tests and stable UI/authoring interfaces.

## Specific future sub-agent opportunities

A recovery specialist owns lifecycle and fault-injection fixtures; a human-review
specialist audits attestation and requirement edit behavior; a migration
specialist prepares compatibility fixtures after schema decisions. Do not run
multiple writers against a shared test repo; isolate fixtures and let the
coordinator own state transitions. Review agents cannot accept G04 or approval
records on behalf of a human.

## Validation and exit gate G04

Run V07-V09, V11, V12 and import parts of V18. Interrupt at multiple boundaries;
reopen, reload plugins and introduce duplicate owners. Assert no lost settled
evidence, duplicate effect, unsafe retry or success-shaped fallback. Check
Windows immediate teardown as well as macOS/Linux shutdown behavior.

Pause/resume is demonstrated in real app sessions; hard-crash recovery is safe.
Operator-only approval and digest invalidation pass. Backups/restoration work
without editing canonical requirements or unrelated user files. Interface
consumers and documented errors are stable for P05/P06.

**Risks:** R02/R04/R05/R08. **Evidence:** E-P04-* with checkpoint/attempt
identities, controlled fault procedures and human review observations.
