# Architecture Decision Records

These inherited records are historical; preserve them rather than rewriting their decisions.
Status and date are transcribed where recorded; an empty field is marked
“Not recorded.” ADR-028 appears twice because of an existing numbering collision.

| ADR | Title | Status | Date |
| --- | --- | --- | --- |
| [ADR-001](001-agent-skill-separation-and-progress-reporting.md) | Agent/Skill Separation and Specialist Progress Reporting | Accepted | 2026-03-25 |
| [ADR-002](002-prd-decomposition-into-features.md) | PRD Decomposition into Features | Accepted | 2026-04-09 |
| [ADR-003](003-per-agent-model-assignment.md) | Per-Agent Model Assignment via `forge-assign-models` | Accepted | 2026-04-24 |
| [ADR-004](004-bootstrap-project-meta-skill.md) | Bootstrap Meta-Skill via `forge-bootstrap-project` | Accepted | 2026-05-18 |
| [ADR-005](005-agent-framework-solution-scaffold.md) | Agent Framework Solution Scaffold via `forge-build-agent-framework-solution` | Superseded by [ADR-008](008-skill-forge-integration.md) | 2026-05-18 |
| [ADR-006](006-agents-directory-migration.md) | Migrate from `.github/` to `.agents/` Directory | Accepted | 2026-06-17 |
| [ADR-007](007-skill-best-practices-adoption.md) | Adopt agentskills.io Best Practices for Skill Design | Accepted | 2026-06-17 |
| [ADR-008](008-skill-forge-integration.md) | Integrate Skill-Forge and Remove Microsoft Agent Framework Skill | Accepted | 2026-08-03 |
| [ADR-009](009-full-auto-build-meta-skill.md) | Full Auto Build Meta-Skill via `forge-auto-build` | Accepted | 2026-08-03 |
| [ADR-010](010-forge-launcher.md) | Forge Launcher -Interactive CLI for the Full MyForge Lifecycle | Superseded (implementation layer) by [ADR-023](023-forge-launcher-npm-package.md) | 2026-08-05 |
| [ADR-011](011-forge-execution-adapter.md) | Forge Execution Adapter -Contract-Driven Bridge from MyForge to External Runners | Accepted | 2026-08-06 |
| [ADR-012](012-launcher-terminal-handoff-and-prd-guidance.md) | Launcher terminal handoff and PRD-first guidance | Accepted | 2026-08-06 |
| [ADR-013](013-auto-build-input-auto-detection.md) | Auto-detect input source in forge-auto-build Step 0 | Accepted | 2026-08-06 |
| [ADR-014](014-dynamic-workflow-orchestration.md) | Dynamic Workflow Orchestration via `forge-workflow-engine` | Accepted | 2026-08-11 |
| [ADR-015](015-opencode-harness-bootstrap-path.md) | OpenCode Harness Bootstrap Path (`.opencode/agents`) | Accepted | 2026-08-11 |
| [ADR-016](016-forge-workforce-compiler-and-kernel-handoff.md) | Forge Workforce Compiler and Optional FlowForge Kernel Handoff | Superseded by [ADR-038](038-flowforge-retirement.md) | 2026-08-13 |
| [ADR-017](017-artifact-store-and-context-projection.md) | Artifact Store and Context Projection Pattern | Accepted | 2026-08-18 |
| [ADR-018](018-auto-prd-decomposition-and-build-prerequisite.md) | Automatic PRD Decomposition and PRD-Prerequisite Build Execution | Accepted | 2026-08-24 |
| [ADR-019](019-authoring-execution-split-and-copilot-harness.md) | Authoring/Execution Split, Detached Engine, and GitHub Copilot Harness | Accepted | 2026-08-24 |
| [ADR-020](020-launcher-auto-draft-and-path-input.md) | Launcher auto-draft flow and path input handling | Accepted | 2026-08-24 |
| [ADR-021](021-parallel-task-dispatch.md) | Parallel Task Dispatch in the Workflow Engine | Accepted | 2026-08-25 |
| [ADR-022](022-task-granularity-and-configurable-timeout.md) | Finer-Grained Tasks and a Configurable Task Timeout | Accepted | 2026-08-26 |
| [ADR-023](023-forge-launcher-npm-package.md) | Forge Launcher as a Node npm Package | Accepted | 2026-08-26 |
| [ADR-024](024-feature-based-compilation-and-responsibility-matrix.md) | Feature-Based Compilation, Team Validation, and the Responsibility Matrix | Accepted | 2026-08-26 |
| [ADR-025](025-squirrel-forge-live-workflow-viz.md) | The Squirrel Forge - a Live Workflow-Engine Visualization | Accepted | 2026-08-27 |
| [ADR-026](026-forge-board-kanban-dashboard.md) | The Forge Board - Kanban Dashboard for the Workflow Engine | Accepted | 2026-08-27 |
| [ADR-027](027-workflow-engine-keep-alive-attach.md) | Keep-Alive Attach Mode for the Workflow Engine | Superseded by [ADR-058](058-opencode-v2-project-resolution.md) | 2026-08-27 |
| [ADR-028](028-launcher-entry-resume-and-auto-build-demotion.md) | Launcher as the Single Entry Point - `resume`, Review Links, and `forge-auto-build` Demotion | Accepted | 2026-08-27 |
| [ADR-028](028-native-agent-selection-opencode-harness.md) | Native Agent Selection in the OpenCode Harness | Accepted | 2026-08-27 |
| [ADR-029](029-output-verification-gate.md) | Output Verification Gate for the Workflow Engine | Accepted | 2026-08-28 |
| [ADR-030](030-copilot-native-agent-selection.md) | Copilot Harness Native Agent Selection via `/agent` | Accepted | 2026-08-28 |
| [ADR-031](031-adaptive-keep-alive-and-budget-hints.md) | Adaptive Keep-Alive Default + Timeout/Retry Surfacing | Superseded by [ADR-058](058-opencode-v2-project-resolution.md) (keep-alive half only; the timeout/retry surfacing half stands) | 2026-08-28 |
| [ADR-032](032-engine-stop-and-config-persistence.md) | Engine Pause/Stop Control Channel + Launcher Config Persistence | Accepted | 2026-08-28 |
| [ADR-033](033-brand-rename-to-myforge.md) | Brand Rename from "Agent Forge" to "MyForge" | Accepted | 2026-08-29 |
| [ADR-034](034-forge-console-web-ui.md) | Forge Console - a Local Web UI over the Launcher and Workflow Engine | Accepted | 2026-08-29 |
| [ADR-035](035-auto-commit-after-task.md) | Auto-Commit After Each Completed Task | Accepted | 2026-08-31 |
| [ADR-036](036-in-console-user-guide.md) | In-Console User Guide | Accepted | 2026-10-01 |
| [ADR-037](037-existing-repository-incremental-authoring.md) | Existing-repository incremental authoring | Accepted | Not recorded |
| [ADR-038](038-flowforge-retirement.md) | Retire FlowForge workforce integration | Accepted | 2026-09-05 |
| [ADR-039](039-independent-authoring-models-and-stages.md) | Independent authoring models and staged project authoring | Accepted | 2026-09-05 |
| [ADR-040](040-native-adapter-contracts.md) | Native adapter request and lifecycle contracts | Accepted | 2026-09-05 |
| [ADR-041](041-authoring-quality-and-console-correctness.md) | Authoring quality and Console correctness | Accepted | 2026-09-05 |
| [ADR-042](042-claude-code-execution-harness.md) | Claude Code execution harness adapter | Accepted | 2026-09-07 |
| [ADR-043](043-claude-code-authoring-runner.md) | Claude Code authoring runner | Accepted | 2026-09-07 |
| [ADR-044](044-structured-task-contracts.md) | Structured Task Execution and Completion Contracts | Accepted | Not recorded |
| [ADR-045](045-prd-readiness-and-task-sizing.md) | Canonical Feature Authoring, Readiness and Task Sizing | Accepted | Not recorded |
| [ADR-046](046-task-execution-files.md) | File-Based Execution and Generated-Artifact Lifecycle | Accepted | Not recorded |
| [ADR-047](047-task-completion-diagnostics.md) | Attempt Diagnostics and Retry Feedback | Accepted | Not recorded |
| [ADR-048](048-explicit-authoring-runner.md) | Explicit authoring runner selection | Accepted | 2026-09-07 |
| [ADR-049](049-human-review-evidence-and-console-completion.md) | Human Review Evidence and Console Completion | Accepted | Not recorded |
| [ADR-050](050-prd-path-normalization-to-prd.md) | Normalize requirements ownership to docs/PRD.md | Accepted | Not recorded |
| [ADR-051](051-interactive-authoring-from-console.md) | Interactive authoring sessions from the Forge Console | Accepted | Not recorded |
| [ADR-052](052-harness-invocation-activity-logging.md) | Harness CLI invocation and activity logging | Accepted | Not recorded |
| [ADR-053](053-reachability-and-validation-gaps.md) | Reachability, Live Integration, and Validation-Gap Visibility | Accepted | Not recorded |
| [ADR-054](054-reuse-candidates-are-not-authored-outputs.md) | `reuse` Candidates Are Not Authored Outputs | Accepted | Not recorded |
| [ADR-055](055-console-project-removal.md) | Repository-preserving Console project removal | Accepted | September 2026 |
| [ADR-056](056-parallel-execution-task-sandboxes.md) | Parallel Task Execution via Per-Task Worktree Sandboxes | Accepted | 2026-09-29 |
| [ADR-057](057-human-review-waits-rather-than-pauses-the-run.md) | An unapproved human review waits for the run, it does not stop it | accepted | 2026-09-29 |
| [ADR-058](058-opencode-v2-project-resolution.md) | OpenCode v2 Only — Project Resolution via `cwd`, Keep-Alive Retired | Accepted | 2026-09-30 |
| [ADR-059](059-pwd-aligned-spawn-environment.md) | Spawn Children With `PWD` Aligned to `cwd` | Accepted | 2026-09-30 |
| [ADR-060](060-interactive-requirements-authoring.md) | Requirements authoring is always interactive | Accepted | Not recorded |
| [ADR-061](061-agent-mode-all.md) | Generated agents declare `mode: all` | Accepted | Not recorded |
| [ADR-062](062-console-rederivation-chain.md) | Re-derive the team and project skills as one chain | Accepted | Not recorded |
| [ADR-063](063-forge-board-chrome-and-accessibility.md) | Forge Board chrome, states, and accessibility | Accepted | Not recorded |
| [ADR-064](064-forge-board-gantt-mode.md) | Dependency Gantt mode on the Forge Board | Accepted | Not recorded |
| [ADR-065](065-opencode-mini-interactive-authoring.md) | OpenCode interactive authoring runs in `opencode mini` | Accepted | Not recorded |
| [ADR-066](066-agent-skill-associations.md) | Explicit Agent-to-Skill Associations | Accepted | Not recorded |
| [ADR-067](067-phase-scoped-session-reuse.md) | Phase-Scoped Session Reuse | Accepted | Not recorded |
| [ADR-068](068-console-browser-terminal.md) | Interactive harness sessions in the Forge Console | Accepted | 2026-10-25 |
| [ADR-069](069-skill-consolidation-and-namespacing.md) | Consolidate and namespace the Forge skill set | Accepted | 2026-10-26 |
| [ADR-070](070-windows-harness-resolution-and-background-sessions.md) | Windows harness resolution and background terminal sessions | Accepted | 2026-10-26 |
| [ADR-071](071-system-level-console-defaults.md) | System-level console defaults | Accepted | 2026-10-26 |
| [ADR-072](072-console-navigation-and-settings-view.md) | Console navigation and Settings view | Accepted | 2026-10-26 |
| [ADR-073](073-background-job-notifications.md) | Background-job notifications in the Console | Accepted | 2026-10-26 |
| [ADR-074](074-token-and-cost-usage-capture.md) | Token and cost usage capture | Accepted | 2026-10-26 |
| [ADR-075](075-top-navigation-and-fluid-layout.md) | Top category navigation and fluid layout | Accepted | 2026-10-27 |
| [ADR-076](076-console-theme-preference.md) | Console theme preference and light palette | Accepted | October 2026 |
| [ADR-077](077-strict-phase-completion-gates.md) | Strict phase completion gates | Accepted | October 2026 |
| [ADR-078](078-task-and-phase-testing-strategy.md) | Task and phase testing strategy | Accepted | October 2026 |
| [ADR-079](079-retire-forge-into-support-team.md) | Retire Forge scaffolding into a repository-derived support team | Accepted | October 2026 |
| [ADR-080](080-semantic-console-board.md) | Semantic HTML baseline for the Console Board | Accepted | 2026-11-04 |
| [ADR-081](081-adaptive-project-lifecycle-and-start-build-gates.md) | Adaptive Project lifecycle and explicit Build-start gates | Accepted | 2026-11-04 |
| [ADR-082](082-canvas-led-orchestration.md) | Canvas-led app orchestration | Accepted direction | 2026-11-27 |

## Scope

These records reflect the inherited standalone product and may describe later
superseded behavior. The [Copilot app plan](../copilot-app/IMPLEMENTATION-PLAN.md)
does not claim that its proposed architecture has been implemented.
