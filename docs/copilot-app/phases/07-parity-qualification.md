# P07: Linux and provider parity qualification

[Main plan](../IMPLEMENTATION-PLAN.md) | [Authoring prerequisite](05-authoring-and-packaging.md) | [Canvas prerequisite](06-canvas-and-control.md) | [Next](08-migration-and-rollout.md)

**Prerequisites:** G05 and G06. **Exit:** G07. **Status:** not started.
**Requirements:** APP-01-APP-17, APP-19, APP-20; APP-18 remains optional P09.
**Sources:** S-03-S-13, existing package tests and CI.

## Deliverables and work checklist

- [ ] **P07-T01:** Resolve Q05 with maintainer; record actual Linux
  test hosts, app/CLI/SDK/OS versions and configured provider fixtures. No
  fabricated version floor or unapproved model/budget limit.
- [ ] **P07-T02:** Run the parity catalog V01-V18 against implementation commits.
  Expand focused suites only where introduced/fixed behavior needs coverage;
  run comprehensive combined-phase regressions and typechecks afterward.
- [ ] **P07-T03:** Execute a representative multi-feature project end to end:
  real review, specialist dispatch, strict dependencies, declared validation,
  human approval, failure/retry, parallel isolation, pause/reopen and final
  inspection. Add an incremental feature and exercise manual/replay paths.
- [ ] **P07-T04:** Verify requested/actual provider/model routing in task
  sessions, including local and BYOK, unavailable configuration and rate limits.
  Keep credentials out of public test records; no mock-only provider claim.
- [ ] **P07-T05:** Complete the requirement coverage matrix and negative-case
  evidence on all initial platforms. Resolve regressions; retest affected tasks
  and full phase checks after fixes. Record any blocked host/test honestly.
- [ ] **P07-T06:** Operator reviews integrated changes, primary app journey,
  evidence and residual risks. Record qualification decision and supported
  version/provider matrix; unverified mandatory criteria block release.

Outputs: qualification report and coverage, CI/typecheck/test results,
Linux and provider matrix, actual app-run evidence, review acceptance.

## Specific future sub-agent opportunities

Independent testers can execute the shared qualified fixture on the Linux
test host. A test analyst audits APP-to-V-to-evidence coverage; a review
specialist inspects the integrated diff and behavior gaps. No agent silently
changes implementation mid-certification. Coordinator triages defects, routes
bounded fixes to their owning phase, invalidates superseded evidence and
requalifies. Only the operator accepts G07.

## Validation and exit gate G07

All mandatory requirements have passing current-commit evidence on their
applicable platform/provider cells and no blocking unresolved work. Existing
adapter/engine/launcher typechecks and suites pass; app install, main workflow,
review safety and interruption/recovery pass on Linux. Windows/macOS are
deferred to a potential v2 and must not be claimed as supported without
separate qualification.

Compare actual run/task/attempt, report, outputs, validation command results,
integration and audit identities, not just a green Board. Skipped/not-run tests
cannot satisfy required checks. APP-18 must be explicitly unavailable until G09.

**Risks:** all R01-R10. **Evidence:** E-P07-* includes environment manifest,
matrix cells, redacted procedures/results and operator review. CI alone does
not replace desktop or provider validation.
