# Execution evidence protocol and historical ledger

[Main plan](../IMPLEMENTATION-PLAN.md) | [Evidence record template](record-template.md)

This directory tracks **product implementation evidence**, not project runtime
state. The records below are preserved from the superseded engine-port plan.
Their work IDs, requirements, scenarios and gate decisions are historical; they
do not establish acceptance of the replacement plan. Link sanitized new evidence
to the replacement plan's phase and work IDs.

## Evidence and completion rules

- Assign immutable evidence IDs `E-N<phase>-<sequence>` for the replacement
  plan; use its stable work IDs such as `N01-W01`. Preserve historical `E-P`
  identifiers unchanged.
- Each record includes source/implementation commit, app/CLI/SDK/OS/provider
  identity, operator, procedure/commands, expected and actual results, outcome,
  artifact digests/locations and relevant limitations. Do not record credentials.
- Outcomes: `passed`, `failed`, `blocked`, `skipped`, `not-run`. Phase status:
  `not-started`, `in-progress`, `blocked`, `ready-for-review`, `accepted`,
  `deferred`. Work completion and phase acceptance are different.
- Only executed checks receive results. Documentation analysis, mock/stub runs,
  actual desktop integration and human review must be distinguished.
- Gate acceptance requires a human reviewer, timestamp, named current-commit
  evidence and all required criteria; blank cells do not mean approval.
- Preserve failures and superseded records. Corrections append a new record
  linking the old one. Code/environment changes invalidate affected evidence;
  rerun the relevant checks and phase gate.
- For a future deployed workflow, record run/work-item/attempt and applicable worker
  or session IDs, result/validation outputs and audit correlations. A report saying "tests pass"
  is not a command result; successful validation is not human approval.

## Privacy and retention

This repository is public. Commit only sanitized procedures, summaries and
non-sensitive fixture outputs. Keep real stdout/stderr, prompts, path identities,
logs and private project screenshots in operator-approved private storage.
Use a digest plus access-controlled location/availability description when raw
data cannot be public. Do not upload sensitive data merely to obtain a link.

Resolve storage/access/retention before release; no retention period or
automatic deletion policy is assumed. Keep probe identifiers and raw runtime
output in private session history rather than this public ledger.

## Replacement phase ledger

| Phase | Status | Evidence / gate |
| --- | --- | --- |
| N00 | Ready for review | E-N00-001; operator gate acceptance pending |
| N01 | Blocked | E-N01-001–E-N01-020; extension-origin session dispatch is disabled in the tested configuration; reconciliation, recovery and distribution remain unresolved |
| N02 | Not started | Authoring pending |
| N03 | Not started | Plan and team preparation pending |
| N04 | Not started | Orchestrator execution pending |
| N05 | Not started | Canvas integration pending |
| N06 | Not started | Retirement and qualification pending |

### E-N00-001: replacement planning baseline

- Work: N00-W01–N00-W03. Evidence kind: documentation analysis and local
  reference checks, not app integration or human gate acceptance.
- Source: inherited baseline `e1fe78c`; replacement documentation changes in
  the current uncommitted worktree. Date: 2026-11-27.
- Procedure: compare the previous plan and phase documents with the preserved
  evidence; search active Markdown for references to the removed phase paths;
  check local links in the changed navigation, plan, evidence and ADR documents;
  compare the README latest version with the first changelog version; run
  `git diff --check`.
- Actual: the old phase documents were removed, historical evidence retained
  and labeled, and the active plan and navigation replaced. The scoped Markdown
  search found no removed phase paths. A local script checked 177 links and
  matched README/changelog version `3.132`; `git diff --check` passed.
- Outcome: **passed** for the listed documentation checks; gate acceptance
  remains pending. The link check covered the selected documents, not every
  file or every form of Markdown link. No app behavior was tested.

### E-N01-001: current probe availability

- Work: N01-W01. Evidence kind: read-only local environment inspection;
  recorded 2026-11-27.
- Procedure: inspect the current repository's Git worktree list, the local
  Copilot CLI version and the historical feasibility ledger.
- Actual: this repository reports only its current worktree. Its local CLI
  reports `1.0.112`; this does not establish the desktop app's bundled CLI or
  SDK version. The historical ledger describes a disposable probe in a
  separate project and reports blocked session creation and experimental
  subagent dispatch; it does not provide a current, independently repeatable
  app probe here.
- Outcome: **blocked** for current real-host dispatch and recovery
  qualification. No extension was installed or run and no app session was
  created in this check. A reviewed probe and an actual desktop host are
  needed; these observations do not prove the host lacks the capability.

### E-N01-002: opt-in subagent probe preparation

- Work: partial N01-W01. Evidence kind: public SDK documentation review and
  local unit tests, not app integration. Date: 2026-11-27; source is the
  uncommitted probe in this worktree.
- Procedure: review the published experimental dynamic workflow and extension
  documentation; run
  `node --test docs/copilot-app/probes/workflow-subagent/probe.test.mjs`,
  `node --check docs/copilot-app/probes/workflow-subagent/extension.mjs`, and
  `git diff --check`.
- Actual: five local tests passed, including no automatic start, rejection
  without confirmation, marker checking, failed-run handling and API error
  propagation. Syntax and whitespace checks passed.
- Outcome: **passed** for local probe checks only. The probe was not loaded or
  run in the Copilot app; actual SDK compatibility, user interaction, canvas
  wiring, specialist isolation and recovery remain unverified. Documentation
  inspected at its current online revision is a capability lead, not a pinned
  runtime guarantee.

### E-N01-003: serving desktop app identity

- Work: partial N01-W04. Evidence kind: app identity capture, not capability
  verification. Date: 2026-11-28.
- Source: `6ae5dd664dfe3d582b17b0abec16000fd2368ccc`.
- Environment: GitHub Copilot desktop app `1.5.0` (stamped build), Linux.
- Procedure: query the serving app version; inspect the bundled SDK's CLI
  version and protocol declarations; run `copilot --version` in the workspace.
- Expected: record each runtime identity separately and do not conflate the
  terminal CLI version with the app's bundled runtime.
- Actual: the app tool returned `1.5.0`; bundled declarations report Copilot
  CLI `1.0.115-7` and SDK protocol `4`; the separate terminal command reports
  Copilot CLI `1.0.117`. The SDK package semantic version was not exposed.
- Outcome: **passed** for the listed version capture only. These versions do
  not qualify session dispatch, subagent identity, interruption or recovery.
- Limitations: this does not establish that the app can host the planned
  extension or provide any execution mode required by N01-W01.

### E-N01-004: canvas and workspace read access

- Work: partial N01-W01. Evidence kind: real app integration, limited to a
  session-scoped capability probe. Date: 2026-11-28.
- Source: repository commit
  `6ae5dd664dfe3d582b17b0abec16000fd2368ccc`; probe extension was session-scoped
  and not committed.
- Environment: GitHub Copilot desktop app `1.5.0`; bundled CLI declaration
  `1.0.115-7`; SDK protocol `4`; Linux workspace. The package semantic version
  was not exposed.
- Procedure: syntax-check the probe; reload extensions; discover the canvas
  action; open the canvas; invoke its read-only report action; request the
  loopback renderer and confirm its HTML response. The action checks
  readability of the project plan relative to the extension's working
  directory and the session workspace directory without returning either path.
- Expected: the registered canvas and action are discoverable; open returns a
  renderer URL; action reports whether session/canvas identifiers and both
  workspace reads are available; the renderer responds successfully.
- Actual: syntax check passed; discovery returned `report_capabilities`; open
  returned an instance and loopback URL; action reported all three identifier
  and both read-access checks as true; the renderer returned the probe page.
- Outcome: **passed** for canvas discovery, open/action routing, renderer
  response and read access in this session. No project or session files were
  written.
- Limitations: the canvas API is experimental. This does not test artifact
  persistence or writes, separate app-managed session dispatch, subagent
  identity/isolation/visibility, cancellation, interruption or recovery.

### E-N01-005: bounded subagent response

- Work: partial N01-W01. Evidence kind: real app integration through the
  experimental Dynamic Workflows API. Date: 2026-11-28.
- Source: repository commit
  `6ae5dd664dfe3d582b17b0abec16000fd2368ccc`; the staged probe copy was
  removed after the run.
- Environment: GitHub Copilot desktop app `1.5.0`; bundled CLI declaration
  `1.0.115-7`; SDK protocol `4`; Linux workspace. The package semantic version
  was not exposed.
- Procedure: after explicit operator authorization, stage and load the
  documented probe extension; invoke its start tool once; inspect the run
  status and result through the probe status tool and workflow run record;
  remove the staged copy and reload extensions.
- Expected: one bounded worker receives instructions to use no tools, inspect
  no files and make no changes; completion is reported only when its exact
  marker is verified.
- Actual: one worker completed on attempt 1 and returned `MYFORGE_PROBE_OK`;
  the status tool reported `completed` and `markerMatched: true`. The start
  response initially reported `running`, not completion.
- Outcome: **passed** for dispatching one worker and verifying its bounded
  response. The run did not perform workspace operations.
- Limitations: this does not establish specialist identity, isolation,
  visibility, cancellation, interruption or recovery. It also does not test
  separate app-managed session dispatch or justify parallel execution.

