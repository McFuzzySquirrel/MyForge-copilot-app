# Project artifact contract v1

**Status:** Accepted as the v1 contract basis; the subsequent safe-editing
clarification requires operator review. Runtime implementation and host
qualification remain pending. This does not establish that the current Copilot
host can safely write, reconcile or recover these artifacts.

The canonical schema is [`artifacts.schema.json`](artifacts.schema.json). Its
`schemaVersion` is `1.0`; breaking changes require a new contract version and
an explicit migration path. Generated projects store authoritative artifacts
under `.myforge/`:

| Path | Contents |
|---|---|
| `idea.json` | Captured idea, users, outcomes, constraints and open questions |
| `research.json` | Optional, user-directed sources, findings and uncertainty |
| `specification.json` | Reviewed user stories, functional requirements and acceptance criteria |
| `implementation-plan.json` | Phases, bounded work items, dependencies, execution status and evidence references |
| `team.json` | Agent roles, work ownership, skill provenance, compatibility and approval state |
| `reviews.jsonl` | Append-only human review decisions bound to artifact content |
| `evidence.jsonl` | Append-only work, gate, execution and verification evidence |

No separate task backlog, generated execution manifest or index duplicates
these sources of truth. A plan work item is the unit the orchestrator dispatches.
Each JSON Lines record is one complete JSON object validated against the
corresponding `review` or `evidence` definition in the schema.
Create `research.json` only when the user requests research. Execution requires
current human approvals for both the specification and implementation plan.

## Identity and revisions

- Every project artifact carries `projectId`, `artifactId`, `schemaVersion`,
  `revision`, `definitionRevision`, `createdAt` and `updatedAt`. The
  `artifactId` and file path remain stable across edits; the project ID is
  shared by all files in one `.myforge/` directory.
- Nested stories, requirements, criteria, phases, work items, skills, evidence
  and review records have stable IDs scoped to the project. IDs are never
  reused. A changed meaning gets a new ID; a removed item remains retired when
  another record refers to it.
- Recommended ID namespaces are `US-` (story), `FR-` (requirement), `AC-`
  (acceptance criterion), `PH-` (phase), phase-prefixed work item IDs, `RV-`
  (review) and `E-` (evidence). IDs remain stable if ordering changes.
- `revision` increments on every persisted edit. `definitionRevision`
  increments only when reviewable content changes. The plan's
  `executionRevision` increments for progress, status and evidence-link
  updates, which do not by themselves invalidate a human plan review.
- Plan phase and work-item dependency graphs must resolve to existing IDs and
  be acyclic. Every work item traces to at least one approved-spec requirement.
  The schema checks shape; a semantic validator must check references,
  uniqueness, traceability and cycles.
- Review digests use SHA-256 over RFC 8785 canonical JSON for the relevant
  `definition`. A plan review also binds the specification and team revisions
  and digests it used.

## Review and invalidation

Reviews and evidence are append-only. Current review state is derived, never
set by an agent-authored `approved` flag: an approval is current only when a
human review record's decision, target definition revision/digest and source
references match the current artifacts. An agent may prepare material but
cannot approve it.

- Changing a specification invalidates its current review and any plan review
  tied to its previous definition. Changes to referenced idea or research
  content require reconciliation; they invalidate downstream review only when
  the specification or its recorded source references change.
- Changes to plan phases, work items, ownership, dependencies, traceability,
  deliverables, verification or acceptance criteria invalidate plan approval.
  Execution status and new evidence do not.
- Changes to team ownership or selected skills invalidate plan approval when
  those revisions were included in the plan review's source references.
- Old review and evidence records remain available. A stale review is not
  deleted or presented as current.

## Safe editing and recovery

- Before saving, compare the draft's base revision/digest with the live
  artifact. If the file changed, reject the stale write and preserve the
  user's draft and live content for explicit reconciliation; never silently
  overwrite either side. The comparison and replacement require a supported
  conditional write or a boundary enforced across all writers. A separate
  check followed by atomic rename is insufficient; block automated replacement
  while no such mechanism is qualified.
- Apply accepted edits atomically. Preserve unknown user fields or surface a
  conflict rather than dropping them during migration or re-serialization.
- On recovery, reconcile files and append-only records first. Dispatch is not
  exactly-once: an interrupted item remains uncertain until its outputs and
  evidence have been inspected. Never retry by silently overwriting partial
  work.
- `.myforge/` is the project artifact location, not permission to commit,
  delete, or migrate files automatically. Keep credentials and raw sensitive
  diagnostics out of these records; commit policy remains operator-controlled.
- A discovered external skill is recommendation-only until the user approves
  installation or replacement. Record source, compatibility and trust review;
  never overwrite user content.

These are contract proposals, not implemented guarantees. The host's write
permissions, durable storage behavior, concurrent-edit reconciliation and
recovery behavior still require real-app tests and review.
