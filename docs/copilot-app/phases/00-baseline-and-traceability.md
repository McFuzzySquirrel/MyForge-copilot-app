# P00: baseline and traceability

[Main plan](../IMPLEMENTATION-PLAN.md) | [Evidence ledger](../evidence/README.md)

**Prerequisites:** none. **Exit:** G00. **Status:** accepted by operator; see
E-P00-003. **Requirements:** APP-15, APP-19. **Sources:** S-01, S-12.

## Deliverables and work checklist

- [x] **P00-T01:** Import the 608 tracked files at source commit
  `0994c0a644975b771aa813a1223f8d0ac958f867` as a fresh baseline
  `00fe362fbdaaf0c2c45a54315a95c684d1ce1d9b`; preserve history documents and
  license notices. Evidence: E-P00-001 in the ledger.
- [x] **P00-T02:** Publish the main requirement/phase/validation graph and one
  linked document per phase. Record unresolved decisions instead of guessing
  package names, SDK versions or release topology. Evidence: E-P00-002.
- [x] **P00-T03:** Establish the evidence schema, phase ledger and record
  template with honest `not-run`, `blocked` and failure states. Evidence:
  E-P00-002; this is evidence infrastructure, not app-run evidence.
- [x] **P00-T04:** Operator reviews scope, dependencies, acceptance coverage and
  baseline provenance; record name/date/decision and evidence IDs for G00.
  Evidence: E-P00-003.

## Specific future sub-agent opportunities

No agents are started by this planning change. After authorization, a read-only
documentation agent can audit requirement-to-phase links; independently, a
baseline auditor can compare the snapshot file hashes and licensing notices.
Neither edits runtime code or grants gate acceptance. Stop each audit after a
single report; the coordinator resolves findings and updates the ledger.

## Validation and exit gate G00

- Snapshot file list, content and executable modes match the source tree at the
  import commit; subsequent planning changes are a separate commit.
- Every phase has prerequisites, work IDs, outputs, checks, sub-agent scopes,
  risk treatment and an exit gate; relative planning links resolve.
- No app implementation, generated Forge execution snapshot, sub-agent launch
  or runtime test is represented as completed.
- Operator records acceptance of APP-15/APP-19 planning scope. Import and
  document validation alone do not approve the proposed architecture.

**Gate evidence:** E-P00-001, E-P00-002, E-P00-003.
**Failure handling:** repair baseline/document defects before P01. Preserve the
source repository unchanged. Do not overwrite user edits to the new repository.
