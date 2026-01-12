# P0-12 當前系統主題數量與定義驗證報告（最終確認）

**建立日期**：2026-01-12  
**驗證目的**：確認當前系統最新版本的第一階段設計（八個領域對應八卦），找出相關文件，確定主題數量  
**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）

---

## 一、關鍵文件位置（最終確認）

### 1.1 第一階段設計文件（最終版本）

**文件位置**：`P0-12_SCIENTIFIC_ENGINE_COMPLETION/P0-12_IMPLEMENTATION_SPEC_FINAL.md`

**文件標題**：P0-12 Legacy 整合工程實作規格書（最終版）

**文件狀態**：WORKING BASELINE（不鎖定，可回滾）

**來源**：顧問團最終提交（經嚴格審核後篩選組合）

**審核依據**：
- 嚴格比對 `domain/questions/stress_recovery.questions.v1.0.json`
- 嚴格比對 `domain/facets/stress_recovery.scoring.v1.0.json`
- 嚴格比對 `domain/manifests/stress_recovery.v1.0.json`
- 嚴格比對現有系統的實際結構和 schema

---

## 二、當前系統主題數量（最終確認）

### 2.1 第一階段設計：八個領域（Stage 1 入口）

**設計概念**：第一階段題目設計分成**八個領域**，對應八卦盤的八象

**主題數量**：**8 個領域**（不是 10 個主題）

**文件位置**：`P0-12_IMPLEMENTATION_SPEC_FINAL.md` 第一節「一、人生八大領域定義（Stage 1 入口）」

---

### 2.2 八大領域列表（最終確認）

根據 `P0-12_IMPLEMENTATION_SPEC_FINAL.md`，當前系統正式採用之**人生八大領域（Domains）**：

| Domain ID | 領域核心（Facet ID） | 系統定位 |
|-----------|---------------------|---------|
| D1 | `chronic_depletion` | 能量與承載狀態 |
| D2 | `chronic_alertness` | 生存警戒與安全 |
| D3 | `fear_based_stability` | 停滯與改變阻力 |
| D4 | `hyper_responsibility` | 角色與責任過載 |
| D5 | `identity_diffusion` | 自我認同與方向 |
| D6 | `loss_of_agency` | 行動力與主控感 |
| D7 | `meaning_vacuum` | 價值與動機 |
| D8 | `suppressed_needs` | 需求與情感表達 |

**總數**：**8 個領域**

---

### 2.3 補充說明

根據 `P0-12_IMPLEMENTATION_SPEC_FINAL.md` 第 1.2 節：

- `self_erosion`、`unprocessed_loss` **本階段不作為第一關領域**
- 保留為母題層（motherThemes）或後續六十四卦敘事延伸

---

## 三、Legacy 資料的定位（明確說明）

### 3.1 Legacy 資料的用途

**明確說明**：
- ❌ Legacy 資料**不是**當前系統的準則
- ✅ Legacy 資料**僅用於補充**和參考
- ✅ 當前系統應以**最新版本設計文件**為準

### 3.2 Legacy 系統的主題數量

**Legacy 系統主題總數**：10 個主題（來自 guidancePrinciples.v1.json）

**Legacy 主題列表**：
1. `chronic_alertness`
2. `chronic_depletion`
3. `fear_based_stability`
4. `hyper_responsibility`
5. `identity_diffusion`
6. `loss_of_agency`
7. `meaning_vacuum`
8. `self_erosion`
9. `suppressed_needs`
10. `unprocessed_loss`

**說明**：
- 這些主題**僅作為參考和補充資料**
- **不是**當前系統應該使用的主題列表
- 當前系統已將 10 個主題收斂為 **8 個領域**

---

## 四、當前系統 vs Legacy 系統對比

### 4.1 主題數量對比

| 系統 | 主題/領域數量 | 說明 |
|------|--------------|------|
| **當前系統（最新版本）** | **8 個領域** | 經過顧問群討論後的最終版本 |
| Legacy 系統 | 10 個主題 | 僅作為參考和補充資料 |

### 4.2 主題/領域列表對比

**當前系統（8 個領域）**：
1. `chronic_depletion` ✅
2. `chronic_alertness` ✅
3. `fear_based_stability` ✅
4. `hyper_responsibility` ✅
5. `identity_diffusion` ✅
6. `loss_of_agency` ✅
7. `meaning_vacuum` ✅
8. `suppressed_needs` ✅

**Legacy 系統（10 個主題，不採用為領域）**：
1. `chronic_depletion` → 已採用為 D1
2. `chronic_alertness` → 已採用為 D2
3. `fear_based_stability` → 已採用為 D3
4. `hyper_responsibility` → 已採用為 D4
5. `identity_diffusion` → 已採用為 D5
6. `loss_of_agency` → 已採用為 D6
7. `meaning_vacuum` → 已採用為 D7
8. `suppressed_needs` → 已採用為 D8
9. `self_erosion` → **不作為第一關領域**（保留為母題層）
10. `unprocessed_loss` → **不作為第一關領域**（保留為母題層）

---

## 五、步驟四任務範圍修正（最終確認）

### 5.1 需要整合的領域

**總數**：**8 個領域**（不是 9 個或 10 個）

**領域列表**：
1. `chronic_depletion`（部分整合，3/5 文件）
2. `chronic_alertness`（未整合）
3. `fear_based_stability`（未整合）
4. `hyper_responsibility`（未整合）
5. `identity_diffusion`（未整合）
6. `loss_of_agency`（未整合）
7. `meaning_vacuum`（未整合）
8. `suppressed_needs`（未整合）

### 5.2 整合狀態

- **已整合（部分）**：1 個領域（`chronic_depletion`，3/5 文件）
- **未整合**：7 個領域

---

## 六、文件分類方式（確認）

### 6.1 每個領域需要的文件（標準配置）

每個領域需要以下 **5 個核心文件**：

1. **`domain/questions/<facetId>.questions.v1.0.json`** - 題目定義
2. **`domain/facets/<facetId>.scoring.v1.0.json`** - 計分邏輯
3. **`domain/narratives/<facetId>.narr.v1.0.json`** - 敘事文本（L2/L3 層）
4. **`domain/recommendations/<facetId>.reco.v1.0.json`** - 建議文本（L4 層）
5. **`domain/riskchains/<facetId>.risk.v1.0.json`** - 風險鏈文本（L4 層）

**可選文件**：
6. **`domain/manifests/<facetId>.v1.0.json`** - Manifest 文件（可選）

---

## 七、總結

### 7.1 最終確認結果

- **當前系統主題數量**：**8 個領域**（不是 10 個主題）
- **關鍵文件位置**：`P0-12_SCIENTIFIC_ENGINE_COMPLETION/P0-12_IMPLEMENTATION_SPEC_FINAL.md`
- **文件狀態**：WORKING BASELINE（不鎖定，可回滾）
- **來源**：顧問團最終提交（經嚴格審核後篩選組合）

### 7.2 Legacy 資料定位

- ❌ Legacy 資料**不是**當前系統的準則
- ✅ Legacy 資料**僅用於補充**和參考
- ✅ 當前系統應以**最新版本設計文件**（`P0-12_IMPLEMENTATION_SPEC_FINAL.md`）為準

### 7.3 步驟四任務範圍

- **需要整合的領域數量**：**8 個領域**
- **已整合（部分）**：1 個領域（`chronic_depletion`）
- **未整合**：7 個領域

---

**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）  
**最後更新**：2026-01-12  
**狀態**：✅ **最終確認完成**
