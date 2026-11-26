# P02: reviewed contracts and reusable deterministic core

[Main plan](../IMPLEMENTATION-PLAN.md) | [Previous](01-app-feasibility.md) | [Next](03-native-execution.md)

**Prerequisite:** accepted G01. **Exit:** G02. **Status:** not started.
**Requirements:** APP-03, APP-04, APP-15, APP-19.
**Sources:** S-01-S-06, S-09, S-10, S-12, S-13.

## Deliverables and work checklist

- [ ] **P02-T01:** Translate APP requirements into reviewed canonical app PRD
  and feature/task contracts. Resolve ownership and requirement reference
  paths, phase prerequisites and human approval tasks; validate rather than
  generate a manifest by hand. Planning task IDs remain traceable aliases.
- [ ] **P02-T02:** Inventory full engine parity, including settings, validation,
  automated phase review, manual selection, session scopes, usage, replay and
  retirement/incremental workflows. Link baseline behavior/tests and classify
  transport-only versus semantic changes. Any omitted feature needs explicit
  operator scope approval.
- [ ] **P02-T03:** Decide Q03: smallest reusable core/package layout and typed
  boundaries for invocation, filesystem/state, ownership, validation, git,
  cancellation and review. Reuse `TaskAttemptRequest`/`TaskResult` where valid;
  do not invent abstraction layers unrelated to the verified app host.
- [ ] **P02-T04:** Extract only needed logic and preserve the copied CLI,
  compiler and Console entry points. Remove process/PID assumptions from the
  reusable boundary without changing existing adapter behavior. Freeze the
  interfaces needed by later independent phase work.
- [ ] **P02-T05:** Add approved architecture ADR, dependency/package and schema
  compatibility decisions. Specify explicit import/rollback before touching
  existing project state; define extension ownership versus app-owned worktrees.

Outputs: canonical requirements, parity inventory, typed interfaces, core
extraction, characterization tests and an accepted ADR. Final files are named
in approved tasks after G01; this plan does not assert new packages already exist.

## Specific future sub-agent opportunities

A contract author can map requirements to canonical feature ownership while a
read-only parity analyst inventories baseline tests. After interfaces are
approved, one core specialist performs extraction; a test specialist owns
characterization fixtures, not shared core files. The coordinator merges the
contract/interface work before permitting implementation, preventing divergent
types. Human approval remains with the operator.

## Validation and exit gate G02

Run V03 and V17 with existing adapter/engine/launcher checks. Canonical
requirements validation must reject bad owners, missing refs, cycles and unsafe
paths. Characterization tests show unchanged behavior through existing entry
points, including strict phases and structured report checks.

Every APP requirement has an owning task, decisive checks and evidence linkage.
Q03 and migration boundaries are resolved; no pending mandatory architectural
assumption is hidden in code. Accepted ADR plus operator-reviewed contracts are
required before P03. Typechecking alone does not establish parity.

**Risks:** R01/R04/R08; extraction should be reversible as a bounded commit,
not a rewrite. **Evidence:** E-P02-* includes contract validation, old/new
regression results, interface decision and review.
