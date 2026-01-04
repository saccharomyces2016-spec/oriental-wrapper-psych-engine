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
