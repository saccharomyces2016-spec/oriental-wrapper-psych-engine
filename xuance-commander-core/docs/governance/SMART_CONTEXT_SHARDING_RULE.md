# SMART_CONTEXT_SHARDING_RULE（智慧分流與自動取證規範）

## 目標
- 假設每次對話為零記憶
- AI 僅依賴文本（SSOT）與自動附帶之最小快照
- 降低 token 使用，同時保持可審計、可重跑

## 分流層級（必遵守）
1) MIN（每次必帶）
   - MASTER_MIN_SYNC_PACKET.md
   - 指向：CHARTER / ROADMAP / CURRENT / TEXT_ONLY / TASK_LIFECYCLE / AI_ADVISORY_ROLES
   - 僅包含「指標」，不包含全文

2) FULL（條件觸發）
   - 僅在以下情況附帶：
     - 里程碑驗收
     - 治理 / Canon / Single Source 變更
     - 大規模修復或回溯

3) EVIDENCE（工程證據）
   - Cursor 掃描 / Audit / Verification Pack
   - 僅以「摘要指標」寫入 MASTER
   - 原始檔保留於 tmp/audit（非 SSOT）

## Cursor 報告整合規則
- Cursor 報告不得全文寫入 MASTER
- 必須轉為：
  - 問題類型
  - 問題數量
  - 是否已解決 / 未解決
- 原始檔只作為取證參考

## 自動觸發
- 對話中出現以下關鍵詞時，下一輪必須補指標進 MASTER：
  governance / canon / audit / cursor / drift / single-source / absolute-ref

## 禁止
- 禁止把完整掃描報告塞進 MASTER
- 禁止用對話上下文取代文本

## 驗收
- 中斷後只靠 MASTER_MIN + 指標即可重啟
