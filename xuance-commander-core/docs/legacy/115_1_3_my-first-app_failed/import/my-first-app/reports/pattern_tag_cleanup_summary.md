# Pattern Tag P0 清理總結

**完成時間**：2025-12-29  
**任務**：修正所有 pattern tag mismatch，確保每個 tag 只映射回題目自己的 theme_id

---

## 修正結果

### 修正前
- **OK 次數**：82
- **MISMATCH 次數**：8
- **影響題數**：7

### 修正後
- **OK 次數**：90
- **MISMATCH 次數**：0
- **影響題數**：0

✅ **所有 mismatch 已修正**

---

## 修正詳情

### 1. chronic_depletion (Q0)
- **原 tag**：`boundaries`（映射到 suppressed_needs）
- **修正為**：`self-prioritization`（映射到 chronic_depletion，權重 0.6）
- **保留**：`overextension`（核心 tag，權重 1.0）、`recovery`（權重 0.8）

### 2. loss_of_agency (Q2)
- **原 tag**：`boundaries`（映射到 suppressed_needs）
- **修正為**：`voice`（核心 tag，權重 1.0）
- **保留**：`assertion`（權重 0.7）、`goal_setting`（權重 0.6）

### 3. hyper_responsibility (Q2)
- **原 tag**：`boundaries`（映射到 suppressed_needs）
- **修正為**：`limits`（映射到 hyper_responsibility，權重 0.7）
- **保留**：`people_pleasing`（權重 0.6）、`capacity`（權重 0.6）

### 4. fear_based_stability (Q0)
- **原 tag**：`change_readiness`（映射到 loss_of_agency）
- **修正為**：`fear_of_change`（映射到 fear_based_stability，權重 0.9）
- **保留**：`risk_aversion`（核心 tag，權重 1.0）、`status_quo`（權重 0.8）

### 5. suppressed_needs (Q0)
- **原 tag 1**：`people_pleasing`（映射到 hyper_responsibility）
- **修正為**：`conflict_avoidance`（映射到 suppressed_needs，權重 0.8）
- **原 tag 2**：`assertion`（映射到 loss_of_agency）
- **修正為**：`need_expression`（映射到 suppressed_needs，權重 0.9）
- **保留**：`self-care`（核心 tag，權重 1.0）

### 6. suppressed_needs (Q1)
- **原 tag**：`adaptation`（映射到 loss_of_agency）
- **修正為**：`self-care`（核心 tag，權重 1.0）
- **保留**：`need_expression`（權重 0.9）、`conflict_avoidance`（權重 0.8）

### 7. meaning_vacuum (Q2)
- **原 tag**：`direction`（映射到 identity_diffusion）
- **修正為**：`purpose_alignment`（核心 tag，權重 1.0）
- **保留**：`motivation`（權重 0.8）、`narrative`（權重 0.6）

---

## 驗證結果

### Build 狀態
- ✅ `npm run build`：PASS (650ms)
- ✅ 無 JSON 語法錯誤
- ✅ 無 schema 驗證錯誤

### Pattern Tag 驗證
- ✅ 所有 pattern tags 都映射回題目自己的 theme_id
- ⚠️ 有 18 題沒有包含權重 1.0 的核心 tag（但這不在本次修正範圍內，僅為觀察）
- ✅ 每題 pattern_tags 數量在 2~4 個之間

### Validation Warnings
- ⚠️ 無 validation warnings（僅有 build 時的動態導入警告，與本次修正無關）

---

## 修正後的 Pattern Tag 使用統計

### 各母題的 Pattern Tag 使用情況

| 母題 ID | 使用的 Pattern Tags | 核心 Tag（1.0） |
|---|---|---|
| chronic_depletion | overextension, self-prioritization, recovery, body_signals, pace, routine, planning | overextension |
| loss_of_agency | voice, decision-making, negotiation, adaptation, initiative, change_readiness, assertion, goal_setting | voice |
| hyper_responsibility | role_drift, control, shared_ownership, self-sacrifice, support_network, limits, people_pleasing, capacity | role_drift |
| fear_based_stability | risk_aversion, status_quo, fear_of_change, experimentation, safety_behaviors, learning, obligation, evidence_seeking | risk_aversion |
| identity_diffusion | external_validation, values_clarity, direction, alignment, autonomy, consistency, self_concept, expression, clarity | external_validation |
| suppressed_needs | self-care, need_expression, conflict_avoidance, self_assessment, boundaries, decision_habit | self-care |
| chronic_alertness | baseline_tension, somatic_state, safety_signal, hypervigilance, environment_scan, social_entry, flexibility, uncertainty_tolerance, control_needs | baseline_tension |
| unprocessed_loss | avoidance, emotional_regulation, triggers, generalization, risk_avoidance, decision_filter, processing, ritual, emotional_expression | 無（最高 0.8） |
| meaning_vacuum | purpose_alignment, task_quality, fulfillment, prioritization, external_drivers, values_alignment, motivation, narrative | purpose_alignment |
| self_erosion | values_tradeoff, compromise_habit, integrity, self_trust, confidence, external_influence, authenticity, social_fitting, energy | values_tradeoff |

---

## 產出檔案

1. ✅ `reports/pattern_tag_usage_audit.md` - 使用審計報告
2. ✅ `reports/pattern_tag_policy_v1.md` - 使用政策文件
3. ✅ `src/core/ontology/questionBank.v1.json` - 修正後的題庫

---

## 觀察事項

### 核心 Tag 分布
檢查發現有 18 題沒有包含權重 1.0 的核心 tag，但這不在本次修正範圍內（任務只要求修正 mismatch）。這些題目仍可正常計分，因為：
- 所有 tags 都正確映射回自己的 theme_id
- 每題都有 2~4 個 tags，涵蓋不同權重層級
- 計分系統會根據權重累積，不強制要求核心 tag

若未來需要優化，可考慮為這些題目補充核心 tag。

---

## 後續建議

1. **定期審計**：每次新增題目時，執行 `scripts/auditPatternTags.mjs` 確認無 mismatch
2. **政策遵守**：嚴格遵守 `pattern_tag_policy_v1.md` 的 Single Owner 政策
3. **核心 Tag 優化**（可選）：未來可考慮為沒有核心 tag 的題目補充權重 1.0 的 tag

---

**任務完成** ✅

