# 任務包 5：角色原型參數矩陣決策包

**建立日期**：2026-01-13  
**執行對象**：Gemini（顧問）  
**狀態**：等待裁示  
**優先級**：MEDIUM

---

## 📋 任務目標

評估是否需要引入完整的角色原型參數矩陣。

---

## ❓ 問題描述

**現狀**：
- CONSTITUTION V4 Section 5.1 提到「Role Archetype（可選或弱必填）：用於調整 `volatility_thresholds`」
- 但沒有具體的角色定義和參數矩陣
- Gemini 方案提供完整的 4 個角色原型（開拓者、守成者、謀略者、工匠）和參數矩陣

**問題**：
- 為什麼選擇這 4 個角色原型？是否有遺漏？
- 參數值（`volatility_thresholds` 和 `rigidity_weight`）的設定依據是什麼？
- 如何處理使用者不選擇角色的情況？（使用預設值？）
- 是否需要建立 ADR 記錄此決策？

---

## 📚 背景資料

### CONSTITUTION V4 規格

**檔案位置**：
- `docs/ops/analysis/ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL_V4.md` - CONSTITUTION V4 規格

**現有規格**：
- Section 5.1：Role Archetype（可選或弱必填）
- 提到「用於調整 `volatility_thresholds`」
- 但沒有具體的角色定義和參數矩陣

### V3 引擎實作

**檔案位置**：
- `engine/score_facet.py` - V3 引擎實作

**現有參數**：
- `volatility_thresholds`: `[0.15, 0.35]`（預設）
- `rigidity_weight`: `0.10`（預設）
- `rigidity_frozen_threshold`: `0.70`（預設）
- `volatility_stddev_mode`: `"sample"`（預設）
- `rigidity_default_when_missing`: `0.0`（預設）

**注意**：
- 現有實作沒有角色參數矩陣
- 所有 Facet 使用統一的參數值

### UI 整合規範

**檔案位置**：
- `specs/integration/ui_engine/FRONTEND_BACKEND_CALCULATION_ALIGNMENT.md` - UI 整合規範

**現有設計**：
- 沒有角色選擇器的設計
- 沒有角色參數的傳遞機制

### Gemini 追問包

**檔案位置**：
- `docs/task_packets/advisor/GEMINI_CONSTITUTION_QUESTIONS.md` - Gemini 追問包

**追問內容**：
- 追問 2：角色原型參數矩陣
- 提供選項 A/B/C 和建議

---

## 🎯 選項分析

### 選項 A：採納 4 個角色原型，建立 ADR，更新實作

**理由**：
- 更精準的個人化調整
- 符合「準到發毛」的目標
- 提供更完整的個人化體驗

**代價**：
- 需要建立 ADR
- 需要定義角色原型
- 需要建立參數矩陣
- 需要更新 UI（角色選擇器）
- 需要驗證參數值的合理性
- 需要更新引擎實作

**需要執行的行動**：
1. 定義 4 個角色原型（開拓者、守成者、謀略者、工匠）
2. 建立參數矩陣（每個角色的 `volatility_thresholds` 和 `rigidity_weight`）
3. 建立 ADR 記錄此決策
4. 更新 `engine/score_facet.py`（加入角色參數的處理邏輯）
5. 更新 UI（加入角色選擇器）
6. 驗證參數值的合理性

---

### 選項 B：暫時不採納，先驗證是否需要角色原型

**理由**：
- 現有系統已能運作
- 避免過度複雜化
- 可以先驗證是否需要角色原型

**代價**：
- 可能無法提供個人化調整
- 所有使用者使用統一的參數值

**需要執行的行動**：
- 維持現有設計
- 記錄此決策（可選）

---

### 選項 C：採納但簡化（例如：只調整 `volatility_thresholds`，不調整 `rigidity_weight`）

**理由**：
- 平衡個人化和複雜度
- 可以提供部分個人化調整，但不會過度複雜化

