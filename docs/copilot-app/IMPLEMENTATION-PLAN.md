# MyForge Copilot App: implementation plan

**Status:** planning baseline; no app-edition implementation has started.

This separately maintained edition aims to deliver MyForge's requirements-first,
specialist-agent, contract-driven workflow inside the GitHub Copilot app. The
Copilot app owns agent execution; MyForge supplies deterministic planning,
verification, orchestration and a canvas. App-managed extension code is allowed.
A separate long-running MyForge engine sidecar is not.

This document owns the proposed app-edition requirement IDs, scope, phase graph,
acceptance matrix and unresolved decisions. Phase documents own work-item
checklists and exit gates. [Execution evidence](evidence/README.md) owns the
evidence protocol and status ledger. These planning documents are **not** an
executable Forge manifest or a replacement for the copied product's canonical
`docs/PRD.md` plus `docs/features/*.md`. Phase 02 produces a reviewed app-edition
requirements contract before implementation begins.

## Approved planning decisions

| ID | Decision | Basis |
| --- | --- | --- |
| D-01 | Fresh source snapshot, not imported upstream Git history | User chose a fresh baseline |
| D-02 | Publish baseline and this plan directly to `main` | User authorized commit and push |
| D-03 | Separate app edition with an explicit upstream-sync process | User-selected maintenance model |
| D-04 | Full engine behavior parity on Copilot runtime, if feasible | Prior scope clarification |
| D-05 | App-managed extensions allowed; no separate engine sidecar | Prior execution-boundary clarification |
| D-06 | Preserve the original repository and copied standalone paths | App edition must not change upstream or silently replace existing harnesses |
| D-07 | Pause/resume may ship first; continuation after app closure is gated | User-selected initial-release boundary |
| D-08 | Initial supported platforms: Windows, macOS and Linux | User-selected platform scope |
| D-08-L | Linux-only initial qualification; Windows/macOS qualification deferred until hosts are available | Operator scope decision on 2026-11-26 |
| D-09 | Planning only now; do not implement or start sub-agents | Current request |

No release date, model list, numeric concurrency limit, budget cap, SDK version,
distribution channel or remote execution topology has been approved.

## Source baseline and boundaries

- Source: `McFuzzySquirrel/mcfuzzy-agent-forge`.
- Source commit: `0994c0a644975b771aa813a1223f8d0ac958f867` (README v3.129).
- Import commit: `00fe362fbdaaf0c2c45a54315a95c684d1ce1d9b`.
- Import method: export all 608 Git-tracked files with `git archive`; no working
  tree extras, credentials, `node_modules`, build products or upstream `.git`.
- Destination: `McFuzzySquirrel/MyForge-copilot-app`, default branch `main`.
- Existing root `plan.md`, ADRs, changelog and standalone documentation are
  inherited historical/product material. They do not assert that an app edition
  exists. New app planning lives here; preserve history.
- A documentation-only release note identifies this planning addition, not an
  app implementation or plugin release.

### Code-grounded starting points

All links below are relative to the copied baseline. Re-check symbols when
implementation begins; trace implementation commits in evidence rather than
relying on stale line numbers.

