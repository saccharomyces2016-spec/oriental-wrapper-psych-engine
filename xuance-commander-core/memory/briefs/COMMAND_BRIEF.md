# COMMAND BRIEF（指揮官每次必讀，否則不得開始工作）

- generatedAt: 2026-01-05T08:42:49

## 必讀清單（只以文本為準）
- charter/CHARTER.md
- roadmap/ROADMAP.md
- memory/briefs/CURRENT.md
- docs/governance/TEXT_ONLY_EXECUTION_RULES.md
- memory/index/COMMANDER_ENTRYPOINTS.md
- docs/adr/ADR_0004_ai_advisory_roles_and_gem_protocol.md

## CHARTER（摘要）
（以下內容為原文節錄；若衝突，以 charter/CHARTER.md 為準）

# CHARTER（不可越界憲章：最高目標與限制）

## 最高主權
- 使用者擁有最終決策權
- AI 不得自訂、替換、升級「最高目標」
- AI 的任何目標提案僅能作為建議，且必須標示「建議」

## 最高目標（只允許使用者修改）
- 主目標：打造可長期運作、可維護、可收費、可持續擴充的互動式網頁產品
- 核心策略：核心引擎可審計；外層以東方命理敘事呈現；對使用者提供可執行建議與風險鏈

## 不可觸碰限制（只允許使用者修改）
1) 主進度/主目標以文本為準，不以對話上下文為準
2) 未寫入文本的結論視為不存在
3) 任何結構性變更（schema/domain/governance/charter）必須 ADR + 使用者批准
4) 指揮官必須白話回報、短句直白

---

## 成功定義補充（不可移除）

本專案在**使用者的認知與體驗中**，是一個**完整的玄學系統**。

使用者只會、也只需要感知到：
- 這是一個玄學網站
- 這是一套命理／神秘系統
- 這個系統非常準
- 這個系統對自己很有幫助

使用者**不需要、也不應該**被告知：
- 任何心理學名詞
- 任何現代科學背景
- 任何「其實這不是玄學」的說明

所有會削弱「這就是玄學」的解釋，
**都不得出現在使用者可接觸的層級。**

在系統內部（僅限開發與設計層）：

- 本專案不是胡扯
- 不是隨機生成
- 不是憑感覺寫內容
- 而是建立在**完整、嚴謹、可推導的現代心理學與相關科學系統之上**

即使外層呈現為玄學公式與敘事，
其內部也必須是**可以被推導的結構，而非隨意編造**。

本專案不追求讓使用者理解系統如何運作，
只追求一件事：

> 讓使用者在實際使用後，真實地覺得  
> 「這套玄學非常準，而且真的有幫助」。

若使用者普遍無法產生上述感受，
即使系統在工程或結構上正確，
**仍視為未達成專案目標，必須持續調整與修正。**

## 世界級水準與國際市場（CN/EN）

- 本產品必須做到世界級水準（質感、互動、敘事、穩定、可維護）。
- 本產品必須可切換成英文版（CN/EN），可直接接軌國際市場。
- 不管中文或英文，使用者都要普遍覺得：很準、看得懂、真的有幫助。
- 英文版不得只是翻譯；英文敘事要像原生英文玄學系統一樣自然。
- 以上不得削弱「對使用者：純玄學體驗」的硬規則（ADR_0002）。

## ROADMAP（摘要）
（以下內容為原文節錄；若衝突，以 roadmap/ROADMAP.md 為準）

# ROADMAP（唯一主線進度）

規則：
- 任何「題目版本」「規則版本」「方向調整」都必須先記錄在此
- 沒寫進 ROADMAP 的東西 = 不存在，不得採用
- 每次推進只允許更新一個「目前工作項」避免亂跳

## Phase 0：MVP（單一構面）
- [ ] P0-1 選定第一個構面（facet）
- [ ] P0-2 建立該 facet 的 questions/scoring/reco/narr/risk
- [ ] P0-3 跑 golden tests 固定輸入輸出
- [ ] P0-4 建立最小 UI 串接（讀 compiled facet -> 顯示敘事+建議+風險鏈）
- [ ] P0-5 最小付費/權限策略（占位，不優化）