### E-N01-006: project artifact contract draft validation

- Work: partial N01-W02. Evidence kind: contract documentation and schema
  validation. Date: 2026-11-28.
- Source: repository commit
  `6ae5dd664dfe3d582b17b0abec16000fd2368ccc`; contract files are in the current
  uncommitted worktree.
- Environment: Python `3.14.4`, `jsonschema` `4.19.2`.
- Procedure: define the proposed v1 artifact envelope and schemas, record the
  selected `.myforge/` project path and lifecycle invariants, validate the
  Draft 2020-12 schema with Python `jsonschema`, test seven valid artifact
  shapes and three negative cases, and run `git diff --check`.
- Expected: machine-readable JSON parses; contract identifies authoritative
  artifacts, stable references, review invalidation, edit conflicts and
  recovery boundaries without claiming host support.
- Actual: the Draft 2020-12 schema validated; seven representative artifact
  shapes were accepted. External skills without approval, agent reviews and
  specifications with no stories/requirements were rejected. Whitespace
  checks passed. The contract was a draft at the time of this validation;
  operator acceptance is recorded separately in E-N01-007.
- Outcome: **passed** for schema shape, required-content and approval-boundary
  checks only; no host write/reconciliation test was run.
- Limitations: the accepted contract basis has no implemented writer,
  validator, migration or recovery path. N01 gate acceptance remains pending.

### E-N01-007: v1 artifact contract basis review

- Work: N01-W02. Evidence kind: human review of the artifact contract basis.
- Source: current uncommitted worktree based on
  `6ae5dd664dfe3d582b17b0abec16000fd2368ccc`.
- Reviewed artifacts: `contracts/v1/README.md`
  (`sha256:9fb4f4f8d9cceea0823c20f6d4e437b151d908e0b5a3cef3fbd6ed838eda4225`)
  and `contracts/v1/artifacts.schema.json`
  (`sha256:d519365163e23b1dc7d04226e2c4cf54108f28692d38793b8d0d9a717542b512`).
- Reviewer and time: operator, 2026-11-28T08:15:54+02:00.
- Procedure: present the artifact paths, schema, identity, dependency,
  invalidation and reconciliation rules for operator review. The operator
  accepted the contract as the v1 basis; no change request was provided.
- Outcome: **accepted** as the v1 contract basis only.
- Limitations: this is not N01 phase-gate acceptance. Host writes,
  reconciliation, recovery, app-managed session dispatch and execution-path
  qualification remain unverified.

### E-N01-008: app-managed conversation session handoff

- Work: partial N01-W01. Evidence kind: live app conversation tool probe,
  not extension integration. Date: 2026-11-28.
- Source: `bdc09cffe062d85ba96c664ddf1882544b4e85a3`.
- Environment: Copilot desktop `1.5.0`, bundled CLI declaration `1.0.115-7`,
  SDK protocol `4`; local Linux worktree project. Private session identities
  and paths remain in the session history.
- Procedure: from the parent conversation, request a coordinated child project
  session in a new worktree with a bounded marker-only kickoff. Inspect the
  returned session metadata and received message, then inspect its change
  overview and archive the finished child.
- Expected: a separate app-managed session with a distinct identity and
  worktree can return the requested marker to its coordinator.
- Actual: the app created a child session and reported a distinct worktree
  and session identity. The coordinator received `MYFORGE_SESSION_PROBE_OK`;
  the change overview showed no changed files or commits, and the child was
  archived.
- Outcome: **passed** for the conversation tool's bounded creation and handoff
  in this configuration.
- Limitations: the child was created from the project default branch, not the
  parent's current branch; no project edits, change integration, conflict
  handling, interruption, recovery or host-enforced isolation were tested.
  This does not establish that a canvas extension can invoke this app tool or
  create a project session through its own SDK connection.

### E-N01-009: corrections to prior evidence

- Work: N01-W01/W02. Evidence kind: audit correction. Date: 2026-11-28.
- E-N01-007 identifies the post-acceptance status-edited README digest as the
  reviewed digest. The README presented for review instead had SHA-256
  `44aaeac17fc6a81c3f205d3040832be39d3e0dd0dca36a7a1471649ddc5f6e5d`.
  After acceptance, its status text was updated, yielding the digest recorded
  in E-N01-007. The schema digest was unchanged. This corrects the identity
  of the reviewed bytes, not the operator's decision.
- E-N01-005's statement that the worker did not perform workspace operations
  is stronger than the observation: it was instructed not to use tools or
  inspect files, but the marker result alone does not independently prove
  tool non-use. Its bounded-response result remains valid within that limit.
- E-N01-004's no-write statement describes the read-only canvas action, not
  setup: the session-scoped probe extension itself was written before loading.
  The action did not test project artifact writes.
- The v3.133 changelog's statement that the schema rejects unapproved external
  skills is too broad: it rejects `approvalState: "not-required"` for an
  external skill but permits `pending` and `rejected` recommendations. Schema
  validation does not authenticate approval or enforce installation behavior.

### E-N01-010: execution contract and distribution decision

- Work: partial N01-W03/W04. Evidence kind: design documentation and operator
  decision; not a runtime qualification. Date: 2026-11-28.
- Source: `bdc09cffe062d85ba96c664ddf1882544b4e85a3` plus current worktree
  documentation.
- Procedure: document explicit mode selection, handoffs, failure handling and
  operator-led recovery; ask the operator to choose project, user or plugin
  distribution, or defer the choice.
- Actual: the operator chose to **defer** distribution pending capability
  qualification. The proposed
  [execution contract](../contracts/v1/execution.md) requires visible blockers
  and does not advertise an unqualified mode. A scoped link check found 44
  local Markdown paths in the contract, implementation plan and documentation
  map; all existed. Anchors were not checked.
- Outcome: **blocked** for the N01 gate: extension-origin dispatch, workspace
  writes/reconciliation, worker isolation and interruption/recovery,
  distribution and contract review are not complete. This decision does not
  authorize an installation.

### E-N01-011: extension-origin session dispatch

- Work: partial N01-W01. Evidence kind: live app extension probe.
  Date: 2026-11-28. Operator: coordinating probe agent; human review pending.
- Source: disposable worktree at
  `6ae5dd664dfe3d582b17b0abec16000fd2368ccc`, with a temporary
  session-scoped canvas scaffold that was removed after the check.
- Environment: Linux, Copilot desktop `1.5.0`, serving runtime `1.0.115-7`;
  bundled experimental canvas and session-management declarations. SDK package
  and protocol versions were not independently established for this check.
  A separately installed CLI reported `1.0.117` but was not used for dispatch.
- Procedure: scaffold and reload a session-scoped canvas, confirm the provider
  and action are available, open it and invoke its one-shot action once. The
  action called `session.rpc.management.create` with a name and a marker-only
  prompt requesting no tools, commands or file changes. It specified no model,
  working directory, policy, permissions or handler overrides.
- Expected: a host-managed session ID and an independently inspected terminal
  marker handoff.
- Actual: the action failed with `This session management tool is disabled`.
  No session ID or terminal handoff was returned. No retry, CLI fallback or
  additional worker was used. The scaffold and its lock were removed, the
  extensions reloaded, and the disposable worktree was clean.
- Outcome: **blocked** for extension-origin session dispatch in this
  configuration. The result does not establish whether a host handler exists
  or whether enabling policy would make the path usable. It does not qualify
  writes, conflicts, interruption, recovery, isolation or visual rendering.
  Probe identifiers and raw output remain in private session history.

### E-N01-012: extension-origin workspace write probes

- Work: partial N01-W01/W02. Evidence kind: live app extension probe.
  Date: 2026-11-28. Operator: coordinating probe agent; human review pending.
- Source and environment: the disposable worktree and app/runtime configuration
  identified in E-N01-011, using a separate temporary session-scoped canvas.
- Procedure: discover and open the canvas, then invoke its actions. One action
  created a uniquely named repository-worktree fixture with Node `fs.writeFile`
  and `wx`. Another created and read a distinct session-artifact fixture using
  experimental `session.rpc.workspaces.createFile` and `readFile`. Independently
  read both files. Open the repository fixture in the host editor; an extension
  action then checked its base text, saved a separate exclusive copy and wrote
  a different external version. Independently read both resulting versions.
- Expected: the extension can write and read disposable fixtures; any
  host-managed stale-draft behavior is established only through an actual
  draft and conflict-resolution request.
- Actual: both initial writes and reads returned the expected base text, and
  independent reads confirmed the base copy and external version. The host
  editor opened the repository fixture, but no unsaved draft or pending
  whole-file resolution request was created. The inspected session-workspace
  `createFile` declaration describes unconditional create/overwrite without
  an expected-version parameter.
- Outcome: **passed** for the listed extension-origin filesystem and
  session-artifact write/read observations; **not-run** for host-managed
  stale-draft reconciliation. The copied base and external versions show only
  the probe's explicit preservation, not conflict detection, atomic
  compare-and-swap or editor UI behavior. Session artifacts are not durable
  project artifacts. Interruption and recovery were not tested.
