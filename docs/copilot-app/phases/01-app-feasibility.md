# P01: prove app-managed feasibility

[Main plan](../IMPLEMENTATION-PLAN.md) | [Previous](00-baseline-and-traceability.md) | [Next](02-contracts-and-core.md)

**Prerequisite:** G00. **Exit:** G01. **Status:** partial Linux investigation;
G00 and cross-platform qualification remain pending. **Requirements:** APP-01, APP-07, APP-12,
APP-13, APP-14; evaluate APP-18 separately, do not require it for G01.
**Sources:** S-03, S-07, S-13 and the main plan's external API references.

## Deliverables and work checklist

- [ ] **P01-T01:** Record supported app, CLI and extension SDK versions and
  exact public API references; compare baseline `HarnessAdapter` requirements
  with extension-callable APIs. Distinguish built-in agent tools, external SDK
  clients and actual app-owned sessions. Partial evidence: E-P01-001.
- [ ] **P01-T02:** On trusted disposable repositories in Windows/macOS/Linux,
  install the smallest probe extension/canvas. Capture the actual composition
  root, workspace identity, trust prompts, permissions and extension ownership.
  This future probe must be reviewable and removable; no production behavior.
- [ ] **P01-T03:** Demonstrate create/dispatch, observe, identify terminal state,
  cancel and resume for native app sessions, including specialist/model choice.
  Capture requested versus actual route and correlation IDs. No independent
  CLI child, detached engine or private undocumented API counts as proof.
- [ ] **P01-T04:** Exercise app quit/restart, window close, canvas close, plugin
  reload and duplicate instances. Establish host ownership and reachable durable
  state; prove safe reconciliation or identify the exact missing capability.
- [ ] **P01-T05:** Publish a capability matrix by platform/version/provider:
  supported, unsupported, experimental, or not tested. Resolve Q01/Q02 and
  document candidate approaches and a human go/no-go decision.

Outputs: capability report, probe source/procedure, redacted observations and
explicit decision. Exact artifact location and runtime dependencies are chosen
only after the supported API is identified. Probe code is future work.

## Specific future sub-agent opportunities

A documentation researcher can inventory versioned APIs without accessing
credentials. Platform specialists can independently run the same approved probe
on distinct Windows/macOS/Linux test hosts. A runtime reviewer can compare
results against APP-01/APP-07 without modifying the probe or scheduler.
Coordinator owns the shared probe/API contract; platform agents must not
rewrite that contract or infer support from another platform.

## Validation and exit gate G01

Run V01/V02 and lifecycle portions of V07/V08/V16 in actual app sessions.
Capture install/log paths, process ownership and native session IDs without
credentials. App-native lifecycle must permit deterministic orchestration,
truthful terminal outcomes, independent validation and recovery on all initial
platforms; evidence cannot consist solely of screenshots, release notes or mocks.

Operator accepts a supported approach or records **no-go** with missing APIs.
If mandatory support is absent or not tested, P02-P08 remain blocked pending
operator scope revision. Do not substitute prompt-only coordination for parity.
Continue-after-close may remain unresolved and unavailable.

**Risks:** R01/R02/R03/R10. **Evidence:** E-P01-* with API permalinks, host matrix,
probe results and human decision. No G01 acceptance exists yet.
