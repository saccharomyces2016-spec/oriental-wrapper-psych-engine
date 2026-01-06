# Stateless Continuity Rule（無狀態連貫規則）

## 設計假設
- 每一次對話都是全新上下文
- AI 不保證任何記憶
- 唯一可信的是文本

## 強制規定
- 目標：只能從 ROADMAP / CURRENT 取得
- 狀態：只能從 CURRENT / COMMAND_BRIEF 取得
- 證據：只能從 Canon Path 取得

## 違規視為
- 推論無效
- 決策不可採納