| Source ID | Source and verified boundary | Primary consumers |
| --- | --- | --- |
| S-01 | [Architecture](../../ARCHITECTURE.md): launcher, compiler, engine and Console are separate layers | P00, P02 |
| S-02 | [Compiler](../../templates/skills/forge-execution-adapter/scripts/compiler.ts): `compileExecutionManifest`, `validateManifestSafety`, team matrix | P02, P05 |
| S-03 | [Adapter types](../../templates/skills/forge-workflow-engine/scripts/types.ts): `HarnessAdapter`, `TaskAttemptRequest`, `TaskResult`, `WorkflowState`, phase/task sessions | P01-P04 |
| S-04 | [Engine](../../templates/skills/forge-workflow-engine/scripts/engine.ts): `nextReadyTasks`, `ownerUniqueReady`, `createSerialQueue`, `runEngine`, `replayTask` | P02-P04, P07 |
| S-05 | [State](../../templates/skills/forge-workflow-engine/scripts/state.ts): flushed temporary write and rename, stable-ID reconciliation, single-writer task records | P02, P04 |
| S-06 | [Verification](../../templates/skills/forge-workflow-engine/scripts/verify.ts) and [result parsing](../../templates/skills/forge-workflow-engine/scripts/task-result.ts): output, handoff, validation and attribution | P03, P07 |
| S-07 | [Copilot CLI adapter](../../templates/skills/forge-workflow-engine/scripts/harness/copilot-adapter.ts): launches `copilot -p`, defaults to `--yolo`; not an app-native transport | P01, P03 |
| S-08 | [Sandbox](../../templates/skills/forge-workflow-engine/scripts/sandbox.ts) and [commit queue](../../templates/skills/forge-workflow-engine/scripts/commit.ts): task worktrees and integrated per-task commits | P03, P04, P07 |
| S-09 | [Task context](../../templates/skills/forge-workflow-engine/scripts/task-context.ts) and [contract guide](../task-contracts.md): content-bound human review, reference limits, structured reports | P04-P07 |
| S-10 | [Task requests](../../templates/skills/forge-workflow-engine/scripts/request.ts), [execution files](../../templates/skills/forge-workflow-engine/scripts/task-execution.ts), [artifacts](../../templates/skills/forge-workflow-engine/scripts/artifacts.ts): on-demand context and result evidence | P03-P07 |
| S-11 | [Console](../forge-console.md), [server](../../scripts/forge-launcher/scripts/console/server.ts), [authoring](../../scripts/forge-launcher/scripts/console/authoring.ts), [control](../../scripts/forge-launcher/scripts/console/control.ts): projection and process supervision | P05, P06 |
| S-12 | [Documentation map](../documentation-map.md), [testing guide](../testing-guide.md), [CI](../../.github/workflows/validation.yml) | Every phase |
| S-13 | [Workflow engine guide](../workflow-engine.md), [deep dive](../workflow-engine-deep-dive.md), [engine skill](../../templates/skills/forge-workflow-engine/SKILL.md) | Parity inventory and all runtime phases |

## Requirements and measurable acceptance

Requirement coverage is conjunctive: a phase passing does not automatically
prove every requirement it touches. Evidence must name the scenario and exact
requirement. P01 determines whether this architecture is supportable.

| ID | Requirement / acceptance criterion | Owning phase | Decisive scenarios |
| --- | --- | --- | --- |
| APP-01 | All agent work uses supported app-managed execution; no detached MyForge scheduler or hidden CLI fallback | P03 | V01, V02 |
| APP-02 | Interactive PRD/features authoring and explicit operator review precede preparation and deliberate build start | P05 | V10 |
| APP-03 | Compiler retains explicit specialist ownership, canonical requirement references and stable task IDs; invalid graphs/contracts block | P02, P05 | V03, V10 |
| APP-04 | Task dependencies, one ready task per owner and strict phase gates retain baseline semantics; failed prerequisite never dispatches dependents | P03 | V04 |
| APP-05 | Completion requires applicable output, structured report and declared validation gates; no-op, missing output, unresolved work or failing commands do not complete | P03 | V05 |
| APP-06 | Retry classification, attempt diagnostics, timeouts and cancellation remain explicit; cancelled or indeterminate work is never successful | P03, P04 | V06, V07 |
| APP-07 | Persisted ownership, in-flight reconciliation and safe pause/resume survive app/session/plugin interruption without double dispatch | P04 | V07, V08 |
| APP-08 | Concurrent work is isolated and attributed to the correct task; integration and per-task commit semantics preserve unrelated user work | P03, P04 | V09 |
| APP-09 | Human approval is content-bound, invalidated by relevant edits and only issued by a real operator; Autopilot cannot approve itself | P04, P05 | V11 |
| APP-10 | Task/phase session scopes, manual selections plus prerequisites, resume and replay retain supported baseline behavior | P03, P04 | V12 |
| APP-11 | Canvas is a projection of authoritative state and provides truthful controls, blockers, attempt evidence and accessible review | P06 | V13, V14 |
| APP-12 | Skills, agents and plugin load in supported app versions without overwriting project files; entry points are reachable | P05, P06 | V02, V10 |
| APP-13 | App-selected Copilot, BYOK and local-provider routes propagate to intended task sessions; missing support fails visibly, never silently reroutes | P03, P07 | V15 |
| APP-14 | All initial-release mandatory scenarios pass on Linux; Windows/macOS remain explicitly deferred and block unsupported cross-platform claims | P07 | V16 |
| APP-15 | Original repository remains untouched; copied standalone tooling retains regression behavior and upstream changes have provenance | P00, P02, P08 | V17, V18 |
| APP-16 | Import/migration is explicit, recoverable and preserves requirements, task identities, evidence and user work; uninstall does not delete project content | P04, P08 | V18 |
| APP-17 | Run/task/attempt, model/provider and verified gate outcomes remain inspectable; absent usage is unavailable, not fabricated zero or USD credits | P03, P06 | V06, V13, V15 |
| APP-18 | Continue-after-close is separately enabled only after supported host lifecycle and end-to-end recovery are proven; unsupported mode stays unavailable | P09 | V19, V20 |
| APP-19 | Requirement/phase/work-item/scenario/evidence/commit links are complete; failed, skipped and not-run checks cannot pass a gate | P00, P07, P08 | All scenarios |
| APP-20 | Requirements, artifact data and UI actions cannot bypass path, permission, trust, review or executable-command boundaries | P03-P07 | V11, V14 |

