# Role Sync Packet Protocol（角色同步封包制度｜硬規則）

目的：
- 對外（R1/R4/未來顧問）交付永遠「一角色一包」，避免缺件與假設導致漂移。
- 每次改規範/改主線/改 briefs → 只要重生封包再重送即可，不依賴對話記憶。

## 硬規則（不可違反）
1) 一個角色 = 只發一個 Markdown 檔（Role Sync Packet）。
2) 該單一檔案必須同時包含：
   - 專案共通事項（Common Rules + SSOT 摘要/全文）
   - 該角色專屬事項（Brief / 禁區 / 輸出格式 / Gate）
   - 該角色所需參考資料（純文字來源，直接內嵌）
3) 禁止分成 common packet + role packet，避免「一個角色要傳兩包」。
4) 規範或 brief 變更時：
   - 唯一合法作法：重新生成該角色封包並重新傳送（以新封包為準）。
   - 舊封包視為過期，不得作為依據。

## 顧問缺件處置（防假設漂移）
若顧問回報缺件或無法對齊：
- 代表收到的不是最新封包或封包生成失敗。
- 顧問必須停止自行假設，改為回報「缺哪一項」。

## 產物落點與命名
- 產物目錄：`xuance-commander-core/memory/briefs/role_sync_packets/`
- 命名（固定）：
  - `ROLE_R1_SYNC_PACKET.md`
  - `ROLE_R4_SYNC_PACKET.md`
- LATEST 指標（固定）：
  - `role_sync_packets/LATEST/ROLE_R1_SYNC_PACKET.md`
  - `role_sync_packets/LATEST/ROLE_R4_SYNC_PACKET.md`

## 失效判定
- 若顧問產出與現行規範/brief 衝突：
  - 視為使用過期封包；
  - 該產出不得進入 Domain Gate（不得寫入 domain/）。

---

## Integration Notes（與現有同步/治理的整合｜必讀）

### 1) Role Sync Packets 與 MASTER_MIN/FULL 的分工
- 對 **顧問角色（R1/R4/R2/R3/R5）** 的交付：**一律用 Role Sync Packet**（一角色一包）。
- 對 **指揮官（GPT）** 的狀態對齊：日常用 **MASTER_MIN**；必要時用 **FULL**。
- 禁止：把 FULL MASTER 當成顧問輸入（容易爆上下文且顧問不需要工程證據）。

### 2) Role Sync Packets 的內容優先序（避免缺件與漂移）
Role Sync Packet 內文必至少包含：
1. CHARTER / ROADMAP / CURRENT（共同規範）
2. 角色專屬 Brief（例如 R1 blueprint、R4 riskchains）
3. 必查指標（legacy router、research gate、lessons learned）
4. 交付格式與驗收點（該角色在 AI_ADVISORY_ROLES.md 定義者）

### 3) 何時必須重新生成 Role Sync Packets
任一成立即必須重建並重新貼給對應角色：
- CHARTER / ROADMAP / CURRENT 任一更新
- ADR 變動（新增/狀態變更）
- 該角色的 brief 變動（docs/gem/briefs/*）
- 你要顧問在同一主題上做「第二輪」輸出（避免顧問仍使用舊規範）

### 4) 顧問需要提交給指揮官的「最小可用回包」（回收資料規格）
顧問回包必包含（否則視為缺件、不得採納落盤）：
- Used Packet: <ROLE_*_SYNC_PACKET.md 的 generatedAt 或 LATEST 指標路徑>
- Output: <建議稿全文>
- Assumptions: <所有假設條列>
- Acceptance: <如何驗收題目/風險鏈是否有效>

---

## Coverage Audit & Single-Packet Rule（硬性治理）

### 1. Single-Packet Rule（不可拆包原則）

- 任何角色（R1 / R2 / R4 / 其他顧問）
- 任何時間
- 任何任務階段

👉 只能接收「一個」對應角色的 Sync Packet（單一 Markdown 檔）

禁止行為：
- 補貼零散 Markdown
- 在對話中臨時補充背景
- 要求顧問自行回 repo 查資料
- 同一角色同時傳送兩個以上檔案

### 2. Coverage Audit Requirement（覆蓋率稽核強制）

- 每一份 ROLE_*_SYNC_PACKET.md
- 必須搭配一份 Coverage Audit 報告
- Audit 結果為 PASS，該 Packet 才視為可交付

Audit 至少包含：
- Required Sources（SSOT）
- Included Sources
- sha256 + line count
- 明確 Verdict：PASS / FAIL

### 3. FAIL Handling（失敗處理）

- Audit FAIL：
  - 不得交付顧問
  - 不得補貼修正
  - 必須重建 Packet + Audit

### 4. Consultant Stop Condition

- 顧問回報 MISSING / INCOMPLETE / STOP
- 一律視為 Packet 未通過 Audit
- 必須回到重建流程

### 5. Commander Responsibility

- 指揮官不得依賴記憶
- 只能以 Packet + PASS Audit 作為推進依據

