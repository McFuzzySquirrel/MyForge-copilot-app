# ADR-082: Canvas-led app orchestration

**Date:** 2026-11-27
**Status:** Accepted direction; implementation and host qualification pending.

## Context

The app-edition plan previously targeted parity with the inherited standalone
workflow engine and its compiled task manifest. Feasibility investigation found
that separate app-managed session creation was disabled in the tested host and
that the observed alternative used experimental workflow-owned subagents with
unresolved isolation and recovery limits.

## Decision

- Guide users from an idea through optional research, a reviewed specification,
  an evidence-backed multiphase plan, team and skill preparation, and an
  orchestrator-managed build using a canvas-type interface.
- Use the reviewed plan as the execution source of truth rather than a separate
  task backlog or execution manifest. Review both spec and plan before execution.
- Prefer separate app-managed sessions and visibly fall back to orchestrator
  subagents when needed, subject to real-host qualification. Do not imply that
  either mechanism is universally available.
- Repurpose useful agents, skills and code. Retire the inherited standalone
  launcher, engine and adapter only after their dependencies are replaced and
  migration, documentation and safety have been addressed.
- Require approval before installing discovered external skills and before
  consequential decisions during execution.

## Consequences

This is a product redesign rather than an engine port. The app does not inherit
engine parity claims. Host support, recovery, isolation, artifact formats and
the canvas remain to be established. The Copilot app is the platform boundary,
not a separate operating-system support matrix; observed platform-specific
limitations must still be documented. Existing standalone code remains present
until the retirement phase, and historical decisions and evidence are retained.

## Alternatives

- Continue the engine-parity port: rejected in favor of a simpler
  orchestrator-led product.
- Require separate app sessions with no fallback: rejected because the tested
  host disabled session creation.
- Retain the standalone engine as the app runtime: rejected to avoid a standalone
  dependency.

## References

- [Implementation plan](../copilot-app/IMPLEMENTATION-PLAN.md)
- [Historical feasibility evidence](../copilot-app/evidence/README.md)
