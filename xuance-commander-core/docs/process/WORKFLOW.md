# 工作流程（固定）

## 0. 任何新任務的起手式
- 先更新 memory/PROJECT_MEMORY.md：新增「目前狀態、正在做什麼、下一步」
- 若涉及規則/架構：先寫 ADR 草案（docs/adr/）

## 1. 收集輸入
- 使用者需求 -> 拆成可交付項（Deliverables）
- 缺資料 -> 明確列「缺口」與「缺口造成的影響」

## 2. 專家 AI 結論進來後的四檢
- 一致性：是否自相矛盾？是否與現有規則衝突？
- 可實作：能不能寫成 code / schema / test？
- 可測試：有沒有驗收點？有沒有失敗策略？
- 風險：安全、法律、產品風險是否被處理？

## 3. 通過 -> 產出 Codex 指令包
- 產出到 codex/packs/YYYYMMDD_HHMM_<topic>.sh
- 同步更新 memory/PROJECT_MEMORY.md 與相關 docs

## 4. 完工驗收
- 以「可重跑」為原則：同一個指令包在乾淨環境可重現結果

## 補充：避免文本膨脹的記憶策略（必做）
- 每次只更新：
  - memory/briefs/CURRENT.md（短摘要）
  - memory/changes/CHANGELOG.md（變更條列）
  - docs/adr/ 新增 ADR（若有規則/架構變更）
- 詳細內容放 domain/ 分檔或 docs/ops/ 分檔，不堆進單一檔案

## 補充：降低衝突的內容策略（必做）
- 不改同一個超大 rules.json
- 每個 facet/版本用獨立檔案（例：stress_recovery.*.v1.0.json）
- 需要跨 facet 合併時，用 build/compile_all.sh 編譯輸出
