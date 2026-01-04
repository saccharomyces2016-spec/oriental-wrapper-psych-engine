# CURRENT（當前狀態短摘要）

目標：MVP（最小可行產品）採用「核心引擎穩定、內容外置化、schema 版本化」架構，降低後期衝突。

已完成：
- 初始化資料夾結構與玄策指揮官角色規範
- 建立可擴充 MVP 骨架（domain 分檔、schema、golden tests、build 合併）

下一步（待做）：
1) 選定第一個心理構面（facet）：例如 stress_recovery
2) 寫入該 facet 的 questions / scoring / recommendations / narratives / riskchains
3) 跑 golden tests，確保輸入輸出穩定

制度已建立：
- 想法治理（Idea Governor）
- 記憶治理（Memory Curator）
- Phase Gate
- 系統健康檢查

操作習慣：
- 任何新討論/新任務前：bash tools/export_chat_packet.sh .
- 並貼 out/CHAT_PACKET.md 給指揮官（最小必要上下文）

---

## 補充：即時同步（MASTER）成果（已建立）
- 已建立：單檔同步快照 MASTER_SYNC_PACKET.md（只讀，供每次對齊用）
- 原則：SSOT 仍是 charter/roadmap/governance/adr 等原始檔；MASTER 與原檔衝突以原檔為準，需重新生成 MASTER
- 使用習慣：每次新任務／重要決策前，優先貼 MASTER（必要時再補 CHAT_PACKET）

---
【狀態更新｜2026-01-04】

已完成：
- ✅ 絕對同步（Absolute Auto-Log）已啟用
  - 每一條終端機指令會自動寫入 memory/briefs/LAST_COMMAND_STATUS.md
  - 指令結果可被 MASTER_SYNC_PACKET 納入同步
  - 已實測（echo sync-test）：成功寫入 command / exitCode / success