- Cleanup: the probe verified its fixture contents before removing its three
  files, session-scoped scaffold and lock, then reloaded the provider. The
  disposable worktree was clean. Opened editor/probe panels may remain and
  point to removed content or a stale provider. Probe identifiers and raw
  output remain in private session history.

### E-N01-013: operator-assisted editor draft attempt

- Work: partial N01-W02. Evidence kind: live app and human-assisted probe.
  Date: 2026-11-28. Operator: @McFuzzySquirrel and the coordinating agent.
- Source: `bdc09cffe062d85ba96c664ddf1882544b4e85a3` plus current worktree
  documentation and a temporary fixture and session-scoped canvas. Environment:
  the desktop and runtime identified in E-N01-011.
- Procedure: create a disposable repository fixture, load a canvas action
  prepared to replace only its expected base version, and open the fixture in
  the host editor. Ask the operator to change its text and leave it unsaved,
  then inspect the disk before invoking the external write.
- Expected: the disk retains the base while the editor holds a distinct unsaved
  draft, allowing an external write and a real stale-draft check.
- Actual: the operator reported an edited, unsaved draft, but the inspected
  disk already contained the requested draft text. The operator reported no
  visible unsaved indicator or manual-save option. The external action was not
  invoked. The fixture and temporary extension were removed after inspection;
  extensions were reloaded. Their opened panels may remain stale.
- Outcome: **blocked** for arranging this draft-conflict scenario; the
  reconciliation check was **not-run**. The observation does not establish
  when or why the disk changed, or prove that stale-draft handling is absent.
  No conflict-resolution request or interruption/recovery was exercised.

### E-N01-014: workflow fallback API research

- Work: partial N01-W01/W03. Evidence kind: bundled SDK documentation and
  historical evidence review, not a new real-host execution.
  Date: 2026-11-28. Source: `bdc09cffe062d85ba96c664ddf1882544b4e85a3`
  plus current worktree documentation.
- Procedure: inspect the serving SDK's workflow documentation and declarations;
  compare dispatch, observation, cancellation, checkpoint and recovery claims
  with recorded P01 and N01 observations. Design a bounded cancellation and
  operator-led recovery procedure with explicit consent and stop conditions.
- Actual: the
  [research note](../../research/copilot-app-workflow-fallback-qualification.md)
  identifies experimental workflow APIs and distinguishes documented
  semantics from prior host observations. Prior probes observed bounded
  cancellation and checkpoint replay, but not safe recovery of an interrupted
  working task. The existing N01 probe lacks the proposed cancellation and
  recovery controls.
- Outcome: **passed** for the listed documentation review and probe design;
  the proposed probe was **not-run**. No additional worker was started, no
  policy was changed and no app restart occurred. Fallback execution, real
  task recovery and the N01 gate remain unqualified.

### E-N01-015: workflow-owned worker cancellation

- Work: partial N01-W01/W03. Evidence kind: live app extension probe reported
  by a disposable project session; human gate review pending.
- Authorization: the operator approved one bounded billable worker, a
  session-scoped extension and cancellation, without restart, policy changes
  or retries. Optional credit and active-time ceilings were not specified.
  The run had a cumulative one-worker and one-concurrent-worker limit.
- Source: disposable worktree commit
  `6ae5dd664dfe3d582b17b0abec16000fd2368ccc`; temporary probe entry, logic and
  local mock-test SHA-256 values respectively
  `4cad256b2472d6d18db55d2af372b76a68a79b4dc722d7ee7ff96e80ba9089c4`,
  `2fdc5f18c73b4776668912599608b75f0eddc26d4b060fe7a24e6da499412235`,
  and `6f04bd271444aa8677a3f6a5ad1e6461e1753f881a32a7bc16448e69b671dd59`.
  The temporary source was removed after the run; hashes alone do not make
  the probe independently reproducible.
- Environment: Linux, Copilot desktop `1.5.0`, serving CLI `1.0.115-7`,
  Node `v24.22.2`; SDK package version unavailable. The bundled SDK
  `extension.js` SHA-256 was
  `11853a7a0e8cde9ed0c75d855b8b2877a1bfa47e2268145b8ce1de79b5bc9583`.
- Procedure: inspect SDK declarations, run four local mock tests without
  starting a worker, then load the temporary extension. On 2026-11-28 UTC,
  start the workflow once at 06:59:18, record its run identity and journaled
  nonce privately at its pre-dispatch checkpoint, resume once, observe the
  worker active and issue one cancellation. Inspect the same run, its worker,
  nonce, counts and workspace after settlement.
- Expected: checkpoint with no workers; after resume, one observed active
  worker; cancellation settles the same run and worker with zero live and one
  total worker, and the nonce matches. No unexpected workspace changes.
- Actual: the run paused at 06:59:19 with live/total workers 0/0. Attempt 2
  began at 06:59:33; the worker started and was observed active with counts
  1/1 at 06:59:36 and again immediately before cancellation at 06:59:39. The
  cancel response and supervised resume settled as cancelled; the final
  06:59:42 inspection reported the worker cancelled, counts 0/1 and matching
  nonce. The worktree status and diffs were clean; session-file inventory
  showed only a preexisting file and the private probe record.
- Outcome: **passed** for this bounded cancellation and checkpoint
  observation. The session-file baseline had no content hashes, so it does
  not prove existing file contents were unchanged. A no-tools instruction is
  not a sandbox; zero accounted spend at observation does not establish final
  billing. Workspace isolation, routing, exactly-once behavior, project-session
  cancellation and interrupted-task or restart recovery remain unqualified.
- Cleanup: after settlement, the temporary extension files and lock were
  removed, extensions reloaded, provider exit confirmed and the disposable
  worktree remained clean. Run identities and raw result remain in the
  disposable session's private record.

### E-N01-016: active-worker interruption probe preparation

- Work: partial N01-W01/W03. Evidence kind: disposable extension preparation
  and local mock checks, not a live workflow interruption.
  Date: 2026-11-28. Operator: coordinating probe agent.
- Authorization: the operator chose probe preparation and separately authorized
  one worker and an operator-led app quit and reopen for the interruption
  probe. No retry or replacement worker was authorized. The worker and app
  quit have not been initiated.
- Source: disposable worktree commit
  `6ae5dd664dfe3d582b17b0abec16000fd2368ccc`; prepared session-scoped probe
  entry, logic and test SHA-256 values respectively
  `4cad256b2472d6d18db55d2af372b76a68a79b4dc722d7ee7ff96e80ba9089c4`,
  `720a723e795766c372742a46294cee4940e3bd8e7d650da289555f666765d4d8`
  and `b967bab1cd0326b8f3abae73c5f7c0ec260cd46fa5944da6e0f940bfbfa8e6a8`.
  The prepared files and private preparation record remain in the disposable
  session for the proposed run.
- Environment: Linux, Copilot desktop `1.5.0`, serving CLI `1.0.115-7`.
- Procedure: prepare and register a temporary session-scoped extension with
  a durable one-shot guard, private run identity and journaled nonce before
  dispatch, and run-ID-based read-only inspection. Execute six offline mock
  tests; inspect registration, initial readiness and worktree status.
- Actual: the tests passed, the provider was running, the one-shot guard and
  run identity did not yet exist, and the worktree was clean. The prepared
  workflow limits total and concurrent workers to one, with no unspecified
  credit or active-time ceilings. The extension exposes no resume or cancel
  tool.
- Outcome: **passed** for the listed preparation and mock checks only;
  active-worker interruption and recovery are **not-run**. Registration and
  storage survival after a real restart remain unverified. A no-tools prompt
  does not establish isolation, and an ambiguous start or worker state must
  not be retried or treated as inactive.

### E-N01-017: active-worker interruption attempt

- Work: partial N01-W01/W03. Evidence kind: live app probe reported by the
  disposable session; human gate review pending. Date: 2026-11-28.
- Source, environment, authorization and probe hashes: E-N01-016. The
  operator was instructed to fully quit and reopen the app only after an
  active-worker observation. No replacement or retry was authorized.
- Procedure: start once, persist the run identity and journaled nonce, observe
  the run and its single direct worker, then inspect that same run read-only
  after provider reconnection. Compare provider identity, nonce, status, counts
  and workspace; do not resume, cancel, retry or dispatch a replacement.
- Operator confirmation: the operator subsequently confirmed that the app
  actually quit and was also killed via task manager. The exact action
  sequence and timing relative to worker settlement were not recorded.
- Actual: at 07:14:47.680 UTC the run and worker were observed running with
  live/total workers 1/1. Later inspection found the same run in `error`
  with `Worker returned no text`, a cancelled worker and live/total counts
  0/1; the journal and private identity retained the same nonce. The new
  provider process could inspect that run and differed from the earlier
  provider process. The run reported it could be resumed, but was not resumed.
  The worktree had no project edits. Session inventory showed the expected
  probe files and preserved prior private artifacts.
- Outcome: **passed** for rediscovery of the observed run and its nonce after
  provider reconnection; **inconclusive** for interruption causality. The
  worker's final update preceded the newly observed provider startup, but the
  timing of the operator-confirmed app termination was not established: the
  worker could have settled before termination. This does not demonstrate
  interrupted-task recovery,
  isolation, final billing, or exactly-once execution. The prepared provider
  and private records remain in the disposable session.

