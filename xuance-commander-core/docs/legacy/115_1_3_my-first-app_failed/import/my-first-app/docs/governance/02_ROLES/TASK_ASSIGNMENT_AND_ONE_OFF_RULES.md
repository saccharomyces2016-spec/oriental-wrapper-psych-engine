# TASK_ASSIGNMENT_AND_ONE_OFF_RULES

本文件用於區分一次性任務（One-off）與永久制度（Permanent Rule），
避免臨時指令被誤認為系統規則。

---

## 一、任務類型定義

### 一次性任務（One-off）
特徵：
- 解決當下問題
- 不代表未來必須照做
- 完成後可被移除

標記方式（建議）：
[ONE-OFF]

---

### 永久規則（Permanent Rule）
特徵：
- 影響系統長期行為
- 必須寫入 MD 文件
- 需人類明確確認

標記方式（建議）：
[PERMANENT]

---

## 二、指定與治理規則

1. Permanent Rule 必須記錄於對應規格文件
2. Codex 不得將 One-off 任務升級為永久規則
3. 不確定性質時，一律視為 One-off

---

## 三、回滾原則

- 人類可隨時否決 AI 建議
- 回滾優先於修補
- 文件為最高準據