APP-18 is not an initial-release blocker. All other requirements are mandatory
subject to the explicit P01 feasibility decision; a missing capability must
trigger scope review, not an undocumented downgrade.

## Phase dependency graph

```text
P00 -> P01 -> P02 -> P03 -> P04 --+--> P05 --+
                                 +--> P06 --+--> P07 -> P08 -> P09 (optional)
```

P05 and P06 can execute independently after P04 freezes their shared interfaces.
P07 requires both. P09 depends on an accepted initial release and a **new**
continuation feasibility gate. Investigation does not authorize implementation.

| Phase | Document | Prerequisites | Exit gate / downstream release |
| --- | --- | --- | --- |
| P00 | [Baseline and traceability](phases/00-baseline-and-traceability.md) | None | G00: provenance and evidence protocol reviewed |
| P01 | [App feasibility](phases/01-app-feasibility.md) | G00 | G01: supported dispatch/lifecycle/platform capability proven or stop |
| P02 | [Requirements and reusable core](phases/02-contracts-and-core.md) | G01 | G02: approved contract and tested adapter boundaries |
| P03 | [App-native execution](phases/03-native-execution.md) | G02 | G03: transport and behavioral engine parity |
| P04 | [Recovery and safety](phases/04-recovery-and-safety.md) | G03 | G04: durable single owner, pause/resume and human gate |
| P05 | [Authoring and packaging](phases/05-authoring-and-packaging.md) | G04 | G05: reachable reviewed authoring and installable bundle |
| P06 | [Canvas and control](phases/06-canvas-and-control.md) | G04 | G06: projection, controls and accessible evidence |
| P07 | [Parity qualification](phases/07-parity-qualification.md) | G05, G06 | G07: cross-platform/provider end-to-end qualification |
| P08 | [Migration and rollout](phases/08-migration-and-rollout.md) | G07 | G08: reviewed rollout, rollback and upstream maintenance |
| P09 | [Continuation after close](phases/09-continuation-after-close.md) | G08 + continuation feasibility | G09: optional continuation independently qualified |

## Validation catalog

Each scenario requires a command/procedure, expected and actual result,
implementation commit, environment, evidence ID and reviewer. Extend existing
tests first. Do not invent future package paths or commands before P02 decides
the layout. Stub/mock validation is necessary but never proves app integration.

