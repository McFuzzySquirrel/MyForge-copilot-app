# P09: optional continuation after closing the app

[Main plan](../IMPLEMENTATION-PLAN.md) | [Prerequisite](08-migration-and-rollout.md)

**Prerequisites:** G08 and a separately accepted continuation feasibility
decision. **Exit:** G09. **Status:** deferred; not an initial-release blocker.
**Requirement:** APP-18 plus all safety/runtime requirements on the new path.
**Sources:** S-03-S-10, S-13 and versioned host/automation documentation.

## Deliverables and work checklist

- [ ] **P09-T01:** Ask operator to resolve Q08: window close/tray versus true
  app quit versus host shutdown, acceptable hosts/cloud movement, provider
  reachability and data permissions. These are different execution contracts.
- [ ] **P09-T02:** Prove the entire workflow, not just one worker, can keep
  scheduling/validating under a supported app-managed host after the requested
  close condition. Capture host/session/extension ownership and public APIs.
  A child finishing while the scheduler dies is not continuation parity.
- [ ] **P09-T03:** If unsupported, record no-go and leave the mode unavailable.
  If supported, approve architecture/state handoff, operator consent, provider/
  permission matrix and migration before implementation. Cloud automations are
  a lead, not proof; no independent engine sidecar or hidden host switch.
- [ ] **P09-T04:** Implement supported continuation opt-in and explicit safe
  transition back to pause mode. Preserve requirement/human gates, attempt
  identity, isolation, diagnostics and requested provider routing.
- [ ] **P09-T05:** Exercise reconnect, native host interruption, stale owners,
  failure/retry, review wait and rollback on supported platforms. Update
  qualification, UI, migration, changelog and compatibility documentation.

Outputs only on go decision: accepted continuation contract/ADR, optional
implementation, qualified settings and lifecycle evidence. A no-go capability
report is a valid phase outcome but is **not** G09 release acceptance.

## Specific future sub-agent opportunities

A host/API researcher inventories supported lifecycle mechanisms; independent
platform operators execute approved close/reconnect probes; a state-handoff
reviewer audits identity and safety. Do not delegate implementation before
operator approval of host/data movement. Coordinator owns the shared lifecycle
contract, disjoint test repos and final setting availability.

## Validation and exit gate G09

Run V19/V20 plus V01/V04-V09/V11/V13/V15/V16 on every claimed host/provider/
platform combination. Exit the app fully for true-quit claims; verify continued
dependency dispatch, checks and persistence, then reopen without duplication.
Show that unsupported/local-provider combinations are rejected explicitly.

Operator accepts the opt-in behavior and movement/permissions policy. Both modes
have honest, qualified semantics; a background window/tray process is not
advertised as surviving app quit or host shutdown.

**Risks:** R01-R08/R10. **Evidence:** E-P09-* identifies exact close condition,
host process/session, procedure, actual continued task work and reattachment.
