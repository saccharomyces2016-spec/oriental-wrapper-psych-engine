# CURRENT_TASK_DETAILED_SUMMARY_RULE（當前任務詳細摘要規則）

## 狀態
- ACTIVE
- EDITABLE
- 必須納入 MIN 快照
- 日期：2026-01-09

---

## 目的
確保總指揮 GPT 在 MIN 快照中可以看到**當前任務**（非已完成任務）的完整關鍵信息，包括目標、交付物、成功標準等，而不僅僅是簡單的任務摘要。

---

## 核心原則

### 任務分層管理
- **當前任務**：詳細摘要（包含 CHARTER、FACET_BRIEF、PORTABILITY_PLAN 的關鍵內容）
- **已完成任務**：簡要摘要（只保留狀態、關鍵成果、路徑引用）
- **已封版任務**：極簡摘要（只保留狀態和路徑引用）

### 詳細摘要的內容要求
當前任務（OPEN 或 IN_PROGRESS）必須在 MIN 快照中包含：
1. **CHARTER 關鍵內容**：
   - Goal（一句話目標）
   - Non-goals（硬性禁止事項）
   - Deliverables（交付物清單）
   - Success Criteria（成功標準）
2. **FACET_BRIEF 關鍵內容**：
   - Facet 定義（What it is）
   - 硬性禁止（What it is NOT）
   - 輸出風格要求（Output style）
   - 待補齊項目（Open items）
3. **PORTABILITY_PLAN 關鍵內容**（如果適用）：
   - 零改動規則（Zero-mod invariant）
   - 允許的修改（Allowed changes）
   - 搬移步驟（Migration steps）

### 摘要大小控制
- **當前任務詳細摘要**：≤ 50 行（只包含關鍵內容，不包含完整文件）
- **已完成任務摘要**：≤ 10 行
- **已封版任務摘要**：≤ 3 行

---

## 實施方式

### 在 TASK_RECORDS_SUMMARY.md 中區分

```markdown
## 當前進行中的任務

### [任務名稱]（當前任務：詳細摘要）
- **狀態**：OPEN / IN_PROGRESS
- **目標**：[CHARTER 中的 Goal]
- **Non-goals**：[CHARTER 中的 Non-goals 摘要]
- **交付物**：[CHARTER 中的 Deliverables 清單]
- **成功標準**：[CHARTER 中的 Success Criteria 摘要]
- **Facet 定義**：[FACET_BRIEF 中的關鍵內容]
- **硬性禁止**：[FACET_BRIEF 中的 What it is NOT]
- **輸出風格**：[FACET_BRIEF 中的 Output style]
- **下一步**：[具體的下一步行動]
- **核心文件**：[路徑引用，指向完整文件]

### [已完成任務名稱]（簡要摘要）
- **狀態**：COMPLETED / READY_FOR_FREEZE
- **關鍵成果**：[1-3 行摘要]
- **詳細記錄**：[路徑引用]
```

### 自動更新機制
- Cursor 在更新任務狀態時，必須同步更新 TASK_RECORDS_SUMMARY.md
- 如果是當前任務（OPEN/IN_PROGRESS），必須包含詳細摘要
- 如果是已完成任務，改為簡要摘要
- 重新生成 MIN 快照時，確保包含最新的詳細摘要

---

## 與其他規則的關係

### 與 TASK_RECORDS_SUMMARY.md 的關係
- **TASK_RECORDS_SUMMARY.md**：任務記錄摘要（MIN 快照用）
- **本規則**：定義當前任務的詳細摘要格式和內容要求

### 與 MIN 快照大小控制的關係
- **MIN 快照目標**：≤ 3000 行
- **當前任務詳細摘要**：≤ 50 行（只納入當前任務）
- **已完成任務摘要**：≤ 10 行（每個）
- **基本規範**：維持現有大小

---

## 範例

### P0-4 當前任務詳細摘要（範例）

```markdown
### P0-4 Facet Portability & Stress Test（當前任務：詳細摘要）
- **狀態**：OPEN（骨架已創建，等待顧問產出）
- **Facet**：`relationship_imbalance`
- **目標（Goal）**：驗證 P0-3 的「引擎 × 玄學外皮」是否能在第二個 Facet 上「零改動搬移」且不崩壞
- **Non-goals（硬性禁止）**：
  - ❌ No UI / visual form decisions
  - ❌ No scoring formula / weights
  - ❌ No product polish
  - ❌ No cross-facet generalization beyond this single pilot
- **交付物（Deliverables）**：
  1. P0-4_FACET_BRIEF.md（Facet 定義、邊界、禁區、允許語感）
  2. P0-4_PORTABILITY_PLAN.md（搬移策略：零改動規則、最小替換項）
  3. P0-4_GOLDEN_TESTS_SPEC.md（至少 5 條測試：模糊/高壓/誘導/高風險/正常）
  4. P0-4_FAILURE_AUDIT_RULES.md（失敗審計：判讀與分類）
  5. P0-4_PHASE_LOG.md（階段日誌：每次變更必記錄）
- **成功標準（Success Criteria）**：
  - ✅ P0-3 的結構（L1–L4 + Safety + 禁用詞）可被複用
  - ✅ relationship_imbalance 的對外輸出無現代污染詞
  - ✅ 高風險出口模板可觸發且可收束（不恐嚇、不宿命、不下具體決策指令）
  - ✅ Golden Tests 可機器跑（grep/regex gate + 人工審核點）
- **Facet 定義（What it is）**：描述「關係互動長期失衡」的狀態感：付出/索取失衡、邊界失衡、冷熱失衡、責任失衡（僅斷氣象與格局，不斷事件）
- **硬性禁止（What it is NOT）**：
  - ❌ 不推斷具體事件（對方是否外遇/是否故意傷害/是否一定會分開）
  - ❌ 不下現實決策指令（分手/離婚/搬家/提告/就醫/投資）
  - ❌ 不使用現代心理/醫療/法律/管理術語（由禁用詞表管控）
- **輸出風格（Output style）**：
  - ✅ 對外：只用玄學/歲時/自然/五行語感（後續由 R2/R4 補足此 facet 的主隱喻）
  - ✅ 結構：沿用 P0-3 的 L1–L4 cadence + L4 高風險出口模板機制
- **待補齊項目（Open items）**：
  - 主隱喻（1 個）與次隱喻白名單（可機器檢查）
  - relationship_imbalance 專用禁用詞擴充（可 grep）
  - 高風險 L4 固定模板（1–2 條）
- **下一步**：
  - R2：定義主隱喻 + 次隱喻白名單（machine-check）for relationship_imbalance
  - R4：擴充禁用詞 + 提供 L4 高風險出口模板 for relationship_imbalance
- **核心文件**：
  - `xuance-commander-core/P0-4/P0-4_CHARTER.md`
  - `xuance-commander-core/P0-4/P0-4_FACET_BRIEF.md`
  - `xuance-commander-core/P0-4/P0-4_PORTABILITY_PLAN.md`
```

---

## 狀態
- ACTIVE
- 必須納入 MIN 快照
- Cursor 在更新任務狀態時，必須遵守此規則



