# Legacy 主題對應關係表

**建立日期**：2026-01-12  
**目的**：建立 Legacy 系統主題 key → 13 個主題的對應關係  
**文件狀態**：WORKING DOCUMENT（持續更新）

---

## 一、chains.json 和 interventions.json 主題對應

### 1.1 Legacy 主題 key → 13 個主題對應

| Legacy 主題 key | 中文標籤 | 對應的 13 個主題 | 說明 |
|----------------|---------|----------------|------|
| `control_need` | 控制與失控恐懼 | `fear_based_stability`、`loss_of_agency` | 控制需求相關 |
| `attachment_insecurity` | 關係安全感缺口 | `emotional_permeability`、`social_comparison` | 關係安全感相關 |
| `avoidance_procrastination` | 逃避與拖延迴圈 | `avoidance_coping`、`fear_based_stability` | 逃避相關 |
| `commitment_anxiety` | 承諾與未來焦慮 | `fear_based_stability`、`loss_of_agency` | 承諾焦慮相關 |
| `burnout_overload` | 過載與耗竭風險 | `chronic_depletion`、`hyper_responsibility` | 耗竭相關 |

---

## 二、anchor_statements 主題對應

### 2.1 Legacy mother_theme → 13 個主題對應

| Legacy mother_theme | 對應的 13 個主題 | 說明 |
|-------------------|----------------|------|
| `control_vs_exhaustion` | `chronic_depletion`、`hyper_responsibility` | 控制與耗竭 |
| `avoidance_stagnation` | `avoidance_coping`、`fear_based_stability` | 逃避與停滯 |
| `attachment_insecurity` | `emotional_permeability`、`social_comparison` | 關係安全感 |
| `chronic_depletion` | `chronic_depletion` | 直接對應 |
| `identity_diffusion` | `identity_diffusion` | 直接對應 |

---

## 三、ContentDB 領域 → 主題對應

### 3.1 領域對應關係

| ContentDB 領域 | 可能對應的主題 | 說明 |
|---------------|--------------|------|
| `self` | `chronic_depletion`、`hyper_responsibility`、`suppressed_needs`、`identity_diffusion` | 自我相關 |
| `health` | `chronic_depletion`、`chronic_alertness` | 健康相關 |
| `relationship` | `emotional_permeability`、`social_comparison` | 關係相關 |
| `family` | `hyper_responsibility`、`suppressed_needs` | 家庭相關 |
| `career` | `chronic_depletion`、`loss_of_agency`、`fear_based_stability` | 職業相關 |
| `money` / `finance` | `fear_based_stability`、`loss_of_agency` | 財務相關 |
| `social` | `social_comparison`、`emotional_permeability` | 社交相關 |
| `study` | `loss_of_agency`、`fear_based_stability`、`meaning_vacuum` | 學習相關 |
| `love` | `emotional_permeability`、`social_comparison` | 愛情相關 |

---

## 四、consequence_chain_library 對應

### 4.1 後果鏈 → 主題對應

| 後果鏈 ID | 對應的主題 | 說明 |
|----------|----------|------|
| `chain_chronic_stress` | `chronic_depletion`、`chronic_alertness` | 長期壓力 |
| `chain_avoidance_loop` | `avoidance_coping`、`fear_based_stability` | 逃避迴圈 |
| `chain_relationship_pattern` | `social_comparison`、`emotional_permeability` | 關係模式 |

---

**文件狀態**：WORKING DOCUMENT（持續更新）  
**最後更新**：2026-01-12  
**下一步**：使用此對應關係提取剩餘內容