### E-N01-018: workspace draft investigation

- Work: partial N01-W02. Evidence kind: host tool inspection and
  operator-assisted workspace fixture attempt. Date: 2026-11-28.
  Source: `bdc09cffe062d85ba96c664ddf1882544b4e85a3` plus current
  worktree documentation.
- Procedure: inspect available editor-canvas actions and the host draft
  conflict tool descriptions. Create a disposable text fixture and ask the
  operator to edit it in the workspace view without saving; independently
  inspect the disk before any external write.
- Actual: the editor canvas advertised no agent-callable editing actions.
  The conflict-read tool requires a path and request ID from a pending
  whole-file draft resolution; the completion tool requires the complete
  resolution set. The operator reported the workspace edit saved
  automatically; disk contained the draft text. No external write was
  attempted. The disposable fixture was removed after inspection.
- Outcome: **blocked** for arranging an unsaved-draft scenario; conflict
  resolution was **not-run**. This observation does not establish that the
  host lacks unsaved drafts or conflict handling, nor does host draft
  resolution alone qualify a future MyForge canvas implementation.

### E-N01-019: stale-write filesystem experiment

- Work: partial N01-W02. Evidence kind: local filesystem test, not MyForge
  runtime or host integration. Date: 2026-11-28. Operator: agent.
- Source: `bdc09cffe062d85ba96c664ddf1882544b4e85a3` plus the uncommitted
  [experiment](../probes/stale-write/README.md); test SHA-256
  `4aad38132dacbd97a084c43889c4581a976fe6beedac11cb1ae1265645bc2494`.
  Environment: Linux, Node `v24.22.2`.
- Procedure: run `node --test docs/copilot-app/probes/stale-write/stale-write.test.mjs`
  using separate temporary fixtures. Check a stale base, an unchanged base,
  and an external write intentionally interleaved after the digest check but
  before atomic rename.
- Expected: a preexisting stale write is rejected with draft and live content
  preserved; the unchanged case saves; the interleaved write demonstrates
  whether this candidate protects a concurrent external change.
- Actual: all three tests passed. The stale case preserved both versions and
  the unchanged case saved. The interleaved external write was overwritten
  despite atomic rename; the test deliberately asserts this unsafe result.
- Outcome: **passed** for the local observations, **failed** as a safe
  arbitrary-writer save strategy. This demonstrates a check-to-rename race,
  not host draft behavior, production safety or a validated implementation.
  Conditional atomic writes or an enforced boundary covering all writers
  remain necessary; otherwise saving must be blocked. Temporary test
  directories were removed by the test cleanup.

### E-N01-020: conditional-write boundary inspection

- Work: partial N01-W02. Evidence kind: current bundled SDK declaration and
  available host-tool description inspection; not a runtime concurrency test.
  Date: 2026-11-28. Source: `bdc09cffe062d85ba96c664ddf1882544b4e85a3`
  plus current worktree documentation.
- Procedure: inspect bundled `generated/rpc.d.ts` declarations for session
  workspace file creation and reads, search SDK declarations for conditional
  file-write/version parameters, and inspect the exposed whole-file
  draft-conflict tool contracts.
- Actual: `WorkspacesCreateFileRequest` has `path` and `content` and describes
  creating or overwriting a file in the **session** workspace files directory;
  it exposes no expected-version parameter. `WorkspacesReadFileResult` returns
  content, not a version token. The inspected host draft tools require a
  pending whole-file resolution request, with a matching draft-set revision
  and complete resolved set; a supplied expected disk version rejects a stale
  resolution. Their descriptions do not establish that an extension can
  initiate that request or use the tools as a project-artifact conditional
  write API. E-N01-018 did not produce such a request.
- Outcome: **blocked** for a qualified extension-origin conditional write or
  an enforced boundary covering external project-file writers. This targeted
  inspection is not proof that no other API exists. Do not silently relax the
  artifact contract or claim atomic compare-and-swap from a digest check and
  rename. Until a suitable mechanism is demonstrated, automatic replacement of
  concurrently editable artifacts must remain blocked.

## Historical port phase and gate ledger

The statuses in this table describe the former plan at the time of the pivot.
The former gates are superseded; no status below is a new-plan acceptance.

| Phase | Status | Prerequisite acceptance | Current evidence | Exit gate / reviewer |
| --- | --- | --- | --- | --- |
| P00 | Accepted | None | E-P00-001, E-P00-002, E-P00-003 | G00 accepted by @McFuzzySquirrel |
| P01 | In progress: workflow-owned execution under investigation | G00 accepted | E-P01-001–E-P01-034 | G01 pending |
| P02 | Not started | G01 pending | None | G02 pending |
| P03 | Not started | G02 pending | None | G03 pending |
| P04 | Not started | G03 pending | None | G04 pending |
| P05 | Not started | G04 pending | None | G05 pending |
| P06 | Not started | G04 pending | None | G06 pending |
| P07 | Not started | G05/G06 pending | None | G07 pending |
| P08 | Not started | G07 pending | None | G08 pending |
| P09 | Deferred | G08 + separate feasibility pending | None | G09 pending |

## Planning evidence

### E-P00-001: tracked source snapshot

- Work: P00-T01; requirements: APP-15/APP-19; scope: baseline import only.
- Source commit: `0994c0a644975b771aa813a1223f8d0ac958f867`.
- Import commit: `00fe362fbdaaf0c2c45a54315a95c684d1ce1d9b`.
- Method: `git archive` of source HEAD, fresh destination Git initialization,
  tracked import commit; source working tree was clean.
- Expected: identical 608 file paths, bytes and executable modes; no upstream
  history or untracked files.
- Runner/time: GitHub Copilot documentation task, 2026-11-26T06:44:48Z
  (validation time recorded after the check).
- Procedure: compare the complete output of `git ls-tree -r
  0994c0a644975b771aa813a1223f8d0ac958f867` in the source checkout with
  `git ls-tree -r 00fe362fbdaaf0c2c45a54315a95c684d1ce1d9b` in this
  checkout. Entries include mode, object type, blob hash and path.
- Result: **passed**; all 608 paths, content hashes and file modes match.
- Limitations: no copied runtime tests, app install or human architecture
  acceptance is implied by this import.

### E-P00-002: planning document validation

- Work: P00-T02/P00-T03; requirement: APP-19.
- Scope: Markdown plans, dependency/coverage links and evidence infrastructure.
- Expected: all planning links resolve; phase IDs, gates, work-item IDs and
  acceptance references are consistent; README/changelog version agrees.
- Runner/time: GitHub Copilot documentation task, 2026-11-26T06:44:48Z
  (validation time recorded after the check).
- Procedure: resolve every relative Markdown link in `docs/copilot-app/**/*.md`
  plus the newly added entry links in README, changelog, documentation map and
  inherited root plan. Check requirement/scenario tables contain APP-01-APP-20
  and V01-V20; each of ten phase files has its correct ID/gate, sub-agent scopes,
  validation, risk/failure treatment and unique checklist work IDs. Compare
  README's Latest marker with the first changelog release. Run `git diff --check`
  and inspect modified paths and the original source working tree.
- Result: **passed**; 79 new local links resolve, 20 requirement IDs and 20
  scenario IDs are complete, ten phase gates and 54 checklist work IDs are
  consistent/unique, README/changelog both identify v3.130, and whitespace
  validation passes. Changes after import are Markdown only; source working
  tree remains clean. No app-runtime or implementation test result exists.
- Final implementation/document commit: the commit introducing these documents,
  discoverable in this repository's Git history; no self-referential hash needed.
- Gate acceptance: pending operator review; publishing documentation is not G00.

### E-P00-003: operator acceptance of G00

- Work: P00-T04; requirements: APP-15/APP-19; gate: G00.
- Reviewer: @McFuzzySquirrel, 2026-11-26T20:11:43Z (recording time).
- Evidence presented for review: E-P00-001 and E-P00-002, the plan, P00
  checklist and evidence ledger, with the Linux-first scope revision in the
  current worktree.
- Decision: **accepted**. The operator selected “Accept G00” after being asked
  to review baseline provenance, scope, dependencies and acceptance coverage.
  This acceptance does not establish app architecture feasibility or G01.
- Source: `ed40fe1` with uncommitted Linux-first planning revisions.

### E-P01-001: CLI and SDK capability baseline

**Correction:** E-P01-002 supersedes this record's conclusion that an app-owned
session was unavailable. The process inspection did not establish that fact.

- Work: P01-T01/P01-T05; requirements: APP-01, APP-07, APP-12, APP-13,
  APP-14; Q01/Q02.
- Scope: local CLI identity, public Copilot app documentation and public SDK
  source for extension/canvas behavior. No real desktop app session was created.
- Environment: Linux planning environment; GitHub Copilot CLI `1.0.115`;
  public docs and SDK sources checked on 2026-11-26.
- Procedure: run `copilot --version`, `copilot --help`, `copilot app --help`,
  inspect local process presence, and retrieve the app overview/session/canvas
  pages plus the SDK extension and canvas source.
- Expected: exact supported app/SDK versions and a verified native-owner
  dispatch, observation, cancellation and lifecycle capability matrix.
