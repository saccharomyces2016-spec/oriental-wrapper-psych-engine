[FULL_ONLY]

# Cursor Usage Rule（Cursor 協助制度改善規則）

## 目的
明確定義在制度性改善過程中如何使用 Cursor 產出證據與統計報告。

## Cursor 任務定位
Cursor 僅負責：
- 全倉結構盤點（Governance Scan）
- 權責/漂移/重複/未註冊路徑等模式識別
- 提供「摘要指標」用於制度改善決策

Cursor **不得**：
- 直接修改治理文本
- 決策制度走向
- 取代人類判斷與審核

## 使用方式
1) 在啟動治理改善前：  
   - 指揮官貼出 MASTER_MIN_SYNC_PACKET.md（或 FULL MASTER）
   - 指令：請 Cursor 產出治理盤點報告
2) Cursor 產出後：  
   - 生成 *摘要指標* + 未存在條目清單
   - 由指揮官與 Codex 判定納入制度文本
3) 未入制度前，指令視為「取證報告」而非制度存在

## 證據與留存
- Cursor 原始報告儲存於 xuance-commander-core/tmp/audit/  
- 任何制度納入必須在：
  - docs/governance/* md  
  - CURRENT.md  
  - GOVERNANCE_INDEX.md
  寫明摘要與引用


## Cursor Context Brief Protocol（必填）

目的：避免 Cursor 在缺少上下文時誤判（MIN/FULL 是「快照集合」，不是 SSOT 本體）。

### 0) 定義
- **SSOT（Source of Truth）**：repo 內原始文件（例如 CHARTER / ROADMAP / CURRENT / docs/governance/* / docs/adr/*）。
- **MIN/FULL**：同步快照（snapshot bundle），用來「傳遞必要上下文」，不等於 SSOT 本體。
- **CONTEXT_BRIEF**：給 Cursor 的最小必要任務說明包。

### 1) 何時必須提供 CONTEXT_BRIEF
只要要 Cursor 執行下列任一類型工作，就必須先提供 CONTEXT_BRIEF：
- 全倉盤點 / 目錄稽核 / 重複與衝突檢查
- 文件治理（索引、Owner、FULL_ONLY、淘汰、合併）
- 任何會改動路徑/檔名/生成器腳本/同步規則的工作

### 2) CONTEXT_BRIEF 最小內容（固定格式）
由指揮官提供給 Cursor（貼在同一則訊息開頭）：
- **Task Goal**：一句話（要達成什麼）
- **Scope**：要掃/要改的目錄範圍（含排除項）
- **Hard Constraints**：不可違反的規則（列 3~10 條，必引用檔名）
- **Required Refs**：本次必讀的 SSOT 文件清單（含路徑）
- **Output Location**：報告輸出落點（MD + JSON）
- **Acceptance**：成功條件（可用 grep / git diff --stat / script PASS 驗收）

### 3) Cursor 輸出格式（必回）
Cursor 完成任務後，必須輸出：
1) **Summary（≤ 12 行）**：結論 + 影響面（功能/結構/制度）
2) **What Changed**：檔案清單（新增/修改/刪除）+ 每項 1 行原因
3) **Evidence Pointers**：報告路徑、hash、關鍵計數、必要 grep 命中行
4) **Next**：下一步（最多 3 條）

### 4) 禁止事項（避免漂移）
- 未提供 CONTEXT_BRIEF：不得自行推進「結構性改動」
- 不得把大量細節灌入 MIN/FULL；只能更新指標（pointer）與必要短摘要
- 不得把暫存輸出當證據（除非被指揮官提升為 SSOT 並寫入索引）

### 5) 指揮官裁決責任
- Cursor 只做「盤點/施工/回報」；所有取捨與制度裁決由指揮官（GPT）負責。
- 指揮官以 Cursor 報告為依據，決定是否採納、是否需要回滾、是否需要補制度。

## 追加限制｜玄學體系設計
- Cursor 不得自行設計或決定玄學體系
- 僅能依 Context Brief 分析、整理、檢查一致性
- 所有體系選擇需由指揮官裁決

## 追加限制｜玄學體系設計
- Cursor 不得自行設計或決定玄學體系
- 僅能依 Context Brief 分析、整理、檢查一致性
- 所有體系選擇需由指揮官裁決

<!-- XUANCE_CURSOR_SUGGESTIONS_ALLOWED_BEGIN -->
## Cursor 建議輸出（允許，但必須標註為建議）

允許：
- Cursor 可以提供更多參考資訊、替代方案、風險提醒、可驗證步驟。
- Cursor 可以主動指出「資料缺口」並提出如何補齊（只讀盤點 / 引用清單）。

必須：
- 任何「新增規則／改變結構／裁決」一律由指揮官（GPT）決定。
- Cursor 的文字必須清楚標註：
  - [SUGGESTION] 建議
  - [EVIDENCE] 證據（含路徑指標）
  - [RISK] 風險
  - [NEXT] 下一步可跑的指令或檢查點

禁止：
- Cursor 不得把建議當作已定案寫入 SSOT（charter/roadmap/governance/adr/domain）。
- Cursor 不得自行「收斂」為單一路線並宣告最佳解；只能提供可選方案 + 代價。
<!-- XUANCE_CURSOR_SUGGESTIONS_ALLOWED_END -->

