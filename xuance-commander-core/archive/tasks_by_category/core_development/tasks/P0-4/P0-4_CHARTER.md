# P0-4｜Facet Portability & Stress Test（可移植性與壓測）

- Phase: P0-4
- Status: OPEN（任務包已批准，等待顧問產出）
- Target Facet: `relationship_imbalance`
- Canon Basis: reuse P0-3 structure (L1–L4 cadence, Safety gates, CI golden tests)
- Edit Policy: EDITABLE (skeleton-first; preserve future modification rights)
- **任務性質**：結構驗證任務（非內容創作）
- **批准任務包**：`docs/gem/briefs/TASK_PACKAGE_P0-4_FACET_PORTABILITY_APPROVED.md`

## Goal (One sentence)
驗證 P0-3 建立的「L1–L4 敘事結構 × 安全邊界 × 機器化治理規則」，是否能在第二個 Facet（`relationship_imbalance`）上**零改動搬移且不崩壞**。

## Non-goals (Hard)
- No UI / visual form decisions
- No scoring formula / weights
- No product polish
- No cross-facet generalization beyond this single pilot

## Deliverables (MVP)
1) `P0-4_FACET_BRIEF.md`（Facet 定義、邊界、禁區、允許語感）
2) `P0-4_PORTABILITY_PLAN.md`（搬移策略：零改動規則、最小替換項）
3) `P0-4_GOLDEN_TESTS_SPEC.md`（至少 5 條測試：模糊/高壓/誘導/高風險/正常）
4) `P0-4_FAILURE_AUDIT_RULES.md`（失敗審計：判讀與分類）
5) `P0-4_PHASE_LOG.md`（階段日誌：每次變更必記錄）

## Success Criteria (MVP) - 成功定義（不可模糊）
- ✅ 不改動 P0-3 的任何結構或規則
- ✅ 僅替換 Facet 專屬內容（隱喻、禁用詞、L4 模板）
- ✅ 對外輸出仍呈現為「完整玄學系統」
- ✅ 高風險時只能走固定出口模板，不失控、不下判決
- ✅ P0-3 的結構（L1–L4 + Safety + 禁用詞）可被複用
- ✅ relationship_imbalance 的對外輸出無現代污染詞
- ✅ 高風險出口模板可觸發且可收束（不恐嚇、不宿命、不下具體決策指令）

