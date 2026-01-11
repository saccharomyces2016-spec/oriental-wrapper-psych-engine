# RESEARCH vs LEGACY_FAILED 分離規則（不可混用｜SSOT）

目的：
- 保證「外部研究（RESEARCH）」與「舊失敗版本（LEGACY_FAILED）」可並行參考，但**永遠不混檔、不互相污染**。
- 任何顧問升華/延伸，必須在完整背景下進行，但引用必須可追溯、可分層。

## 三類資料（不可混用）

### 1) RESEARCH（Google Notebook 匯集）
- 來源：使用者以 Google Notebook 長期收集之大量研究資料
- 性質：外部研究／靈感／對照／補缺口（可引用，但需標註來源）
- Canon 路徑：`xuance-commander-core/docs/domain/research/RESEARCH/`
- 禁止：把 RESEARCH 內容搬去 legacy 目錄；或把 legacy 當成 research

### 2) LEGACY_FAILED（過往失敗版本）
- 來源：過往已確認失敗的舊版本資料夾（僅作反例/零件庫）
- 性質：負面案例庫／反模式／可回收零件（需經裁決才可復用）
- Canon 路徑：`xuance-commander-core/docs/legacy/115_1_3_my-first-app_failed/`
- 禁止：把 legacy 內容當成現行設計依據直接落盤到 domain

### 3) CURRENT_DOMAIN（現行主線產物）
- 來源：主線（P0-*）的現行產出與決策
- 性質：唯一可演進的正式結構（須遵循 gate）
- Canon 路徑：`xuance-commander-core/docs/domain/` + `xuance-commander-core/domain/`
- 禁止：未經 Commander 裁決直接改寫

## 快照規則（MIN/FULL）
- MIN / FULL 只是快照集合（snapshot set），不是 SSOT 本體。
- 上述三類資料必須各自擁有專屬檔案；快照只允許「提取指標與指針」。

## 顧問引用要求
- 顧問輸出必須清楚標註引用層：
  - [RESEARCH] / [LEGACY_FAILED] / [CURRENT_DOMAIN]
- 顧問不得自行把三層合併成單一結論當作既定事實；必須保留分層與不確定性標註。

