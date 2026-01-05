# Risk Register (Append-only)

Rule: Append-only entries per date. Do not rewrite history.

Entry format:
- Date
- Risk ID
- Description
- Impact (L/M/H)
- Likelihood (L/M/H)
- Mitigation (link to slice or doc)
- Owner (Commander/Deputy/Codex/User)

## 2026-01-02
- Risk ID: RISK-001
  - Description: Spec sprawl without runnable slice
  - Impact: H
  - Likelihood: M
  - Mitigation: Enforce Vertical Slice Protocol and checkpoint weakest-link selection
  - Owner: Commander
- Risk ID: RISK-002
  - Description: Role drift / conflicting instructions
  - Impact: M
  - Likelihood: M
  - Mitigation: Maintain Role Registry, Single Entry System, and checkpoint role reviews
  - Owner: Deputy
- Risk ID: RISK-003
  - Description: Toolchain mismatch across machines (Golden Commands divergence)
  - Impact: M
  - Likelihood: M
  - Mitigation: Enforce Golden Commands, .nvmrc + packageManager pins; log failures as blockers
  - Owner: Codex
