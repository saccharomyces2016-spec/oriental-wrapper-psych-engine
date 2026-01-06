# Cursor Git Tree Audit Task（檔案結構總盤點任務書）

## 目標
針對整個 repo 的路徑結構、重複資料夾、同名文件、相似內容文件進行盤點。
輸出「重點式」證據與建議，不做全面重寫。

---

## 盤點範圍
1) 目錄層級：找出重複的高風險 folder（尤其 gem / governance / runs / decision）
2) 同名檔案：同名但在不同路徑的 md 規範文件
3) 相似內容：不同檔名但內容高度雷同的治理文件（用關鍵句 / 標題比對即可）

---

## 必查清單（高風險）
### A. gem
- 列出所有名為 gem 的資料夾完整路徑
- 判斷哪個是 Canon，哪些是 Shadow / Drift（依 GLOBAL_FILE_CANON.md）

### B. governance
- 列出 governance 相關 folder
- 查有無重複規範文件（同名 / 同主題）

### C. runs / decisions
- 列出 runs、decision*、RUN_*、DECISION_* 的分布位置
- 判斷是否集中在單一路徑；若分散，標記為 drift

---

## 輸出格式（必須）
### 1) Findings（最多 10 條）
每條包含：
- 證據：路徑清單 / 片段
- 為何是風險：一句話
- 建議：一句話（例如「保留 core 的 gem，root 的 gem 改名為 shadow 或搬移」）
- 風險等級：P0/P1/P2

### 2) Proposed Actions
只提出「最小可回滾」方案：
- 不做大重構
- 先做：加註/registry/redirect 文件
- 後做：搬移/合併（需另開步驟）

---

## 禁止事項
- 不可直接刪檔
- 不可直接搬移大量目錄
- 不可改 Canon 定義（除非先提出替代方案與影響面）