- Actual: the app docs state Windows, macOS and Linux support, parallel local
  worktrees or cloud sandboxes, session modes, tool permissions, BYOK and
  canvas plugins. The SDK extension source exposes `joinSession()`, session
  extension options and experimental canvas declarations/actions; the public
  docs describe extension processes over JSON-RPC and canvas reload/lifecycle
  behavior. Local evidence confirms CLI `1.0.115` and the `copilot app`
  launcher, but no active desktop app process or app-owned native session was
  observed.
- Result: **blocked**. Public documentation and SDK source are capability leads,
  not proof of dispatch/terminal/cancellation/lifecycle support. Mock, CLI-only
  and SDK-source checks cannot pass G01.
- Limitations: app/SDK versions were not pinned by an installed desktop package;
  no Windows/macOS host, trusted disposable repository probe or app-owned
  session exists in this environment. Q01/Q02 remain open.
- Gate acceptance: pending operator/desktop test evidence; this record does not
  imply G01.

### E-P01-002: serving desktop app identification and scope revision

- Work: P01-T01; requirement: APP-14; scope: environment identification and
  operator-directed platform scope revision, not an extension integration test.
- Date: 2026-11-26. Source baseline: `ed40fe1` with uncommitted planning changes.
- Procedure: query the serving desktop app's version via `get_app_info`; run
  `uname -srm` and `copilot --version` in the session workspace.
- Actual: the serving desktop app reports version `1.5.0`, not a local source
  build. The execution host reports Linux aarch64 and CLI `1.0.116`. The CLI
  on the execution host is not necessarily the app's bundled CLI. The user
  deferred Windows and macOS to a possible v2 and selected Linux for the
  initial evaluation.
- Outcome: **passed** for these observations; no P01 work item or gate is
  complete. The SDK version, extension-callable dispatch and ownership,
  cancellation, lifecycle and recovery remain unverified. G00 remains pending
  operator review at the time of this observation; Windows/macOS are not
  initial-release targets. G00 was subsequently accepted in E-P00-003.
- Supersedes: E-P01-001's conclusion about absence of an app-owned session;
  its documentation observations remain historical.

### E-P01-003: experimental workflow API candidate

- Work: partial P01-T01; requirement: APP-01/APP-07; scenarios: V01/V02/V07.
- Environment and date: serving desktop app `1.5.0`; its bundled extension
  documentation and public SDK documentation inspected on 2026-11-26. The
  bundled SDK package version was unavailable: attempting to read its
  `package.json` at the SDK documentation root failed because it was absent.
