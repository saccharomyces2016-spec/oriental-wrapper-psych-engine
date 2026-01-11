# TASK_RECORDS_INDEX（任務記錄索引）

## 目的
統一記錄所有任務（臨時性任務、階段性任務、主線任務）的進展與完成狀態，讓程式端 GPT 知道當前有哪些任務在進行中或已完成。

## 任務記錄位置
- **主線任務**：`roadmap/ROADMAP.md`（SSOT）
- **階段性任務記錄**：
  - 決策包：`P0-*/DECISION_PACKET_*.md`
  - 任務日誌：`docs/domain/advisory/P0-*_TASK_LOG.md`
  - 快照索引：`docs/domain/snapshots/P0-*_SNAPSHOT_INDEX.md`
  - 快照提取：`docs/domain/P0-*_SNAPSHOT_EXTRACT.md`
- **臨時性任務記錄**：記錄在 `memory/briefs/CURRENT.md` 或專屬記錄文件

## 任務記錄規則（硬規則）

### 所有任務都必須記錄
**強制規則**：任何任務（臨時性、階段性、主線任務）都必須：
1. 在 `docs/ops/TASK_RECORDS_INDEX.md` 中登記（完整記錄）
2. 在 `docs/ops/TASK_RECORDS_SUMMARY.md` 中寫入摘要（如果正在進行）
3. 詳細記錄寫在專門文件，並在摘要中引用路徑
4. 重新生成 MIN 快照，確保新任務出現在快照中

### 進行中的任務
- **必須在 MIN 快照中包含摘要**（讓總指揮 GPT 知道當前任務）
- **摘要必須包含**：
  - 目標（1 行）
  - 主要成果（3-5 條）
  - 待補齊項目（3-5 條）
  - 是否可以收尾（是/否，以及條件）
  - 詳細記錄路徑（1-3 個文件路徑）
- **詳細記錄寫在專門文件**（不全部放在快照中，避免 token 爆量）

### 已完成的任務
- **快照中只保留「已完成」狀態 + 完成日期 + 關鍵成果摘要（1-3 行）**
- **詳細記錄保留在專門文件**（可追溯）
- **完成後的詳細記錄不需要出現在 MIN 快照中**
- **超過 3 個月的已完成任務只保留路徑引用**

## 當前任務記錄

### P0-5 Minimal UI Integration
- **狀態**：IN_PROGRESS（進行中）
- **目標**：建立世界級水準的 UI 串接，能夠收集使用者資訊、展示五行命理世界觀、讀取 compiled facet，並以豐富的動畫和視覺化方式呈現敘事、建議與風險鏈
- **詳細記錄**：
  - 任務憲章：`P0-5/P0-5_CHARTER.md`
  - UI 架構設計：`P0-5/P0-5_UI_ARCHITECTURE.md`
  - UI 串接規格：`P0-5/P0-5_UI_INTEGRATION_SPEC.md`
  - UI 設計需求：`docs/domain/design/P0-5_UI_DESIGN_REQUIREMENTS.md`
- **最新更新**：2026-01-09

---

## 已完成任務記錄

### P0-4.5 題目流程與分流系統設計（Question Flow & Funnel System Design）
- **狀態**：✅ COMPLETED
- **完成日期**：2026-01-10
- **任務性質**：設計決策任務（架構決策，影響後續所有開發）
- **目標**：設計一個能夠「涵蓋全人類、全年齡、全困擾、全困境」的多階段分流選擇系統，確定題型設計策略，為未來的八卦盤界面設計奠定基礎
- **核心設計**：4-Stage Holographic Funnel System（四階段全像漏斗系統）
  - Stage 1: 八卦定方位（The Domain Gate）- 單選，八卦轉輪/八門卡片
  - Stage 2: 六親定物象（The Context Lock）- 多選 2-3 項，符號雲/物象群
  - Stage 3: 萬象定歸因（The Attribution Matrix）- 投射式選擇，萬象羅盤/星盤
  - Stage 4: 命盤綜合與斷語（Synthesis & Routing）- 生成綜合斷語並路由到 Facet
- **關鍵成果**：
  - ✅ 設計出能夠「涵蓋全人類」的分流系統（有「中宮/混沌」作為兜底入口）
  - ✅ 確定不同階段應該使用的題型（單選、多選、投射式選擇）
  - ✅ 規劃八卦盤界面整合方案（Stage 1 明確使用八卦轉輪）
  - ✅ 設計路由規則（精確路由 + 模糊路由）
  - ✅ 確保最終收斂至單一 Facet（符合商業模型要求）