| ID | Required behavior to exercise |
| --- | --- |
| V01 | Process/session inspection shows app-managed dispatch only; no engine sidecar, hidden `copilot -p` or unauthorized runtime |
| V02 | Install/load/trust/version failure, native owner selection, session IDs and lifecycle callbacks in an actual desktop app |
| V03 | Valid canonical feature graph; missing IDs/owners, cycles, traversal/symlinks, oversized references and invalid contracts fail |
| V04 | Independent tasks, owner conflicts, strict prerequisite phases, optional task semantics and failed phase validation |
| V05 | Missing outputs, no-op, invalid/missing report, unresolved acceptance work, failing commands and legitimate completion |
| V06 | Retryable versus terminal failures; timeout and cancellation; immutable attempt archives and honest gate/usage outcomes |
| V07 | Close/quit/restart during dispatch, verification and integration; kill only owned test processes; reconcile indeterminate work without duplication |
| V08 | Duplicate canvas/extension/session instances, plugin reload/update, stale owner, corrupt or partially written state |
| V09 | Parallel isolated edits, same-file conflicts, clean-tree preflight, commit failure and unrelated dirty/staged user files |
| V10 | Idea -> PRD/features -> real review -> team/skills -> compile -> deliberate start -> bounded implementation |
| V11 | Human task blocks unattended execution; agent/API cannot create approval; relevant edit invalidates evidence; operator journey succeeds |
| V12 | Manual single/range/list with transitive dependencies; phase/task session scope; invalid combinations, replay and manifest reconciliation |
| V13 | Canvas state agrees with persisted outcomes; logs, blockers, caveats, costs, credits and attempt links are truthful |
| V14 | Keyboard/screen-reader/reduced-motion checks; stale UI actions, origin/path permissions, untrusted artifact text and missing host access |
| V15 | Configured Copilot/BYOK/local route actually used by each task; missing model/auth/rate limit fails visibly; no credentials in evidence |
| V16 | Mandatory supported Linux scenarios, including file paths, shutdown, native tooling and extension install; Windows/macOS scenarios are deferred until dedicated hosts exist |
| V17 | Adapter/engine/launcher regression suites preserve copied standalone behavior; original upstream repository untouched |
| V18 | Fresh repo, completed project, incremental feature, interrupted import, incompatible state and rollback/uninstall without content loss |
| V19 | Close app with continuation enabled; host continues scheduling and verification; reopen and reconcile identity/evidence with no sidecar |
| V20 | Unsupported local/cloud/provider combination rejected; continuation interruption, permissions/review, reconnect and return to pause mode |

### Existing executable checks

From each package directory, use its actual scripts. Install dependencies only
when missing or after manifest changes; never commit `node_modules` or `dist`.

| Package | Commands | Focused starting points |
| --- | --- | --- |
| `templates/skills/forge-execution-adapter` | `npm run typecheck`; `npm test` | `adapter.test.ts`, `task-contract.test.ts`, `requirement-sources.test.ts`, `prd-validation.test.ts` |
| `templates/skills/forge-workflow-engine` | `npm run typecheck`; `npm test` | `engine.test.ts`, `verify.test.ts`, `request.test.ts`, `task-result.test.ts`, `task-execution.test.ts`, `task-context.test.ts`, `sandbox.test.ts`, `commit.test.ts`, `control.test.ts`, `artifacts.test.ts` |
| `scripts/forge-launcher` | `npm run typecheck`; `npm test`; `npm run check:version` | `bootstrap.test.ts`, `console-authoring.test.ts`, `console-control-lifecycle.test.ts`, `console-board.test.ts`, `console-usage.test.ts`, `resume.test.ts` |

For engine/adapter focused checks, the existing pattern is
`node --import tsx --test scripts/<existing-test>.test.ts`. Check selected
filenames and package scripts before running. Adapter dependencies are needed
for engine typechecking. Broader phase validation follows focused task checks.
Future app checks must run through the actual composition root and desktop app,
not merely call internal functions.

## Risks and unresolved decisions

| ID | Risk / unknown | Owner and blocking point | Required response |
| --- | --- | --- | --- |
| R01 | Agent-only built-in tools may not be callable by extensions; SDK sessions may be external, not app-owned | P01 / G01 | Demonstrate supported ownership/dispatch; stop parity work if absent |
| R02 | Extension shutdown, reload and experimental API changes may invalidate durability assumptions | P01, P04 / G01, G04 | Pin tested versions, inspect lifecycle and reconcile durable attempts |
| R03 | Local scheduler cannot continue when its host is gone; cloud may not load extensions or local providers | P09 / G09 | No continuation claim or setting until verified; no hidden cloud migration |
| R04 | App worktrees/session ownership may conflict with engine sandboxes and single-writer integration | P03, P04 / G03, G04 | One documented isolation owner, conflict tests and serialized integration |
| R05 | Automatic tool permission is not human approval; inherited CLI `--yolo` is unsuitable as app policy | P03, P05 / G03, G05 | Retain app permission authority and enforce human-only attestation |
| R06 | Reported success/usage may not supply reliable output or terminal status | P03 / G03 | Independent verification; indeterminate outcome blocks |
| R07 | Public evidence can leak credentials, prompts, private paths or proprietary project content | All phases | Keep raw diagnostics private; redact public records, digest and limit access |
| R08 | State migration or upstream sync can invalidate completed work or overwrite edits | P04, P08 / G04, G08 | Backups, explicit compatibility, stable IDs and reviewed sync provenance |
| R09 | Accessible bidirectional canvas actions and stale views may drift from engine truth | P06 / G06 | Revision-aware controls, accessibility checks and server-side authority |
| R10 | Cross-platform app/SDK/tool support may differ | P01, P07 / G01, G07 | Platform capability matrix; no all-platform release without passing evidence |