- Sources: bundled `docs/extensions.md` and `docs/workflows.md`, and the
  [public workflow documentation at SDK revision
  `661f503e957165d29a16918efb1b629e6b5db85a`](https://github.com/microsoft/copilot-sdk/blob/661f503e957165d29a16918efb1b629e6b5db85a/nodejs/docs/workflows.md).
  The public revision is a reference, not a verified identity of the bundle.
- Actual: documentation describes extensions joining the foreground CLI
  session and registering experimental, session-scoped dynamic workflows.
  `ctx.agent` runs workflow-owned subagents; the workflow APIs describe run
  identity, observation, pause, cancellation and resume. Journaled steps are
  best-effort at-least-once, and ordinary agent failures can return `null`.
  This is a candidate for investigation, not proof it supplies app-owned
  task sessions or the engine's full `HarnessAdapter` contract.
- Adapter comparison: `TaskAttemptRequest` requires task/agent context, model,
  isolated repository root, timeout, cancellation and optional session ID;
  `TaskResult` includes outcome, outputs, diagnostics and optional usage.
  Workspace isolation, native session identity and scope, actual provider
  routing, terminal diagnostics and recovery are not established by this
  documentation review.
- Outcome: **passed** as documentation analysis only; no native task,
  integration, lifecycle or provider scenario was executed. G01 remains
  pending. The next probe must verify these gaps in a trusted disposable Linux
  repository; the experimental API may not satisfy the required semantics.

### E-P01-004: disposable canvas probe

- Work: partial P01-T02/P01-T03/P01-T04; requirements: APP-01/APP-12;
  scenarios: partial V01/V02/V08.
- Environment and date: Linux desktop app session, 2026-11-26. Probe source
  and notes are uncommitted in a separate disposable project worktree; the
  SDK version and exact probe revision were not reported.
- Evidence kind: observations reported by the probe session; not independently
  verified here. No agent was dispatched by the probe.
- Actual: the project-scoped probe extension registered after reload and its
  canvas opened. Its loopback endpoint responded; `get_status` returned ready
  with null host context. `probe_action` reported that `session.send` and
  workflow `run`/`start` methods existed, without invoking dispatch. Invalid open
  input and a reserved action were rejected. Reload rehydrated the canvas at
  a different responding port.
- Outcome: **not-run** for complete V01/V02/V08 scenarios; the observations
  above cover only parts of them. Extension-callable,
  app-managed project-session dispatch was not identified in the inspected SDK;
  workflow-owned subagents were not demonstrated to be equivalent. App restart,
  canvas close, visual rendering, cancellation, recovery, actual provider
  routing and task isolation remain untested. SDK-initiated workflow run/resume
  do not request permission and were not invoked.
- Follow-up: retain the disposable probe and its removal instructions until
  results can be reviewed and reproduced; identify a supported dispatch path
  and capture versioned evidence. G01 remains pending.

### E-P01-005: one workflow-owned subagent

- Work: partial P01-T01/P01-T03; requirements: APP-01/APP-17;
  scenarios: partial V01/V02/V15.
- Environment: serving desktop app `1.5.0`; Linux aarch64 execution host;
  host CLI `1.0.116`; SDK version unknown. Recorded 2026-11-26.
- Evidence kind: actual app-session dynamic workflow execution, not an
  extension-driven workflow or app-owned project-session integration test.
- Procedure: after operator approval, register the session-scoped experimental
  workflow `p01-single-worker-probe` with a total limit of one subagent. Its
  single agent is instructed to return `P01_PROBE_OK` without tools, network,
  file access or delegation. Start the workflow and inspect its run result.
- Expected: one agent and a completed run returning `P01_PROBE_OK`.
- Actual: the run completed on its first attempt with one completed agent and
  returned the expected string. The runtime reported `0.13` AI credits.
  Run and agent identities remain in this session's workflow history rather
  than being published in this public ledger.
- Outcome: **passed** for the bounded workflow-owned subagent check only;
  V01/V02/V15 and G01 remain **not-run**. This did not demonstrate a
  project-owned session, extension invocation, model/provider selection,
  cancellation, resume, isolation, restart recovery or exactly-once effects.
  The test does not establish that this route satisfies `HarnessAdapter`.

### E-P01-006: canvas lifecycle and SDK interface inspection

**Correction:** E-P01-007 identifies an experimental host-managed session
creation API that was missed in the initial interface inspection.

- Work: partial P01-T01/P01-T04; requirement: APP-12; scenarios: partial V02/V08.
- Environment and date: Linux desktop app session, 2026-11-26; app `1.5.0`.
  The probe session reports bundled CLI `1.0.115-7` and SDK protocol `4`;
  a separate SDK package version was not established.
- Evidence kind: observations reported by the disposable probe session, not
  independently verified here. Probe code and notes remain uncommitted in its
  separate worktree.
- Actual: two canvas instances reported distinct responding endpoints and two
  open instances. Focusing one preserved its endpoint. Closing the other left
  the survivor responsive, made the closed instance unavailable and its prior
  endpoint refuse connections. Reopening the closed ID produced a new
  responding endpoint; self-close was rejected.
- The inspected SDK declarations describe `joinSession` attaching to the
  foreground session and `CopilotClient.createSession` creating SDK sessions.
  The probe session did not identify an extension-callable desktop
  project-session dispatch API. This is an inspection result, not a proof
  that no such API exists. No agent or workflow was started.
- Outcome: **not-run** for complete V02/V08; the observations cover parts of
  canvas lifecycle only. Visual rendering, desktop close/restart, native task
  dispatch and recovery remain unverified. G01 remains pending.

### E-P01-007: host-managed session API candidate

- Work: partial P01-T01; requirement: APP-01; scenario: V02.
- Environment and date: Linux desktop app session, 2026-11-26; app `1.5.0`;
  bundled SDK protocol `4` reported by the probe session.
- Evidence kind: SDK declaration inspection reported by the probe session;
  not an executed integration test.
- Actual: bundled `generated/rpc.d.ts` documents experimental
  `session.rpc.management.create`, which asks the owning host to create and
  supervise a separate session and returns an ID before task completion.
  Documentation says creation requires an enabled policy and host handler;
  the policy defaults off. `session.d.ts` also exposes host handler
  registration and policy configuration. Neither was used by the probe.
- Outcome: **passed** as identification of a documented candidate only.
  The desktop host's existing policy, handler, session ownership, routing,
  terminal result and recovery remain unknown. No session was created in
  this observation, V02 remains **not-run**, and G01 remains pending.
- Supersedes: E-P01-006's incomplete SDK interface survey, not its canvas
  lifecycle observations.

### E-P01-008: host-managed session creation disabled

- Work: partial P01-T03; requirements: APP-01/APP-07; scenarios: V02/V07.
- Environment and date: Linux desktop app session, 2026-11-26; app `1.5.0`;
  bundled SDK protocol `4` reported by the probe session.
- Evidence kind: observations reported by the disposable probe session; not
  independently verified here.
- Procedure: invoke documented `session.rpc.management.create` once through
  the probe extension, requesting a harmless no-file-change response. Omit
  model, effort, context tier and working-directory overrides.
- Actual: the call returned `Request session.management.create failed with
  message: This session management tool is disabled`. No session ID or
  terminal result was returned. No policy, handler or permission was changed;
  no fallback was used. The temporary probe action was removed from source.
- Outcome: **blocked** for this session and configuration. This result does
  not establish whether a desktop host creation handler exists or whether
  app-managed project sessions are possible when policy is enabled.
  Cancellation, restart recovery, workspace ownership and routing remain
  untested; G01 remains pending.

### E-P01-009: session-management policy inspection

- Work: partial P01-T01; requirements: APP-01/APP-20; scenario: V02.
- Environment and date: Linux desktop app session, 2026-11-26; app `1.5.0`.
  Inspection of bundled SDK declarations was reported by the probe session.
- Actual: the experimental `management.configure` API changes live policy;
  enabling its master switch resets all operations to enabled before applying
  any per-tool overrides. Documented scopes include eligible local peers or
  the native runtime alone. The probe session found no documented read-only
  policy accessor, desktop operator setting or promise of a default desktop
  creation handler. The host must provide a handler that owns workspace and
  approval routing. No configuration or handler was changed.
- Outcome: **passed** as declaration inspection only. Exact restoration of
  previous policy, desktop-host enablement and a desktop project-session
  handler remain unverified. Enabling the policy or registering an
  extension-owned handler would not by itself prove app-managed project
  ownership. V02 and G01 remain pending.
- Follow-up: obtain a supported desktop-host enablement and handler contract,
  or bring an explicit scope revision/no-go decision to the operator. Do not
  silently widen peer permissions.

### E-P01-010: operator-approved execution scope revision

- Work: P01-T01/P01-T03; requirements: APP-01/APP-07/APP-08/APP-10/APP-13.
- Operator: @McFuzzySquirrel, 2026-11-26T20:43:26Z (recording time).
- Decision: evaluate workflow-owned subagents instead of requiring a separate
  app project session for each task. The operator approved this option after
  being told recovery, isolation and model routing still need proof.
- Boundaries: this is not G01 acceptance, a claim of full parity, permission
  to bypass host controls, or approval of continuation after app quit. Existing
  human-review, session-scope, isolation, routing and recovery requirements
  remain mandatory; gaps require an explicit future scope decision.
- Supersedes: the requirement to prove separate project-session dispatch in
  E-P01-008/E-P01-009. Their observed results remain valid historical evidence.

### E-P01-011: controlled workflow checkpoint

- Work: P01-T03; requirements: APP-07/APP-08; scope: current-session workflow
  tooling, not extension invocation.
- Runner: GitHub Copilot, 2026-11-26; app version 1.5.0; Linux. Individual
  run and worker identities and runtime details are retained in session history.
- Procedure: start a workflow with one no-tools worker returning a harmless
  marker, followed by a checkpoint; inspect its paused run.
- Expected and actual: the worker completed with the requested marker, one
  completed worker and its journaled result were reported, and the run paused
  at the checkpoint. **Partial observation**; the run has not been resumed.
- Limitations: no claim about replay, duplicate dispatch, cancellation, app
  restart, extension integration, workspace isolation or routing. This does
  not satisfy G01 or test a crash.

### E-P01-012: controlled workflow checkpoint resume

- Work: P01-T03; requirements: APP-07/APP-08; scope: current-session workflow
  tooling; continuation of E-P01-011, authorized by the operator.
- Procedure: resume the same paused run and inspect the resulting terminal
  record. Run and worker identities remain in private session history.
- Result: **passed for this controlled checkpoint**. The second attempt
  completed with the same marker; inspection reported one completed worker
  with the same identity as before resume. The runtime reported 0.02 AI credits
  across one subagent.
- Limitations: the reported worker identity is not proof of exactly-once
  external effects. No extension invocation, cancellation, app quit, crash,
  concurrent dispatch, workspace isolation or provider routing was tested.
  G01 remains pending.

### E-P01-013: extension workflow API inspection

- Work: P01-T01/P01-T03; requirements: APP-01/APP-07/APP-13; scope:
  documentation inspection reported by the disposable probe session,
  2026-11-26. No workflow or agent was started by that session.
- The inspected bundled `extension.d.ts` exposes `defineWorkflow` and
  `joinSession({ workflows })`; `docs/workflows.md` documents `ctx.agent` and
  `session.workflow.start`. `workflow.d.ts` documents run status, details,
  waiting and cancellation. The [versioned workflow reference](https://github.com/microsoft/copilot-sdk/blob/661f503e957165d29a16918efb1b629e6b5db85a/nodejs/docs/workflows.md)
  is available for further review.
- Result: **documentation evidence only**. A workflow run belongs to the joined
  session; SDK-initiated run/resume do not request permission. An admission
  envelope is not a terminal result, and a worker may return `null`. A no-edit
  prompt is not a technical no-write sandbox.
- Limitations: availability, extension-originated execution, provider routing,
  isolation, host lifecycle and recovery remain unverified. Explicit operator
  authorization is required before an SDK-originated probe; G01 remains pending.

### E-P01-014: extension-originated workflow dispatch

- Work: P01-T03; requirements: APP-01/APP-07; scope: disposable Linux project
  and extension, reported by its probe session on 2026-11-26. The operator
  directly authorized one extension-originated SDK probe with at most one worker.
- Procedure: invoke `session.workflow.start` once with a one-worker limit;
  observe admission, terminal status and available worker details. The fixed
  prompt requested no tool use, commands or file changes; a null worker result
  was treated as failure. Raw identities remain in private session history.
- Result: **passed for this bounded dispatch**. Admission reported a running
  first attempt; the terminal SDK observation reported a completed workflow
  with the requested marker and one completed workflow-owned worker. Reported
  spend was 0.124096 AI credits.
- Limitations: the prompt is not a technical no-write sandbox, and the reported
  SDK observation alone does not establish tool non-use. No model or specialist
  override was requested and no provider route was reported. Resolved-model
  values differed between running and completed snapshots; the latter was the
  later observation. No cancellation, app restart, recovery or workspace
  isolation was tested. Separate project-session dispatch is not implied;
  G01 remains pending.

### E-P01-015: extension-originated checkpoint resume

- Work: P01-T03; requirements: APP-07/APP-08; scope: disposable Linux project
  and extension, reported by its probe session on 2026-11-26. The operator
  directly authorized one extension-originated checkpoint/resume probe with at
  most one worker and no app quit.
- Procedure: start once, pause after a journaled preparation step and before
  worker dispatch, then resume the same run once via the SDK. Inspect the
  terminal result, preparation counter and worker detail; identities remain in
  private session history.
- Result: **passed for this controlled checkpoint**. The first attempt paused
  with no workers and a journaled preparation value. The second completed with
  that value, the in-process preparation counter still at one, and one completed
  worker returning the requested marker. Reported spend was 0.0386176 AI credits.
- Limitations: this same-provider test does not prove crash or restart recovery,
  exactly-once effects or avoidance of duplicate worker dispatch after a worker
  has started. The no-tools prompt is not a technical sandbox or proof of tool
  non-use. Cancellation, routing, isolation and app-owned project-session
  dispatch were not demonstrated; G01 remains pending.

### E-P01-016: extension-originated cancellation

- Work: P01-T03; requirements: APP-07/APP-08; scope: disposable Linux project
  and extension, reported by its probe session on 2026-11-26. The operator
  directly authorized one extension-originated cancellation probe with at most
  one worker, without app quit or permission changes.
- Procedure: start one SDK workflow with a one-worker limit, observe an active
  worker, issue one SDK cancellation request and inspect the resulting status.
  Raw identities remain in private session history.
- Result: **passed for this bounded cancellation**. Before cancellation the
  workflow and its one worker were running; the cancel response reported
  cancelled. Follow-up detail reported the worker cancelled, zero live workers
  and one total spawned worker. Reported spend at observation was zero; that
  does not establish zero eventual billing.
- Limitations: the no-tools prompt is not a technical sandbox or proof of tool
  non-use. This does not demonstrate project-session cancellation, app
  restart, crash recovery, workspace isolation or provider routing; G01 remains
  pending.

### E-P01-017: settled-checkpoint restart preparation

- Work: P01-T04; requirements: APP-07/APP-08; scope: procedure and SDK
  documentation inspection, reported by the disposable probe session on
  2026-11-26. No workflow was started or resumed and no app restart occurred.
- The proposed procedure persists the exact run identity and journaled nonce
  before operator-led quit, reconnects to the same session after restart and
  inspects the same paused run before an explicitly authorized resume. Existing
  probe controls cannot resume it after restart: the run ID is in process
  memory and the saved resume guard is consumed. A reviewed run-ID-based
  resume action would be required.
- Result: **not-run**. Reopening the exact session, persisted SDK storage and
  provider registration, and resume eligibility are unverified. A paused
  checkpoint restart is not an active-work interruption or a hard-crash test;
  journaled producers are documented as best-effort at-least-once. G01 remains
  pending.

### E-P01-018: paused-checkpoint app restart

- Work: P01-T04; requirements: APP-07/APP-08; scope: disposable Linux project
  and extension, reported by its probe session on 2026-11-26. The operator
  authorized the probe and performed the app quit and reopen.
- Procedure: start one workflow with a journaled nonce and checkpoint before
  dispatch; preserve its identity and inspect it after restart, then resume
  that same run once via the SDK. An initial reopening did not change the
  provider process, so the probe stopped until the operator fully quit and
  reopened the app. Identities and snapshots remain in private session history.
- Result: **passed for this paused-checkpoint restart**. The first attempt
  paused with zero workers and was resumable. After the provider process
  changed, the same session, run, checkpoint and nonce were observed. The
  second attempt completed with the same nonce and one completed worker; no
  workers remained live. Reported spend was 0.0193515 AI credits.
- Limitations: the matching nonce supports durable journal replay, not
  exactly-once side effects. The no-tools prompt is not a technical sandbox or
  proof of tool non-use. No model or specialist override was requested and no
  provider route was reported. Active-work interruption, hard-crash recovery
  and desktop-owned project-session dispatch were not demonstrated; G01 remains
  pending.

### E-P01-019: active-worker interruption preparation

- Work: P01-T04; requirements: APP-07/APP-08; scope: procedure and SDK
  documentation inspection, reported by the disposable probe session on
  2026-11-26. No workflow was started or resumed and no app quit occurred.
- A distinct one-shot probe is needed: the previous restart probe is consumed
  and pauses before worker dispatch. The proposed procedure requires an
  observed active worker before operator-led quit, then read-only inspection of
  the same run after restart. Resume or a replacement worker requires separate
  authorization and cumulative budget checks. No blind retries are permitted.
- Result: **not-run**. A fast worker may finish before quit, making the test
  inconclusive. The documented lease and halted-run behavior has not been
  verified after app quit; normal quit is not hard-crash proof. A one-worker
  limit across attempts may prevent a replacement rather than reattach to the
  original worker. G01 remains pending.

### E-P01-020: active-worker app quit

- Work: P01-T04; requirements: APP-07/APP-08; scope: disposable Linux project
  and extension, reported by its probe session on 2026-11-26. The operator
  authorized one active-worker interruption probe and performed the quit and
  reopen; resume or a replacement worker required fresh approval.
- Procedure: start one workflow with a persisted nonce and one active worker;
  after operator-led app restart, inspect the same session and run without
  resuming it. Identities and raw output remain in private session history.
- Result: **observed failure; recovery not attempted**. The extension process
  changed. The original first attempt reported error because the worker
  returned no result; the worker was reported cancelled, with no live workers
  and one total spawned worker. The journal nonce persisted and the run
  reported it was resumable. Accounted spend at observation was zero; that does
  not establish eventual billing.
- Limitations: exact cancellation timing and cause are unknown. No resume,
  replacement worker, lease-expiry recovery or hard-crash recovery was tested.
  This demonstrates persisted failure state, not continuation after quit or
  successful recovery. G01 remains pending.

### E-P01-021: interrupted-run resume under a one-worker cap

- Work: P01-T04; requirements: APP-07/APP-08; scope: disposable Linux project
  and extension, reported by its probe session on 2026-11-26. The operator
  directly authorized one SDK resume of the E-P01-020 run and prohibited raising
  its worker limit or starting a separate replacement run.
- Procedure: resume the same run once without overrides, then inspect its
  detail. Identities remain in private session history.
- Result: **failed safely at the limit**. The second attempt settled with a
  workflow-limit error because its one-worker total was already reached. Detail
  confirmed the declared and effective limit remained one, no worker was live,
  the original cancelled worker was the only worker, and the journal nonce was
  unchanged. A runtime suggestion to raise the limit was not applied. Accounted
  spend at observation was zero.
- Limitations: this demonstrates cumulative worker-limit enforcement across
  attempts, not reattachment to or successful continuation of an interrupted
  worker. G01 remains pending.

### E-P01-022: workflow worker workspace-isolation inspection

- Work: P01-T01/P01-T03; requirement: APP-08; scope: bundled SDK
  declaration inspection reported by the disposable probe session on
  2026-11-26. Nothing was executed, created or changed.
- Findings: documented `ctx.agent` options are label, schema, model, reasoning
  effort, context tier, agent and timeout; workflow start options are args,
  limits and notification/logging settings. Neither exposes a worker working
  directory, workspace, permission or sandbox option. A workflow-scoped custom
  agent can set a tool allowlist, but that limits available tools rather than
  confining an allowed tool's filesystem access. Session-level working
  directory, tool filtering and permission handling exist, but are not
  per-worker options; changing the parent session's directory is not a
  per-worker worktree API.
- Observation: workflow worker summaries do not include a working directory or
  child session ID. Parent-session metadata and caller-supplied context checks
  do not prove a worker's actual directory. An authorized read-only worker
  command could establish the directory of that invocation; model prose cannot.
- Result: **documentation evidence only**. No documented per-worker
  worktree-bound sandbox was identified. A separate app session rooted in a
  disposable worktree could test worktree-relative operation, not hard
  confinement. Hard isolation is blocked pending a verified host-enforced
  boundary. APP-08 parity is unproven; G01 remains pending.

### E-P01-023: operator decision on sequential execution

- Work: P01-T05; requirement: APP-08; decision D-11.
- Operator: @McFuzzySquirrel, 2026-11-26T21:14:47Z (recording time).
- Decision: in response to E-P01-022, the operator chose for the initial
  release to run app-managed tasks sequentially in the session workspace and
  defer concurrent isolated execution.
- Consequences: APP-08/V09 now require sequential attribution, clean-tree
  preflight, handling partial changes from cancelled attempts, preservation of
  unrelated user work and visible rejection of concurrency above 1. The
  baseline engine's concurrent worktree mode is not claimed for the app edition.
- Not decided: the recovery approach for an active worker cancelled by app quit
  (retry as a new attempt after reconciliation) remains an open operator
  decision. This is not G01 acceptance.

### E-P01-024: workflow worker model-routing inspection

- Work: P01-T05; requirements: APP-13, APP-17 (model/provider routing).
- Method: documented bundled SDK inspection by the disposable probe session;
  no workflow, agent, extension or permission change.
- Findings: `ctx.agent` accepts a free-form `model` string and an `agent`
  name/reference (`workflow.d.ts:137-156`); catalog validation, unknown-model
  errors and strict no-fallback for a direct model override are not documented.
  Custom-agent models are preferences that fall back to the parent unless
  `modelPolicy:'required'` (`types.d.ts:1811-1822`). `getRunDetail` reports
  per-worker `model.requested` and `model.resolved` (`generated/rpc.d.ts:46390-46399`)
  but no provider field, so provider identity cannot be proven from run detail.
- Prepared, not run: one-worker positive case requesting a concrete catalog
  model and comparing requested/resolved; optional separately authorized
  negative case with a fabricated model ID. Both require direct operator
  authorization in the probe session. APP-13 parity is unproven; G01 pending.

### E-P01-025: explicit-model workflow worker probe

- Work: P01-T05; requirements: APP-13, APP-17.
- Authorization: operator directly authorized one extension-originated,
  one-worker probe in the disposable probe session and selected the model ID
  from that session's `session.rpc.model.list` catalog.
- Run: `e98cb8ed-98cd-40d9-aa75-dcc991976432`, attempt 1, completed with
  `P01_MODEL_ROUTE_OK`; worker `c9c764aa-3615-485d-b91d-7f1790093068`
  (general-purpose), `maxTotalSubagents:1`, one total worker, zero live.
- Model: `ctx.agent` requested `claude-sonnet-5.5` with no agent, effort or
  context override; run detail reported `model.requested` and
  `model.resolved` both `claude-sonnet-5.5`.
- Accounting: 15,968,300,000 nano-AIU (15.9683 AI credits), far above earlier
  Auto-routed probes (0.02–0.12 credits) for a similarly trivial prompt.
- Limits: the catalog listed the provider as GitHub Copilot, but run detail
  has no provider field, so provider identity is not proven. Resolved model
  reflects child initialization, not every inference call. No negative case,
  retry, resume, permission change or CLI fallback occurred. BYOK/local
  provider routes and silent-reroute rejection remain untested; G01 pending.

### E-P01-026: operator decision on session scope

- Work: P01-T05; requirement: APP-10; decision D-12.
- Operator: @McFuzzySquirrel, 2026-11-26T21:40:00Z (recording time).
- Finding: baseline phase scope resumes one native conversation per phase by
  session ID under a phase-lead agent (`templates/skills/forge-workflow-engine/scripts/engine.ts`,
  `types.ts` `sessionScope`). Bundled SDK `WorkflowAgentOptions`
  (`workflow.d.ts:137-156`) offers only label, schema, model, reasoningEffort,
  contextTier, agent and timeoutSeconds; no option continues an earlier worker
  conversation, so every `ctx.agent` call starts fresh.
- Decision: the initial release supports task session scope only; phase scope
  is deferred and must be rejected visibly rather than approximated.
- Not decided: interrupted-worker recovery remains open. This is not G01
  acceptance.

### E-P01-027: operator decision on interrupted-worker recovery

- Work: P01-T04; requirements: APP-06, APP-07; decision D-13.
- Operator: @McFuzzySquirrel, 2026-11-26T21:45:00Z (recording time).
- Basis: E-P01-020 showed app quit cancelled an active worker and left the run
  in error; E-P01-021 showed resume could not admit a replacement under a
  cumulative one-worker limit.
- Decision: record the cancelled worker as an interrupted attempt, reconcile
  its partial workspace changes, then retry as a new attempt with its own
  worker allowance. Resuming the cancelled run with a raised limit is rejected.
- Not shown: this policy is unimplemented and untested; hard-crash recovery
  and window-close behavior remain unverified. This is not G01 acceptance.

### E-P01-028: remaining G01 probe procedures prepared

- Work: P01-T03/P01-T04; requirements: APP-07, APP-13; validation V01, V08.
- Method: the disposable probe session prepared, but did not run, five
  separately authorizable one-worker procedures: process inspection during an
  active worker (V01), extension reload with a worker running (V08), racing
  duplicate canvas starts against one durable lock (V08), window close without
  quit (P01-T04) and a fabricated-model negative case (APP-13).
- Bounds: each needs its own operator approval, `maxTotalSubagents:1`, an
  operator-chosen credit budget and timeout, a durable one-shot lock written
  before SDK start, and no retry, replacement, resume or raised limit. Budget
  and timeout are soft; spend can exceed them.
- Limits: process snapshots cannot prove absence of transient or remote
  runtimes; provider reload is not necessarily runtime loss; window close must
  be distinguished from quit; one fabricated ID does not cover a valid but
  unavailable model. Nothing was started; G01 pending.

### E-P01-029: duplicate canvas start race

- Work: P01-T04; requirement: APP-07; validation V08.
- Authorization: operator directly authorized one duplicate-start probe in the
  disposable probe session: one run, at most one worker, Auto model,
  `maxAiCredits:1`, `timeoutSeconds:120`.
- Observation: two canvas instances in one provider (PID 291958) issued
  concurrent start actions after a bounded rendezvous; both attempted exclusive
  creation of a shared `start.lock` in the same millisecond. One acquired it and
  admitted run `2f9d92c1-c4fa-4274-b283-0ce9733b30da`; the other received
  `EEXIST` and failed before any SDK start. No retry.
- Outcome: attempt 1 completed with `P01_DUPLICATE_OK`; one total worker
  (`02a9401b-991d-486a-a5e9-c3ae5cc6773d`), zero live, one matching run in the
  owner-session listing, limits unchanged; 19,750,500 nano-AIU (0.0197505 AI
  credits). Auto-resolved model differed between running and final snapshots.
- Limits: two panels in one provider, not independent provider processes;
  not crash-safe exactly-once dispatch or desktop project-session ownership.
  G01 pending.

### E-P01-030: V01 process inspection (inconclusive)

- Work: P01-T03; requirement: APP-01; validation V01.
- Authorization: operator directly authorized one process-inspection probe:
  one run, at most one worker, Auto model, `maxAiCredits:1`,
  `timeoutSeconds:180`, read-only inspection of the owned process tree and one
  deadline cancel if needed (not used).
- Outcome: **inconclusive.** Run `1a6617a5-8c30-47d0-acb5-774cd6c0b048`
  completed attempt 1 with sole worker `b4cdbbb5-43a8-4860-9151-a69999a9d365`
  (Auto resolved `mai-code-2-flash`); 25,586,400 nano-AIU (0.0255864 AI
  credits), 7,910 ms active. The worker finished about 12.6 s before the first
  process capture, so no active-worker snapshot exists. No retry.
- Defect: the initial helper read only the main thread's `children` file and
  missed the provider; those snapshots are preserved as incomplete. The
  corrected helper aggregates all threads and rejects snapshots missing the
  provider.
- Terminal-only observation: corrected snapshot after completion showed
  unchanged app and runtime processes, 18 runtime-tree processes (extension
  bootstrap, CodeGraph and Azure MCP chains) and no `-p`/`--prompt` flags. This
  is not evidence about execution time. A future V01 must capture while the
  worker is running; G01 pending.

### E-P01-031: V01 process inspection retry (inconclusive)

- Work: P01-T03; requirement: APP-01; validation V01.
- Authorization: operator separately and directly authorized one retry with an
  automatic capture: one run, at most one worker, Auto model,
  `maxAiCredits:1`, `timeoutSeconds:180`, read-only inspection.
- Outcome: run `b7f8f9d1-31c2-475b-8a84-98c8c16fadde` completed attempt 1;
  worker `f4be76a7-74c6-45dd-902f-2fccce21bd94` (Auto resolved
  `mai-code-2-flash`); 25,586,400 nano-AIU (0.0255864 AI credits), 7,529 ms
  active. No deadline cancel, retry or replacement.
- Observation: a read-only observer polled `getRunDetail` every 100 ms and
  captured the process tree while the same worker was reported running. All
  18 baseline processes were retained with stable app, runtime and provider
  identities, and no identified process had `-p`/`--prompt`. One extra
  process appeared and exited before it could be identified.
- Finding: **inconclusive.** An active snapshot was achieved and no positive
  evidence of an unauthorized runtime was seen, but the unidentified transient
  process and snapshot-only coverage prevent a clean V01 pass. G01 pending.

### E-P01-032: invalid-model negative probe

- Work: P01-T03; requirement: APP-13.
- Authorization: operator directly authorized one run, at most one worker,
  model `p01-invalid-model-do-not-route`, `maxAiCredits:1`,
  `timeoutSeconds:120`, no retry or second spelling.
- Outcome: run `7ded6a4c-6047-423f-b2f6-12fd4171679e` was admitted, then
  attempt 1 ended in error. Worker `1b13228a-6099-4369-baae-e40bb5b39d1d`
  failed; `ctx.agent` returned null and the guard raised
  `P01 invalid model worker returned no result`. One total worker, zero live,
  limits unchanged, 1,348 ms active, 0 nano-AIU accounted at observation.
- Finding: the fabricated ID failed visibly after admission; no successful
  output or reroute to another model was observed. Run detail reported both
  `model.requested` and `model.resolved` as the fabricated ID, so matching
  requested and resolved values alone do not prove a valid route; the failure
  reason and validation stage are not exposed. A valid but unavailable model
  and BYOK/local routes remain untested. `canResume:true` was not exercised.
  G01 pending.

### E-P01-033: extension reload with an active worker

- Work: P01-T04; requirement: APP-07; validation V08.
- Authorization: operator directly authorized one run, at most one worker,
  Auto model, a longer bounded no-tools task, `maxAiCredits:1`,
  `timeoutSeconds:180`, one normal extension reload while the worker was
  running, and read-only observation by saved run ID; no resume or replacement.
- Observation: run `a10624fc-4e90-437b-90bb-2e53b5b07259` and worker
  `80ee65f5-781f-4b42-88e0-f7bc847a8e33` were reported running with one live
  worker before the reload. Provider PID changed 323402→324262; runtime PID
  231569 and the app were unchanged.
- Outcome: the reloaded provider read the saved run ID. The run was `halted`
  with failure type `workflow_provider_disconnected` ("The extension connection
  that owned the workflow disconnected"); the worker was cancelled. One total
  worker, zero live, one matching run, limits unchanged; 0 nano-AIU accounted at
  observation, 11,379 ms active. `canResume:true` was not exercised.
- Finding: saved-ID rediscovery without duplicate dispatch is supported;
  active execution does not survive an extension reload. Under D-13 this is an
  interrupted attempt. G01 pending.

### E-P01-034: app window close without quit

- Work: P01-T04; requirement: APP-07.
- Authorization: operator directly authorized one run, at most one worker,
  Auto model, a longer bounded no-tools task, `maxAiCredits:1`,
  `timeoutSeconds:180`, an operator window close and reopen while the worker
  was running, read-only observation by saved run ID; no resume or replacement.
- Observation: the operator confirmed closing only the app window (not
  minimize, hide or quit) after the worker was reported running and before it
  completed, then reopening it. App, runtime and provider PIDs and start times
  (230683/231569/331481) were unchanged.
- Outcome: run `99179648-84e2-42e3-8c94-477e4816f3c2` completed attempt 1;
  worker `5ce71895-97eb-4d25-9048-8d51d341743b` completed. One total worker,
  zero live, limits unchanged; 105,424,900 nano-AIU (0.1054249 AI credits),
  29,884 ms active. No cancel, resume or replacement.
- Finding: on this Linux configuration an active worker continued across
  window close and the same run was rediscovered after reopening. The window
  action is operator-confirmed, not an SDK-observed event. G01 pending.

## Future coverage records

Add one record per bounded check using the template; extend the ledger with
requirement/scenario cells as execution begins. Each APP requirement must link
its actual passing/failed/not-run platform/provider results before G07. Do not
prepopulate fictional CI runs, screenshots, approvals or deployment evidence.
