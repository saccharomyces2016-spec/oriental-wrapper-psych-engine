# P0-4｜Portability Plan（零改動搬移策略｜MVP）

## Rule 0 — Zero-mod invariant (Hard)
不得改：
- L1–L4 功能分工與節奏
- R4 Safety gate 的原理（禁用詞、黑名單、L4 出口）
- "不斷事件 / 不下決策指令"的邊界

## Allowed changes (only these)
- 替換：主隱喻與次隱喻白名單（machine-check）
- 新增：relationship_imbalance 的禁用詞擴充（machine-check）
- 新增：relationship_imbalance 的 L4 高風險出口模板（固定句式）
- 新增：Golden Tests（至少 5 條）

## Migration steps
1) Copy P0-3 gating structure to P0-4 (conceptually; do not refactor P0-3)
2) Create P0-4 facet-specific metaphor whitelist/banlist
3) Create P0-4 facet-specific banned terms list (CN/EN)
4) Define L4 high-risk fixed exit templates
5) Build Golden Tests (inputs + expected gates)
6) Run CI-like checks (grep/regex) + human review checklist

## Output artifacts
- `P0-4_GOLDEN_TESTS_SPEC.md`
- `P0-4_FAILURE_AUDIT_RULES.md`
- `P0-4_PHASE_LOG.md` (always updated)