**代價**：
- 功能較不完整
- 可能無法達到「準到發毛」的目標

**需要執行的行動**：
1. 定義簡化版角色原型（只調整 `volatility_thresholds`）
2. 建立 ADR 記錄此決策
3. 更新 `engine/score_facet.py`（加入角色參數的處理邏輯，但只調整 `volatility_thresholds`）
4. 更新 UI（加入角色選擇器）

---

## 🔍 需要評估的問題

### 問題 1：為什麼選擇這 4 個角色原型？

**Gemini 方案的角色原型**：
- 開拓者（Pioneer）
- 守成者（Keeper）
- 謀略者（Strategist）
- 工匠（Artisan）

**需要評估**：
- 這 4 個角色原型是否足夠覆蓋所有使用者？
- 是否有遺漏的角色原型？
- 角色原型的定義是否合理？

---

### 問題 2：參數值的設定依據是什麼？

**Gemini 方案的參數矩陣**（範例）：
- 開拓者：`volatility_thresholds: [0.20, 0.40]`, `rigidity_weight: 0.12`
- 守成者：`volatility_thresholds: [0.10, 0.25]`, `rigidity_weight: 0.08`
- 謀略者：`volatility_thresholds: [0.15, 0.35]`, `rigidity_weight: 0.10`
- 工匠：`volatility_thresholds: [0.18, 0.38]`, `rigidity_weight: 0.11`

**需要評估**：
- 這些參數值的設定依據是什麼？
- 是否有實際數據支持這些參數值？
- 參數值的差異是否合理？

---

### 問題 3：如何處理使用者不選擇角色的情況？

**選項**：
- 使用預設值（統一的參數值）
- 強制要求選擇角色
- 根據其他資料推斷角色（例如：DOB、回答模式等）

**需要評估**：
- 哪個選項最合理？
- 如何平衡個人化和使用者體驗？

---

### 問題 4：是否需要建立 ADR？

**根據 CHARTER Section 3**：
- 任何結構性變更必須 ADR + 使用者批准
- 角色參數矩陣是結構性變更

**需要評估**：
- 是否需要建立 ADR 記錄此決策？
- ADR 的內容應該包含什麼？

---

## 📝 建議的裁示選項

**建議選項**：選項 A（採納 4 個角色原型）

**理由**：
- 符合「準到發毛」的目標
- 個人化調整能提升使用者體驗
- 但需要建立 ADR 記錄此決策

---

## ✅ 驗收標準

### 必須完成

1. ✅ 決策已做出（選項 A/B/C）
2. ✅ 如果採用選項 A 或 C，ADR 已建立
3. ✅ 如果採用選項 A 或 C，角色原型已定義
4. ✅ 如果採用選項 A 或 C，參數矩陣已建立
5. ✅ 如果採用選項 A 或 C，引擎實作已更新

### 建議完成

6. ✅ 如果採用選項 A 或 C，UI 已更新（角色選擇器）
7. ✅ 如果採用選項 A 或 C，參數值的合理性已驗證
8. ✅ 如果採用選項 B，決策已記錄

---

## 📦 交付物

完成後應產出：
1. ✅ 決策報告（選項 A/B/C 的選擇和理由）
2. ✅ 如果採用選項 A 或 C：
   - ADR 文件（`docs/adr/ADR_XXXX_role_archetype_parameters.md`）
   - 角色原型定義文件（`domain/knowledge_base/role_archetypes.v1.0.json`）
   - 參數矩陣配置檔（`domain/knowledge_base/role_archetype_parameters.v1.0.json`）
   - 更新的 `engine/score_facet.py`
   - UI 設計文件（角色選擇器）
3. ✅ 如果採用選項 B：
   - 決策記錄（可選）

---

**建立日期**：2026-01-13  
**執行對象**：Gemini（顧問）  
**狀態**：等待裁示
