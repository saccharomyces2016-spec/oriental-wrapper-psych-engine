# Maturity Radar (0–3) — vNext Execution Health

Purpose: Provide a consistent, repeatable way to identify the weakest link each checkpoint and decide the next slice.

## Scoring (0–3)
- 0 = Not present
  - No doc, no implementation, no evidence.
- 1 = Draft exists
  - Document or plan exists, but not runnable/verifiable.
- 2 = Runnable / Verifiable
  - Can be executed and verified with concrete commands and evidence artifacts.
- 3 = Production-grade (for current scope)
  - Has guardrails, rollback, and reproducible verification (Golden Commands green or formally blocked w/ decision).

## Dimensions (8)
1) Governance & Single Source of Truth
2) Vertical Slice Runnable End-to-End
3) Toolchain Reproducibility (Golden Commands, pinned versions)
4) Core Safety Boundary (MVE / Firewall / forbidden access)
5) Product Flow Skeleton (end-to-end user journey, not aesthetics)
6) Billing & Licensing (DEFERRED until launch pricing phase)
7) Observability & Recovery (logs, metrics, rollback, degrade)
8) Maintainability & Extensibility (module boundaries, change isolation)

## Weakest-Link Rule (Decision)
- At each checkpoint, score all dimensions.
- The lowest score is the "weakest link".
- The next slice MUST address the weakest link unless a Decision Log entry explicitly overrides (with rationale + rollback + deferral to BACKLOG).

## Billing Note
Billing & Licensing is intentionally DEFERRED in early phases to avoid premature coupling.
