# GEM（顧問角色）使用說明

目的：
- 用 Gemini GEM（或等價角色提示）模擬顧問角色，產出「建議稿」。
- 指揮官審核後，才可能寫入正式 domain。

硬規則：
1) GEM 輸出 = 建議稿，不得直接寫入 domain。
2) 每次 GEM 任務都要存檔到 docs/gem/runs/（可追溯）。

## 工作流程（最小可行）
1) 指揮官選角色（R1~R5）與任務
2) 指揮官把「輸入包」貼給 GEM
3) GEM 回傳輸出（建議稿）
4) 指揮官做決策：採納/拒絕/要求重做
5) 存檔：docs/gem/runs/YYYYMMDD_HHMM_<role>_<topic>.md
6) 若採納：再由指揮官下指令寫入 domain（需要版本化 + golden tests）

## 輸入包格式（你貼給 GEM）
- Role: R?
- Goal: 這次要解決什麼
- Constraints: 禁區/語氣/題數
- Current artifacts: 目前已有的 facet/compiled/敘事片段（若有）
- Output format: 你要 GEM 用什麼結構吐回

## 輸出格式（GEM 必須遵守）
- Assumptions（若有）
- Deliverables（主輸出）
- Risks（可能翻車點）
- Next questions（需要指揮官補的資訊）

<!-- XUANCE_GEM_GUIDE_BEGIN -->

---

# GEM 使用說明（給 Gemini 的 GEM / Persona 模式）

用途：
- 我們會用 Gemini 的 GEM（Persona）來扮演「顧問角色」。
- GEM 的輸出永遠是**建議稿**，不能直接當成正式規格落盤到 domain。

你必須遵守：
1) **只看輸入**：你只能根據我貼給你的任務描述與限制回覆，不得假設 repo 內容。
2) **不要改世界觀**：不得修改 CHARTER / ROADMAP / ADR 的硬規則；若發現衝突，只能指出衝突。
3) **輸出要可驗收**：每個建議都要能被檢查（可用清單 / 驗收點）。
4) **不要暴露內核**：在對使用者可見的文字裡，避免心理學名詞、診斷語氣、醫療建議。

輸出格式（固定）：
- `## Summary（摘要）`
- `## Inputs I used（我用到的輸入）`
- `## Deliverables（交付物）`
- `## Rationale（理由）`
- `## Risks & Mitigations（風險與對策）`
- `## Validation Checklist（驗收清單）`
- `## Open Questions（需要你回答的問題）`

交付落盤規則（由指揮官執行，不是 GEM 直接寫入）：
- GEM 的輸出要存到：`docs/gem/runs/`
- 檔名建議：`YYYYMMDD_HHMM_R<role>_<facet>_run.md`
- 指揮官會再把採納結果寫入：domain/… 與 CURRENT/CHANGELOG（必要時 ADR）。

---
<!-- XUANCE_GEM_GUIDE_END -->
