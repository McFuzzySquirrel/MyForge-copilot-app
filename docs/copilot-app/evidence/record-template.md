# Evidence record template

[Evidence protocol](README.md) | [Main plan](../IMPLEMENTATION-PLAN.md)

Copy only when a real check or review is performed. Replace placeholders; keep
raw sensitive artifacts in approved private storage.

| Field | Value to record |
| --- | --- |
| Evidence ID | E-Pxx-nnn |
| Phase / work / gate | Pxx / Pxx-Tnn / Gxx |
| Requirement / scenario | APP-nn / Vnn; list each checked criterion |
| Evidence kind | Documentation analysis / unit / contract / real app integration / human review |
| Source and implementation commit | Exact revisions; dirty-tree changes if applicable |
| Environment | OS/app/CLI/SDK/Node/provider/model identity; no credentials |
| Operator and timestamp | Actual runner/reviewer and check time |
| Run/task/attempt/native session | Actual IDs if applicable; otherwise not applicable |
| Prerequisite gate records | Accepted evidence and reviewer; do not infer acceptance |
| Procedure | Exact commands or repeatable interactive steps, fixture and scope |
| Expected | Measurable result and required negative behavior |
| Actual | Observed outputs, exit codes, counts and failure details |
| Outcome | Passed / failed / blocked / skipped / not-run |
| Artifact locations and digests | Sanitized repository paths or private location description |
| Limitations | Unchecked platforms, unavailable provider, permission or evidence gaps |
| Supersedes / follow-up | Previous record ID and corrective work if needed |
| Gate decision | Reviewer, time, criteria and accepted/rejected; blank until reviewed |

For operator acceptance, include what was exercised in the running app and why
the evidence establishes the requirement. Do not sign human review as an agent,
or mark a check passed because its command was merely proposed.