- **詳細記錄**：
  - 任務憲章：`P0-4.5/P0-4.5_CHARTER.md`
  - 分流系統設計規格：`P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md`（FREEZE 狀態）
  - 階段日誌：`P0-4.5/P0-4.5_PHASE_LOG.md`
  - 任務包：`docs/gem/briefs/TASK_PACKAGE_P0-4.5_QUESTION_FLOW_FUNNEL_SYSTEM.md`
  - 優先級分析：`docs/governance/QUESTION_FLOW_DESIGN_PRIORITY_ANALYSIS.md`

### P0-4 Facet Portability & Stress Test
- **狀態**：✅ READY_TO_FREEZE
- **完成日期**：2026-01-09
- **關鍵成果**：
  - 驗證 P0-3 結構可在 `relationship_imbalance` Facet 上零改動搬移
  - R2 交付：主隱喻「月相潮汐・盈虛觀」+ 次隱喻白名單
  - R4 交付：禁用詞擴充 + L4 高風險出口模板
- **詳細記錄**：見 `P0-4/P0-4_FREEZE_READINESS.md`

### P0-3 Narrative Sharpness / Esoteric Precision
- **狀態**：✅ READY_TO_FREEZE
- **完成日期**：2026-01-09
- **關鍵成果**：
  - R1：敘事銳利度指標 M1–M4 + Critical Fail 規則
  - R2：L1–L4 敘事骨架 + 次隱喻白名單
  - R4：禁用詞表 + L4 高風險出口模板
- **詳細記錄**：
  - 決策包：`P0-3/DECISION_PACKET_P0-3.md`
  - 任務日誌：`docs/domain/advisory/P0-3_TASK_LOG.md`
  - 快照索引：`docs/domain/snapshots/P0-3_SNAPSHOT_INDEX.md`
  - 快照提取：`docs/domain/P0-3_SNAPSHOT_EXTRACT.md`

---

## 已完成任務記錄

### P0-2 Output Contract
- **狀態**：COMPLETED
- **完成日期**：2026-01-07
- **關鍵成果**：
  - 已鎖定：引擎只判斷「狀態」，不判斷「人生」
  - 已完成：禁止清單、允許層級、責任邊界
- **詳細記錄**：見 `docs/domain/output/P0-2_OUTPUT_CONTRACT.md`

### P0-2 Question Design
- **狀態**：COMPLETED（Phase Closed）
- **完成日期**：2026-01-07
- **關鍵成果**：
  - 5-question symbol-first assessment with integer scoring & gates
  - 所有 UI、follow-up probes、intervention layers 明確延後
- **詳細記錄**：見 `docs/domain/design/P0_2_PHASE_CLOSURE_SUMMARY.md`

---

## 使用方式

### 查看當前任務
1. **快速查看**：查看本文件（TASK_RECORDS_INDEX.md）
2. **詳細查看**：查看對應的任務記錄文件（見「詳細記錄」欄位）

### 新增任務記錄
1. 在 `roadmap/ROADMAP.md` 中登記（如果是主線任務）
2. 在本文件中新增記錄（狀態、目標、主要成果、詳細記錄路徑）
3. 更新 MIN 快照生成腳本，包含任務摘要

### 任務完成
1. 更新本文件：狀態改為 COMPLETED，填寫完成日期和關鍵成果摘要
2. 更新 MIN 快照：只保留「已完成」狀態 + 1-3 行摘要
3. 詳細記錄保留在專門文件，不再出現在 MIN 快照中

---

## 狀態
- ACTIVE
- 每次任務狀態變更時應更新此文件


### P0-4 Facet Portability & Stress Test
- **狀態**：READY_TO_FREEZE（可封板）
- **目標**：驗證 P0-3 建立的「L1–L4 敘事結構 × 安全邊界 × 機器化治理規則」，是否能在第二個 Facet（`relationship_imbalance`）上零改動搬移且不崩壞
- **主要成果**：
  - R2：主隱喻「月相潮汐・盈虛觀」+ 次隱喻白名單 + 機器化檢查規則
  - R4：禁用詞擴充（針對關係失衡）+ L4 高風險出口模板（A/B）
- **詳細記錄**：
  - Charter：`xuance-commander-core/P0-4/P0-4_CHARTER.md`
  - Phase Log：`xuance-commander-core/P0-4/P0-4_PHASE_LOG.md`
  - Task Log：`docs/domain/advisory/P0-4_TASK_LOG.md`
  - Freeze Readiness：`P0-4/P0-4_FREEZE_READINESS.md`
  - Final Checklist：`P0-4/P0-4_FINAL_CHECKLIST.md`
  - Handoff Summary：`P0-4/P0-4_HANDOFF_SUMMARY.md`
- **最新更新**：2026-01-09
