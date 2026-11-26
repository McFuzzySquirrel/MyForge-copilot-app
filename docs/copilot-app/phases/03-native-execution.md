# P03: app-native execution adapter and behavioral parity

[Main plan](../IMPLEMENTATION-PLAN.md) | [Previous](02-contracts-and-core.md) | [Next](04-recovery-and-safety.md)

**Prerequisite:** G02. **Exit:** G03. **Status:** not started.
**Requirements:** APP-01, APP-04-APP-06, APP-08, APP-10, APP-13, APP-17, APP-20.
**Sources:** S-03, S-04, S-06-S-10, S-13.

## Deliverables and work checklist

- [ ] **P03-T01:** Implement the supported app-managed invocation adapter
  through the approved composition root. Pass immutable task contract,
  attempt/run identity, context, specialist and requested model. Capture real
  run/worker identity, terminal outcome, cancellation and usage availability.
  Workflow-owned subagents are eligible; separate app project sessions are not
  required, but session-scope and other parity requirements remain.
- [ ] **P03-T02:** Preserve task DAG, owner-unique scheduling, manual selections
  and strict phase validation semantics using shared code. Preserve task session
  scope; reject phase scope (D-12) and unsupported concurrency visibly.
- [ ] **P03-T03:** Keep verification outside model assertions: expected outputs,
  actual changed files, no-op, valid `forge-result`, empty blockers and declared
  command exit codes. Record skipped gates truthfully and persist failed
  attempts before retry.
- [ ] **P03-T04:** Preserve task change attribution and serialized
  integration/per-task commits for sequential execution (D-11). Test dirty-tree
  behavior and partial changes left by cancelled attempts; reject concurrency
  above 1 visibly. Do not run duplicate app and engine worktree managers.
- [ ] **P03-T05:** Retain retryable/terminal error classification, timeouts,
  cancellation and optional automated phase review ordering. Require rerun of
  affected task and full phase checks after review-driven fixes.
- [ ] **P03-T06:** Resolve Q04 with operator: provider capability and settings/
  budget policy. Preserve app permissions, not inherited CLI `--yolo`; test
  task model routing and surface unavailable capabilities/usage explicitly.

Outputs: native adapter, tested orchestration wiring, verification/integration
contract tests and provider capability decisions. Existing CLI adapter remains
first-class in the copied standalone edition, not a fallback for app dispatch.

## Specific future sub-agent opportunities

After shared interfaces freeze, a transport specialist owns the new adapter and
app-managed execution tests; a verification specialist owns output/result-gate tests;
a sandbox specialist owns isolated integration fixtures. Agree disjoint files
before work; only the coordinator changes scheduling composition and shared
types. A reviewer checks evidence and failure cases after integration, not by
rerunning overlapping implementation work.

## Validation and exit gate G03

Run V01, V04-V06, V09, V12 and V15 through shared contract tests and actual
app sessions. Start with bounded tasks, then sequential multi-task runs;
concurrent execution is deferred (D-11) and must be rejected.
Negative cases must fail without dependent dispatch, hidden fallback or false
completion. App permissions/model routes are observed, not inferred.

All applicable baseline options have implemented or explicitly scoped behavior.
Required tests, core/adapter typechecks and copied standalone regressions pass.
In-flight recovery not yet qualified here remains a G04 blocker.

**Risks:** R01/R04/R05/R06. **Evidence:** E-P03-* with requested/actual identities,
per-attempt gate results, integration diff and process ownership.