Open decisions must be resolved with the operator before the dependent work:

- **Q01 / P01:** exact supported app/CLI/SDK versions and public API for native
  dispatch, observation, cancellation, session scope and extension lifecycle.
- **Q02 / P01-P02:** supported extension execution environment, workspace
  resolution, sandbox/trust and state-storage locations.
- **Q03 / P02:** final package layout, sharing boundaries and versioned
  manifest/state migration strategy, based on the capability result.
- **Q04 / P03:** supported provider/model matrix, concurrency and usage/budget
  controls. Preserve existing engine options where meaningful; do not invent
  caps or bypass app policy.
- **Q05 / P07:** minimum Linux OS/app versions and real test hosts, model
  endpoints and operator access. Windows/macOS are deferred until dedicated hosts
  and operator access are available.
- **Q06 / P08:** distribution channel, plugin naming/versioning and upstream
  sync cadence; choose with the maintainer before publishing a plugin.
- **Q07 / P08:** diagnostic retention/access policy and release approvers; do
  not publish raw execution diagnostics to this public repository.
- **Q08 / P09:** what "close" means (window close/tray, app quit, host shutdown),
  permissible cloud/remote hosts and provider restrictions. User approval is
  required for execution/data movement; a toggle cannot silently change hosts.

## Working and evidence rules

1. Future work items use phase-prefixed stable IDs such as `P03-T02`; checklists
   are not marked done without linked evidence and passing dependency gates.
2. Record expected outputs, declared checks, acceptance IDs and owning
   specialist before dispatching a bounded task. Convert approved work into
   canonical Forge tasks in P02; do not hand-edit generated runtime artifacts.
3. Proposed sub-agent opportunities are **not** running assignments. Each phase
   specifies scopes and integration boundaries. A coordinator must verify
   prerequisite gates, delegate only independent bounded work, and integrate
   through one reviewer/single writer. Agents never approve human gates.
4. Record failed attempts and skipped checks as well as passes. A blocked host
   check is `not-run`/blocked, never "passed via mock".
5. Follow [evidence rules](evidence/README.md) and update the phase ledger.
   Requirement coverage and gate acceptance are separate records.
6. Significant approved architecture changes require a new unused ADR number;
   do not rewrite inherited ADRs. Update affected skills/guides and changelog
   in the same implementation change.

## External capability references

Read during planning; these are capability leads, not test results or stable API
guarantees. Capture exact version/permalink/access date in P01 evidence.

- [App overview](https://docs.github.com/en/copilot/concepts/copilot-surfaces/github-copilot-app)
- [Canvas extensions](https://docs.github.com/en/copilot/how-tos/github-copilot-app/working-with-canvas-extensions)
- [App sessions](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions)
- [App model providers](https://docs.github.com/en/copilot/how-tos/github-copilot-app/add-llm-models)
- [Automations](https://docs.github.com/en/copilot/how-tos/github-copilot-app/using-automations)
- [Extension SDK documentation](https://github.com/microsoft/copilot-sdk/blob/main/nodejs/docs/extensions.md)
- [Extension entry API](https://github.com/microsoft/copilot-sdk/blob/main/nodejs/src/extension.ts)
- [Canvas API](https://github.com/microsoft/copilot-sdk/blob/main/nodejs/src/canvas.ts)

Current planning environment has Copilot CLI 1.0.112 but no verified active
desktop app. CLI documentation and mock tests cannot pass G01.
