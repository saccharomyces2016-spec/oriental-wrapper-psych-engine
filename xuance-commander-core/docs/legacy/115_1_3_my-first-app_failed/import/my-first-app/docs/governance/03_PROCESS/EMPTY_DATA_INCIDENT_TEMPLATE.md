# Empty Data / Blank Output Incident — Evidence Template

Rule: No claim of fix without evidence.

1) Incident ID + date
2) Where blank occurred (module/path/function/route)
3) Expected vs actual (include sample payloads; redact secrets)
4) Reproduction steps (exact commands)
5) Evidence outputs:
   - logs
   - snapshot paths
   - before/after diff (if applicable)
6) Root cause hypothesis (clearly labeled)
7) Fix description (what changed, where)
8) Verification:
   - commands run
   - outputs showing non-empty
9) Regression guard:
   - test added OR decision logged why not
10) Rollback plan
