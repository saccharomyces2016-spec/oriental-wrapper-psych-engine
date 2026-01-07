# Mandatory Milestone Recording Rule（階段成果強制留證規則）

## 規則等級
- 治理硬規則（Hard Governance Rule）
- 優先級等同：
  - BOOT_RULE
  - PREWRITE_STATE_CONFIRMATION
  - TEXT_ONLY_EXECUTION_RULES

## 核心原則（不可違反）
任何被判定為「已完成」的項目，包含但不限於：
- 階段性目標
- 臨時目標
- 封板決策
- 明確決定「此處停止、不再深化」

**都必須寫入文本做永久記錄。**

未寫入文本的完成：
- 視為不存在
- 不得在後續被引用為既有成果

## 強制記錄內容（三要素）
每一筆完成記錄，至少必須包含：
1. 完成了什麼（What）
2. 為什麼在此停下（Why stop here）
3. 什麼條件下才允許重新打開（Reopen condition）

## 適用範圍
- CURRENT.md（狀態與已完成事項）
- CHANGELOG.md（制度或決策變更）
- 必要時透過 checkpoint 留存雲端證據

## 違規處理
若未遵守本規則：
- 指揮官必須拒絕推進後續工作
- 必須先補齊缺失的文本紀錄，才可繼續


---

# Merged from COMPLETION_RECORD_RULE.md

# Completion Record Rule（完成即記錄｜硬規則）

## 規則
任何「階段性目標 / 臨時目標 / 探索性任務」只要被判定為完成，**必須**同時滿足：

1) 寫入 
2) 寫入 
3) 以 checkpoint 形式 commit + push
4) 重建 

## 未滿足以上任一項：
- 該完成視為「不存在」
- 不得在後續決策中引用

## 目的（白話）
防止：
- 做過但忘記
- 做完但沒證據
- GPT 因上下文遺失而判斷錯誤


---

# Merged from REPAIR_RECORDING_RULE.md

# Repair Recording Rule（修繕紀錄規範｜硬規則）

## 目的
避免「小修正」長期累積後，導致系統退化但無法追溯原因。

## 適用範圍
凡是下列任一行為，皆視為「修繕（Repair）」：
- wording fix / seal wording
- 腳本順序調整
- 防呆補強（set -e / guard）
- 小型 refactor（不改行為）
- 錯誤修正（非新功能）

## 強制規則
1) 每一次修繕，**必須留下文字紀錄**
2) 不得只存在於 commit message
3) 紀錄最小要求：
   - 修了什麼
   - 為什麼要修
   - 是否可能再發生

## 紀錄層級
- 預設：寫入 CHANGELOG.md（Added / Changed / Fixed）
- 同時在 CURRENT.md 用一句話標示「近期修繕已發生」
- **不需要 checkpoint**（除非影響治理/架構）

## 例外（需升級）
若修繕：
- 影響治理規則
- 改變任務流程
- 影響同步 / 記憶 / 對齊機制

→ 必須升級為里程碑，使用 checkpoint。

## 核心原則
- 小事也要留下痕跡
- 不讓「修到哪算哪」成為常態
