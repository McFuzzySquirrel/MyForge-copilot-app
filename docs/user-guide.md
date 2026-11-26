# MyForge User Guide

## Who This Is For

Use the standalone MyForge launcher and Forge Console to turn project
requirements into an agent-assisted build. The separate Copilot app edition
is [planned](copilot-app/IMPLEMENTATION-PLAN.md), not an implemented plugin.

## Before You Begin

Install Node.js 20.12 or newer, npm, Git and the CLI for your chosen harness.
Use a repository you are authorized to modify and review its existing changes
before starting an automated build. The launcher can create a repository or
bootstrap an existing one.

## Sign In and First Use

Authenticate with the chosen harness or GitHub CLI using their own
instructions when needed; MyForge does not supply their credentials. Build the
launcher using the [README](../README.md#getting-started), then run
`node dist/cli.js` from `scripts/forge-launcher`. For the browser interface,
run `node dist/cli.js console` from the same directory.

## Main Workflows

1. Capture the idea and author `docs/PRD.md` and `docs/features/*.md`.
2. Review the project brief; approval authorizes preparation, not build start.
3. Generate the team and skills and compile the execution manifest.
4. Review the prepared plan and explicitly start the build.
5. Inspect Tasks, Board and Logs. Address failed tasks and human reviews before
   resuming. Use a feature increment for later work.

The [Console user guide](forge-console-user-guide.md) walks through the UI;
the [launcher guide](forge-launcher.md) describes terminal workflows.
[Human review](human-review-guide.md) requires an actual operator; an agent
cannot approve on the operator's behalf.

## Offline and Reconnect Behavior

The Console is local, but live agent and provider operations depend on the
configured harness and network. The engine includes a stub adapter for local
checks; it does not prove a live provider works. If a registered project is
unavailable, use **Reconnect** or add its new location without removing its
recorded history. See the [Console guide](forge-console.md).

## Statuses and Notifications

Build status identifies the next action or blocker. The Console distinguishes
running, blocked, failed and completed projects and exposes task and log
details. Pause, stop, resume and replay have different effects; consult the
[workflow engine guide](workflow-engine.md) before using them.

## Attachments or Other Data

Requirements, research, generated artifacts and execution records are stored in
the target project. Review files and task outputs before sharing them; logs or
artifacts can contain private project information.

## Accessibility and Mobile Use

The Console uses semantic HTML for the Board. Its
[visual tour](forge-console-screenshots.md) includes responsive captures, but
screenshots are not proof of interactive accessibility or mobile support.

## Privacy and Data Handling

The configured agent harness may send prompts and project context to its
provider. Review that provider's policies and permissions. Never put secrets in
requirements, task reports or shared logs.

## Troubleshooting

Check **Logs** and the failed task's diagnostic information first. Reconcile
missing or moved project folders and stale harness roots rather than silently
switching agents. See [Console troubleshooting](forge-console.md) and
[engine recovery](workflow-engine.md).

## Getting Help

Consult the [documentation](../README.md#documentation) or open an issue in
the [repository](https://github.com/McFuzzySquirrel/MyForge-copilot-app/issues).
