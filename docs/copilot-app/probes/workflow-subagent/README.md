# App-managed subagent probe

This is an opt-in feasibility probe, not the MyForge application. It registers
one experimental dynamic workflow and two tools. Loading the extension does not
start a worker. A start admits at most one subagent, which is instructed not to
use tools or inspect files and to return a fixed marker. It may incur usage.

The `confirmed` parameter is a reminder, **not proof of human consent**. The
agent must invoke `myforge_probe_start` only after the operator explicitly
authorizes that invocation. Do not start it automatically or retry blindly.

## Run in a disposable project

1. In a disposable project opened in the Copilot app, copy `extension.mjs` and
   `probe.mjs` into a new `.github/extensions/myforge-capability-probe/`
   directory. Do not overwrite an existing extension. Review both files and
   approve the app's extension trust prompt before loading them. The SDK is
   supplied by a compatible Copilot runtime; no npm install is required.
2. Reload extensions using the app's supported extension controls and confirm
   the probe loaded. Record app, bundled runtime and SDK versions if available.
   If registration or trust fails, record the error and stop.
3. After the operator explicitly authorizes one billable probe, call
   `myforge_probe_start` with `confirmed: true`. Record the returned run ID
   privately. Admission is not completion. An unsupported or disabled API is a
   blocked result, not a reason to use a separate CLI.
4. Call `myforge_probe_status` with that ID until it reaches a terminal state.
   A completed result with `markerMatched: true` demonstrates only the
   observed workflow-owned subagent response. Record failures and limitations.
   Never paste run IDs, logs or credentials into public evidence.
5. Remove only the two copied probe files from the disposable project after
   the run has settled, and reload extensions. Do not delete the directory if
   it contains other files.

The probe does **not** prove canvas action wiring, separate app sessions,
specialist identity, workspace isolation, cancellation, crash recovery or
exactly-once execution. Exercise those separately before claiming support.
`node --test docs/copilot-app/probes/workflow-subagent/probe.test.mjs` verifies
local handler logic only; it does not test the actual Copilot app or SDK.