## 版本紀錄（只記關鍵）
- v0.0：初始化治理/記憶/外置化骨架

## CURRENT（摘要）
（以下內容為原文節錄；若衝突，以 memory/briefs/CURRENT.md 為準）

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

## 補充：即時同步（MASTER）成果（已達成）

已達成：
- ✅ 已建立「即時同步」機制：用 `LAST_COMMAND_STATUS` 作為執行證據，並由 hook（或 tools）觸發重建 `MASTER_SYNC_PACKET.md`。
- ✅ 已形成固定做法（不靠人工複製貼上）：
  1) 任何關鍵指令 → 自動寫入 `memory/briefs/LAST_COMMAND_STATUS.md`
  2) 同步重建 `memory/briefs/MASTER_SYNC_PACKET.md`
  3) 後續對齊一律貼 MASTER（必要時再補 CHAT_PACKET）

驗收（可檢查）：
- 跑一條指令後，`LAST_COMMAND_STATUS.md` 的 `updatedAt` 會更新。
- 同一輪操作後，`MASTER_SYNC_PACKET.md` 的 `generatedAt` 會更新。
- MASTER 內能看得到最新的 `LAST_COMMAND_STATUS`（必要時含 `REPO_STATUS`）。

注意：
- SSOT 仍是 charter/roadmap/governance/adr 等原始檔；MASTER 只是同步快照。
- hook 失效時：不得宣稱「即時同步」，改用既有工具（如 `tools/xc` / `tools/xuance_run.sh`）跑關鍵指令以產生證據。

---
【狀態更新｜2026-01-04】

已完成：
- ✅ 絕對同步（Absolute Auto-Log）已啟用
  - 每一條終端機指令會自動寫入 memory/briefs/LAST_COMMAND_STATUS.md
  - 指令結果可被 MASTER_SYNC_PACKET 納入同步
  - 已實測（echo sync-test）：成功寫入 command / exitCode / success


---
【里程碑完成｜2026-01-04】

已驗收完成：
- ✅ GitHub 雲端同步已可用（local HEAD 可與 origin/main 比對）
  - remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
  - branch: main
  - 備註：雲端保留的前提是 commit + push（未 commit 的檔案仍只在本機）
- ✅ 即時同步（MASTER）已可用（每次指令 → LAST_COMMAND_STATUS 更新 → 觸發 MASTER 重建）
  - 驗收方式：`LAST_COMMAND_STATUS.md.updatedAt` 會更新，且同一輪 `MASTER_SYNC_PACKET.md.generatedAt` 會更新。
- ✅ 里程碑備份流程已建立（Checkpoint）
  - 執行：`bash xuance-commander-core/tools/xc_checkpoint.sh "MILESTONE: <里程碑名稱> 已驗收完成"`
  - 成功條件：push 成功 + CURRENT/CHANGELOG 留證 + MASTER 更新

決策：
- 「第八行（quick verify timestamps）」不再視為必做門檻；它只是『最後看一眼』，可省略。

待處理（下一個任務）：
- ⏳ 清除殼層遺留的 `_xc_precmd` 噴錯：`_xc_precmd:8: no such file or directory:`（以 hook cleanup + 新開終端驗收）

## TEXT-ONLY RULES（摘要）
（以下內容為原文節錄；若衝突，以 docs/governance/TEXT_ONLY_EXECUTION_RULES.md 為準）

# Text-Only Execution Rules（文本主控硬規則）

## 核心規則
- 對話上下文只能作為參考，不得作為主目標與主進度依據
- 主目標與主進度只允許引用：
  - charter/CHARTER.md
  - roadmap/ROADMAP.md
  - memory/briefs/CURRENT.md
  - docs/adr/*

## 禁止行為
- AI 不得擅自新增更高層級目標
- AI 不得擅自增加不可接受的限制
- AI 不得基於「我覺得更好」改寫主線

## 強制行為
- 每次開始任何工作前，必須先跑 preflight（tools/preflight.sh）
- preflight 會生成 memory/briefs/COMMAND_BRIEF.md
- 指揮官之後的所有決策與建議必須基於 COMMAND_BRIEF.md

## LATEST ADR（參考）
docs/adr/ADR_0004_ai_advisory_roles_and_gem_protocol.md
