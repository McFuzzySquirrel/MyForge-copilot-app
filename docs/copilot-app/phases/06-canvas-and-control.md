# P06: truthful workflow canvas and controls

[Main plan](../IMPLEMENTATION-PLAN.md) | [Prerequisite](04-recovery-and-safety.md) | [Qualification](07-parity-qualification.md)

**Prerequisite:** G04. May run independently of P05 against frozen interfaces.
**Exit:** G06. **Status:** not started. **Requirements:** APP-11, APP-12,
APP-17, APP-20. **Sources:** S-05, S-09-S-12.

## Deliverables and work checklist

- [ ] **P06-T01:** Build the app canvas from shared authoritative projections:
  readiness, plan/tasks/phases, ownership, current attempt, evidence, blockers,
  logs/artifacts and usage availability. Reuse Console semantics, not its
  independent process supervisor or loopback server assumptions.
- [ ] **P06-T02:** Expose pause/stop/resume/replay and deliberate start via
  approved revision-aware controls. Stale views and denied actions must show
  explicit errors; closing a canvas must not accidentally cancel the workflow.
- [ ] **P06-T03:** Show human-review evidence and validation caveats using P04's
  operator boundary. Agent-callable actions can inspect and request review,
  never forge an approval or bypass host permissions.
- [ ] **P06-T04:** Keep audit/result outcomes, provider/model provenance and
  unavailable usage distinct from zero; credits are not USD. Handle partial,
  missing, corrupt and large evidence without creating false success.
- [ ] **P06-T05:** Implement keyboard navigation, focus/error announcements,
  screen-reader semantics and reduced-motion behavior. Validate extension
  permissions, trusted origins and safe rendering of untrusted artifact data.
- [ ] **P06-T06:** Update app canvas usage/visual docs and integration error
  guidance; do not relabel inherited Console screenshots as app screenshots.

Outputs: canvas and supported actions, projection/control tests, accessibility
findings, review UI and user guidance.

## Specific future sub-agent opportunities

A canvas specialist owns rendering/UI; a projection specialist owns read models
and evidence parsing; an accessibility reviewer exercises keyboard and
screen-reader flows after integration. Agree disjoint paths and shared response
types before parallel work. Coordinator owns all mutating control wiring and
operator-only review integration; UI state never becomes a second scheduler.

## Validation and exit gate G06

Run V13/V14 and UI parts of V11. Compare rendered state with durable state and
attempt archives after retries, errors and reopen. Exercise controls against
stale revisions and denied permissions; test huge/untrusted diagnostic text.

Primary journeys are keyboard-operable and review/error state is announced.
No silent fallback, forged review or synthetic success/cost. Existing Console
projection regressions remain green; real desktop UI evidence supplements tests.

**Risks:** R05/R06/R07/R09/R10. **Evidence:** E-P06-* links state/result fixtures,
actual app controls and accessibility checks; raw diagnostics remain private.
