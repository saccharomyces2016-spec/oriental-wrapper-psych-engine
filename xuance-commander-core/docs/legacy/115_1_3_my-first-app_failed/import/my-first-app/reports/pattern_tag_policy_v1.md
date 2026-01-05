# Pattern Tag 使用政策 v1

**生效日期**：2025-12-29  
**目的**：確保每個 pattern tag 只映射到單一母題，避免計分混亂

---

## 高風險 Pattern Tags 的 Single Owner 政策

以下 6 個 pattern tags 被多個母題使用，但只映射到一個母題，造成計分不準確。現指定為 **Single Owner** 政策。

### 1. boundaries

**Single Owner**：`suppressed_needs`  
**映射權重**：0.7  
**當前問題**：被 4 個母題使用（chronic_depletion, loss_of_agency, hyper_responsibility, suppressed_needs）

**替代 Tag 建議**：
- `chronic_depletion` 需要「邊界」概念 → 使用 `self-prioritization`（權重 0.6）或 `recovery`（權重 0.8）
- `loss_of_agency` 需要「邊界」概念 → 使用 `assertion`（權重 0.7）或 `limits`（權重 0.7，但映射到 hyper_responsibility，需確認）
- `hyper_responsibility` 需要「邊界」概念 → 使用 `limits`（權重 0.7，映射到 hyper_responsibility）或 `capacity`（權重 0.6）

**修正規則**：只有 `suppressed_needs` 母題的題目可以使用 `boundaries` tag。

---

### 2. adaptation

**Single Owner**：`loss_of_agency`  
**映射權重**：0.6  
**當前問題**：被 2 個母題使用（loss_of_agency, suppressed_needs）

**替代 Tag 建議**：
- `suppressed_needs` 需要「適應」概念 → 使用 `conflict_avoidance`（權重 0.8，映射到 suppressed_needs）或 `adjust_strategy`（behavior facet，非 pattern tag）

**修正規則**：只有 `loss_of_agency` 母題的題目可以使用 `adaptation` tag。

---

### 3. change_readiness

**Single Owner**：`loss_of_agency`  
**映射權重**：0.6  
**當前問題**：被 2 個母題使用（loss_of_agency, fear_based_stability）

**替代 Tag 建議**：
- `fear_based_stability` 需要「改變準備度」概念 → 使用 `fear_of_change`（權重 0.9，映射到 fear_based_stability）或 `risk_aversion`（權重 1.0，映射到 fear_based_stability）

**修正規則**：只有 `loss_of_agency` 母題的題目可以使用 `change_readiness` tag。

---

### 4. assertion

**Single Owner**：`loss_of_agency`  
**映射權重**：0.7  
**當前問題**：被 2 個母題使用（loss_of_agency, suppressed_needs）

**替代 Tag 建議**：
- `suppressed_needs` 需要「主張」概念 → 使用 `need_expression`（權重 0.9，映射到 suppressed_needs）或 `self-care`（權重 1.0，映射到 suppressed_needs）

**修正規則**：只有 `loss_of_agency` 母題的題目可以使用 `assertion` tag。

---

### 5. people_pleasing

**Single Owner**：`hyper_responsibility`  
**映射權重**：0.6  
**當前問題**：被 2 個母題使用（hyper_responsibility, suppressed_needs）

**替代 Tag 建議**：
- `suppressed_needs` 需要「討好他人」概念 → 使用 `conflict_avoidance`（權重 0.8，映射到 suppressed_needs）或 `self-sacrifice`（權重 0.9，但映射到 hyper_responsibility，需確認）

**修正規則**：只有 `hyper_responsibility` 母題的題目可以使用 `people_pleasing` tag。

---

### 6. direction

**Single Owner**：`identity_diffusion`  
**映射權重**：0.8  
**當前問題**：被 2 個母題使用（identity_diffusion, meaning_vacuum）

**替代 Tag 建議**：
- `meaning_vacuum` 需要「方向」概念 → 使用 `purpose_alignment`（權重 1.0，映射到 meaning_vacuum）或 `motivation`（權重 0.8，映射到 meaning_vacuum）或 `narrative`（權重 0.6，映射到 meaning_vacuum）

**修正規則**：只有 `identity_diffusion` 母題的題目可以使用 `direction` tag。

---

## 修正規則總覽

### 核心原則

1. **每個 pattern tag 只能被一個母題使用**（Single Owner）
2. **每個母題的題目必須使用「映射回自己」的 pattern tags**
3. **每題 pattern_tags 保留 2~4 個，至少包含 1 個該母題的 1.0 核心 tag**

