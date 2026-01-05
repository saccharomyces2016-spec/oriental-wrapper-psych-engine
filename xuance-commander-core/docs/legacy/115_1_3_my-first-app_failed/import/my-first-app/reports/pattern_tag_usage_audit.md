# Pattern Tag 使用審計報告

**生成時間**：2025-12-29  
**總題數**：30  
**總 Pattern Tag 使用次數**：90  
**OK 次數**：82  
**MISMATCH 次數**：8

---

## 1) OK：tag 映射 theme_id == 題目 theme_id

共 **82 次**正確匹配，涵蓋所有母題的核心 pattern tags。

### 各母題 OK 統計

| 母題 ID | OK 次數 | 主要使用的 Pattern Tags |
|---|---|---|
| chronic_depletion | 8 | overextension, recovery, body_signals, self-prioritization, pace, routine, planning |
| loss_of_agency | 7 | voice, decision-making, negotiation, adaptation, initiative, change_readiness, assertion, goal_setting |
| hyper_responsibility | 7 | role_drift, control, shared_ownership, self-sacrifice, support_network, limits, people_pleasing, capacity |
| fear_based_stability | 7 | risk_aversion, status_quo, experimentation, safety_behaviors, learning, fear_of_change, obligation, evidence_seeking |
| identity_diffusion | 9 | external_validation, values_clarity, direction, alignment, autonomy, consistency, self_concept, expression, clarity |
| suppressed_needs | 4 | self-care, need_expression, conflict_avoidance, self_assessment, boundaries, decision_habit |
| chronic_alertness | 9 | baseline_tension, somatic_state, safety_signal, hypervigilance, environment_scan, social_entry, flexibility, uncertainty_tolerance, control_needs |
| unprocessed_loss | 9 | avoidance, emotional_regulation, triggers, generalization, risk_avoidance, decision_filter, processing, ritual, emotional_expression |
| meaning_vacuum | 7 | purpose_alignment, task_quality, fulfillment, prioritization, external_drivers, values_alignment, motivation, narrative |
| self_erosion | 9 | values_tradeoff, compromise_habit, integrity, self_trust, confidence, external_influence, authenticity, social_fitting, energy |

---

## 2) MISMATCH：tag 映射到其他母題

共 **8 次**不匹配，詳情如下：

### MISMATCH 清單

| # | 題目母題 | 題目文字（前 80 字） | 使用的 Tag | 實際映射母題 | 題目索引 |
|---|---|---|---|---|---|
| 1 | chronic_depletion | When several people need you at once late in the day, how do you usually handle | **boundaries** | suppressed_needs | 0 |
| 2 | loss_of_agency | How do you respond when someone else sets deadlines or goals you feel are unreal | **boundaries** | suppressed_needs | 2 |
| 3 | hyper_responsibility | How do you feel about saying no when you are already at capacity? | **boundaries** | suppressed_needs | 2 |
| 4 | fear_based_stability | When offered an opportunity that could improve things but has uncertainty (new c | **change_readiness** | loss_of_agency | 0 |
| 5 | suppressed_needs | When you are exhausted or unwell, how do you handle commitments to others? | **people_pleasing** | hyper_responsibility | 0 |
| 6 | suppressed_needs | When you are exhausted or unwell, how do you handle commitments to others? | **assertion** | loss_of_agency | 0 |
| 7 | suppressed_needs | If a plan does not work for you (timing, budget, access), how do you respond? | **adaptation** | loss_of_agency | 1 |
| 8 | meaning_vacuum | When someone asks why you are pursuing your current path, what is your reaction? | **direction** | identity_diffusion | 2 |

---

## 3) Pattern Tag 使用矩陣（Usage Matrix）

以下列出所有被使用的 pattern tags，以及它們被哪些母題使用：

### 高風險 Tags（被多個母題使用，但只映射到一個母題）

| Pattern Tag | 映射母題 | 被使用的母題 | 使用次數 | 風險等級 |
|---|---|---|---|---|
| **boundaries** | suppressed_needs | chronic_depletion, loss_of_agency, hyper_responsibility, suppressed_needs | 4 | 🔴 高 |
| **adaptation** | loss_of_agency | loss_of_agency, suppressed_needs | 2 | 🟡 中 |
| **change_readiness** | loss_of_agency | loss_of_agency, fear_based_stability | 2 | 🟡 中 |
| **assertion** | loss_of_agency | loss_of_agency, suppressed_needs | 2 | 🟡 中 |
| **people_pleasing** | hyper_responsibility | hyper_responsibility, suppressed_needs | 2 | 🟡 中 |
| **direction** | identity_diffusion | identity_diffusion, meaning_vacuum | 2 | 🟡 中 |

### 單一母題專用 Tags（無風險）

其餘 75 個 pattern tags 都只被單一母題使用，且映射正確，無風險。

---

## 4) 統計摘要

### 各母題的 Mismatch 數量

| 母題 ID | Mismatch 數量 | 影響題數 |
|---|---|---|
| chronic_depletion | 1 | 1 |
| loss_of_agency | 1 | 1 |
| hyper_responsibility | 1 | 1 |
| fear_based_stability | 1 | 1 |
| suppressed_needs | 3 | 2 |
| meaning_vacuum | 1 | 1 |
| **總計** | **8** | **7** |

### 最嚴重的問題

1. **boundaries**：被 4 個母題使用，但只映射到 `suppressed_needs`，導致 3 個其他母題的題目無法正確計分
2. **suppressed_needs** 母題：有 3 個 mismatch，是所有母題中問題最多的

---

## 5) 建議修正方向

1. **boundaries**：應指定為 `suppressed_needs` 專用，其他母題改用替代 tags
2. **adaptation**：應指定為 `loss_of_agency` 專用，`suppressed_needs` 改用替代 tags
3. **change_readiness**：應指定為 `loss_of_agency` 專用，`fear_based_stability` 改用替代 tags
4. **assertion**：應指定為 `loss_of_agency` 專用，`suppressed_needs` 改用替代 tags
5. **people_pleasing**：應指定為 `hyper_responsibility` 專用，`suppressed_needs` 改用替代 tags
6. **direction**：應指定為 `identity_diffusion` 專用，`meaning_vacuum` 改用替代 tags

詳細的修正政策請參考 `pattern_tag_policy_v1.md`。



















