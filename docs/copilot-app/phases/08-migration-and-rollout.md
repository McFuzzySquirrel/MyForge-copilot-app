# P08: migration, rollout and separate-edition maintenance

[Main plan](../IMPLEMENTATION-PLAN.md) | [Previous](07-parity-qualification.md) | [Optional next](09-continuation-after-close.md)

**Prerequisite:** G07. **Exit:** G08. **Status:** not started.
**Requirements:** APP-12, APP-14-APP-16, APP-19.
**Sources:** S-05, S-09, S-11-S-13, copied bootstrap/retirement/update tooling.

## Deliverables and work checklist

- [ ] **P08-T01:** Resolve Q06/Q07 with maintainer: distribution channel,
  app-edition name/version, approvers, supported upgrade range, raw evidence
  storage/retention and upstream-sync cadence. Do not publish a plugin until
  these decisions and G07 are accepted.
- [ ] **P08-T02:** Document and test fresh install, existing Forge import,
  completed-project support team, incremental feature, backup/rollback and
  uninstall. Import is explicit; reject incompatible state and do not change
  canonical requirements or preserve completion solely by matching filenames.
- [ ] **P08-T03:** Establish upstream-sync provenance: source commit/file list,
  reviewed change selection, conflict/behavior analysis, tests and license
  preservation. Apply changes to this edition only; no upstream push and no
  automatic overwrite of app-owned paths. Do not assume a fork remote/history.
- [ ] **P08-T04:** Roll out with a disposable fixture first, then an
  operator-approved pilot project, then supported release. Define rollback
  triggers for state loss/duplication, review bypass, hidden dispatch/provider
  routing, migration loss or unsupported platform regression.
- [ ] **P08-T05:** Update affected README, guides, skills, architecture ADR,
  changelog/version marker and compatibility/migration instructions. Clearly
  distinguish inherited standalone commands from app entry points.
- [ ] **P08-T06:** Operator signs release and evidence index; publish only
  qualified pause/resume behavior. Continuation stays disabled/unavailable with
  a factual explanation, not a nonfunctional toggle.

Outputs: import/rollback evidence, compatibility and maintenance policy,
approved distribution artifact, pilot report and versioned release documentation.

## Specific future sub-agent opportunities

A migration specialist owns import/rollback fixtures; a documentation specialist
owns installation/upgrade instructions; an upstream-sync analyst produces a
read-only change provenance report. Package publisher and operator retain
release authority. Agents cannot choose distribution, push upstream, disclose
diagnostics or delete target repositories. Coordinate shared release metadata
through one writer.

## Validation and exit gate G08

Run V17/V18 and supported-platform installation/update checks from V16 on the
qualified artifact. Demonstrate rollback before pilot adoption; preserve
requirements, code, task identity, accepted evidence and user modifications.
Copied standalone behavior remains validated.

Release instructions are reproducible and compatibility claims match G07.
Upstream sync has a reviewed sample/procedure and no automatic destructive
merge. Pilot operator approves outcomes, retention/access and known limitations.
Rollback does not start another runtime or undo unrelated user work.

**Risks:** R07/R08/R10. **Evidence:** E-P08-* includes artifact digest, source
commit, pilot/rollback results, migration and distribution approval.