### 修正步驟

1. 識別所有 mismatch 的題目
2. 將 mismatch 的 tag 替換為該母題可用的替代 tag
3. 確保每題至少有一個權重 1.0 的核心 tag
4. 驗證所有 tags 都映射回題目的 theme_id

---

## 各母題可用的 Pattern Tags 清單

### chronic_depletion
- **核心 tag（權重 1.0）**：`overextension`
- **高權重 tags（≥0.8）**：`recovery`, `body_signals`
- **其他可用 tags**：`self-prioritization`, `pace`, `routine`, `planning`
- **禁止使用**：`boundaries`（改用 `self-prioritization` 或 `recovery`）

### loss_of_agency
- **核心 tag（權重 1.0）**：`voice`
- **高權重 tags（≥0.8）**：`decision-making`, `negotiation`
- **其他可用 tags**：`adaptation`, `initiative`, `change_readiness`, `assertion`, `goal_setting`
- **禁止使用**：`boundaries`（改用 `assertion`）

### hyper_responsibility
- **核心 tag（權重 1.0）**：`role_drift`
- **高權重 tags（≥0.8）**：`control`, `self-sacrifice`
- **其他可用 tags**：`shared_ownership`, `support_network`, `limits`, `people_pleasing`, `capacity`
- **禁止使用**：`boundaries`（改用 `limits` 或 `capacity`）

### fear_based_stability
- **核心 tag（權重 1.0）**：`risk_aversion`
- **高權重 tags（≥0.8）**：`status_quo`, `fear_of_change`
- **其他可用 tags**：`experimentation`, `safety_behaviors`, `learning`, `obligation`, `evidence_seeking`
- **禁止使用**：`change_readiness`（改用 `fear_of_change` 或 `risk_aversion`）

### identity_diffusion
- **核心 tag（權重 1.0）**：`external_validation`
- **高權重 tags（≥0.8）**：`values_clarity`, `direction`, `self_concept`
- **其他可用 tags**：`alignment`, `autonomy`, `consistency`, `expression`, `clarity`
- **禁止使用**：無（所有 tags 都正確映射）

### suppressed_needs
- **核心 tag（權重 1.0）**：`self-care`
- **高權重 tags（≥0.8）**：`need_expression`, `conflict_avoidance`, `boundaries`
- **其他可用 tags**：`self_assessment`, `decision_habit`
- **禁止使用**：`people_pleasing`（改用 `conflict_avoidance`）、`assertion`（改用 `need_expression`）、`adaptation`（改用 `conflict_avoidance`）

### chronic_alertness
- **核心 tag（權重 1.0）**：`baseline_tension`
- **高權重 tags（≥0.8）**：`somatic_state`, `hypervigilance`, `environment_scan`
- **其他可用 tags**：`safety_signal`, `social_entry`, `flexibility`, `uncertainty_tolerance`, `control_needs`
- **禁止使用**：無（所有 tags 都正確映射）

### unprocessed_loss
- **核心 tag（權重 1.0）**：無（最高權重 0.8）
- **高權重 tags（≥0.8）**：`avoidance`, `triggers`
- **其他可用 tags**：`emotional_regulation`, `generalization`, `risk_avoidance`, `decision_filter`, `processing`, `ritual`, `emotional_expression`
- **禁止使用**：無（所有 tags 都正確映射）

### meaning_vacuum
- **核心 tag（權重 1.0）**：`purpose_alignment`
- **高權重 tags（≥0.8）**：`fulfillment`, `values_alignment`, `motivation`
- **其他可用 tags**：`task_quality`, `prioritization`, `external_drivers`, `narrative`
- **禁止使用**：`direction`（改用 `purpose_alignment` 或 `motivation`）

### self_erosion
- **核心 tag（權重 1.0）**：`values_tradeoff`
- **高權重 tags（≥0.8）**：`compromise_habit`, `integrity`, `self_trust`, `authenticity`
- **其他可用 tags**：`confidence`, `external_influence`, `social_fitting`, `energy`
- **禁止使用**：無（所有 tags 都正確映射）

---

## 驗證清單

修正後，請確認：

- [ ] 所有題目的 pattern_tags 都映射回自己的 theme_id
- [ ] 每個母題的題目至少包含 1 個權重 1.0 的核心 tag
- [ ] 每題 pattern_tags 數量在 2~4 個之間
- [ ] 沒有使用被禁止的 tags
- [ ] `npm run build` 通過
- [ ] 沒有 validation warnings



















