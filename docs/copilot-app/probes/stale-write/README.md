# Stale-write experiment

This local, disposable filesystem experiment is **not** a MyForge artifact
store or a host integration test. Run `node --test
docs/copilot-app/probes/stale-write/stale-write.test.mjs` from the repository
root. Each case uses its own temporary directory and removes it afterward.

The candidate snapshots a base digest, keeps the draft separately, checks live
content, and atomically renames a staged replacement. A change already present
at the check is rejected while both versions remain. An unchanged base is
replaced. The final case deliberately schedules an external write between the
check and rename and demonstrates that it is lost: atomic replacement is not
atomic compare-and-swap.

The candidate is intentionally unsafe and must not be used in the app.
Production qualification requires a supported conditional write or a genuinely
enforced single-writer boundary covering all writers, including external
editors; a cooperative lock by itself is insufficient. Otherwise the app must
block the save. Test actual host behavior, conflict preservation, errors and
recovery before advertising this capability.
