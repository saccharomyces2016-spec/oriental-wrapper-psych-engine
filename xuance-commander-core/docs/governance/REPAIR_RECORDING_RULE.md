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
