# MyForge Administrator Guide

## Responsibilities and Architecture

The operator controls the host, repository, harness credentials and execution
permissions. The launcher and standalone workflow engine operate on target
repositories; the Console is a loopback web UI over their files and processes.
See [architecture](../ARCHITECTURE.md) and the [ADR index](adr/README.md).

## Prerequisites

Install Node.js 20.12+, npm and Git. The launcher manifest declares Node 18+,
but its locked `@clack/prompts` dependency requires 20.12+. Install and
configure the selected harness
CLI; `gh` is needed for workflows that create GitHub repositories. The
`forge-launcher` package manifest identifies version `1.0.0-beta.6`; the
package is not described as published.

## Installation

Follow the [source installation](../README.md#getting-started). Build with
`npm run build` in `scripts/forge-launcher`; `node dist/cli.js console`
starts the Console. Use the printed URL if the browser does not open.

## Configuration

| Setting | Purpose | Default |
| --- | --- | --- |
| `FORGE_HOME` | Console registry and settings directory | Unset; falls back to `$XDG_CONFIG_HOME/myforge`, then `~/.myforge` |
| `FORGE_ENGINE_CONCURRENCY` | Maximum simultaneous engine tasks | `1` |
| `FORGE_ENGINE_TASK_TIMEOUT_MS` | Default per-task timeout | `600000` milliseconds |
| `FORGE_ENGINE_AUTO_COMMIT` | Set to `0` to disable per-task commits | Enabled |

Console `--port` defaults to `4300` and uses another available port if needed;
`--no-open` avoids launching a browser. See the
[launcher](forge-launcher.md), [Console](forge-console.md) and
[engine](workflow-engine.md) guides for complete configuration and precedence.

## Identity, Secrets, and TLS

Harnesses and external providers manage their own credentials. Avoid placing
secrets in repository files or logs. The Console binds to `127.0.0.1`; its
browser token is not user authentication. An `--external-origin` is intended
for an HTTPS reverse proxy with restricted access; do not expose the Console
to the public internet. See [remote access](forge-console.md#remote-access-with-tailscale-serve).

The standalone Copilot engine adapter passes `--yolo` by default, granting
automatic tool permissions. Review this risk and run only on trusted workspaces
with appropriately scoped credentials.

## Storage and Backups

Target repositories hold canonical requirements and runtime files, including
`docs/WORKFLOW-STATE.json`, audit records and `docs/artifacts/`. The Console
registry resides under the configured Forge home. Back up the repository,
runtime state and registry as appropriate, including uncommitted changes;
protect backups and logs as potentially sensitive.

## Health Checks and Monitoring

Inspect the printed Console URL, Build status, Tasks and Logs. Use the engine's
`status` command and inspect validation results and audit records rather than
assuming an agent response is a successful task.

## Upgrades and Rollback

Review the [change history](updates.md), back up project files and test an
upgrade on a disposable copy. Rebuild the launcher from the chosen source
revision. Restore from your backup if needed; no automated migration or rollback
guarantee is claimed here.

## Troubleshooting

Check Node, Git, the selected harness and their authentication first. For a
stale harness root, update the selection and recompile rather than mixing
agent roots. With npm `11.19.1`, launcher tests exposed failures where
project-scoped installs reject `--allow-scripts`; see the
[draft release notes](releases/v3.131.md#known-limitations). Use the
[testing guide](testing-guide.md) for development checks.

## Security and Privacy Checklist

- Review generated commands and task contracts before execution.
- Keep the working tree and credentials under appropriate access controls.
- Restrict local and reverse-proxy access; do not treat the Console token as
  authentication.
- Redact prompts, logs and paths before sharing diagnostics.

## Recovery and Support

Pause or stop safely, preserve state and logs, and consult the
[engine guide](workflow-engine.md) before resuming or replaying. Report issues
without attaching credentials or proprietary project content.
