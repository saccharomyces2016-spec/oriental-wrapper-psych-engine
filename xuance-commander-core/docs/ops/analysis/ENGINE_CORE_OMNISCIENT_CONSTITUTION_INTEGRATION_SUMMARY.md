# ENGINE_CORE_OMNISCIENT_CONSTITUTION 整合總結

**整合日期**：2026-01-12  
**整合文件**：`ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md`  
**整合狀態**：✅ 合格部分已整合，追問包已建立

---

## 📋 整合摘要

### 整體評估

**狀態**：✅ **高度合格，部分需要微調和補強**

**合格部分**（已整合到 SSOT）：
- ✅ 八大領域覆蓋方案 → `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 0.3（已更新）
- ✅ 題目設計聖典 → `domain/knowledge_base/question_design_guidelines.v1.0.md`（已補強）
- ✅ V3 運算引擎核心 → `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 3（已補強）
- ✅ 跨域擴散引擎 → `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 4.2（已補強）
- ✅ 使用者背景資料策略 → `specs/ui/architecture/P0-5_UI_ARCHITECTURE.md` Layer 1（已補強）
- ✅ P0-4.5 Funnel 整合 → `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 1（已補強）
- ✅ UI/Engine 契約 → `specs/integration/ui_engine/FRONTEND_BACKEND_CALCULATION_ALIGNMENT.md`（已補強）
- ✅ 風險鏈結構 → `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 4.1（已補強）

**需要微調和補強的部分**（已建立追問包）：
- ⚠️ Domain element 儲存結構（需要建立新的 domain 配置文件）
- ⚠️ 缺失 Priors 的 Rigidity 預設值（與 DIRECTIVE REV.B 不一致）
- ⚠️ 10 題擴展模板的 Schema 擴充（需要更新 schema）
- ⚠️ 標準差模式的 ADR 更新（需要更新 ADR_0005）
- ⚠️ 衍生問題：世界級水準的增強建議

---

## ✅ 已整合的內容

### 1. 八大領域覆蓋方案

**整合位置**：`specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 0.3

**整合內容**：
- 完整的八大領域映射表（包含 Domain Key、5-Element、MVP 核心 Facet）
- 硬性規則（可驗收）
- 中宮（Chaos Routing）策略

**更新日期**：2026-01-12

---

### 2. 題目設計聖典

**整合位置**：`domain/knowledge_base/question_design_guidelines.v1.0.md` Section 4

**整合內容**：
- 題數規範（允許 6-10 題彈性，預設 8 題）
- 8 題標準模板（3+2+2+1）
- 10 題擴展模板（3+2+3+2）
- 權重基準（推薦）

**更新日期**：2026-01-12

---

### 3. V3 運算引擎核心

**整合位置**：`specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 3

**整合內容**：
- Rigidity 三層計算公式（DIRECTIVE REV.B）
- 正規化規則（DIRECTIVE REV.B）
- Volatility 計算（DIRECTIVE REV.C+）
- Final Score 融合公式
- Flags（狀態旗標）
- Params 預設值
- Debug Payload 完整結構

**更新日期**：2026-01-12

---

### 4. 跨域擴散引擎

**整合位置**：`specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 4.2

**整合內容**：
- 觸發條件（`final_score > 0.80`）
- 矩陣策略（動態計算 + 顯式覆寫表）
- 詞彙治理（必須通過詞彙檢查）
- 實作架構（獨立模組 `engine/cascade_calculator.py`）
- 介面（Contract）
- Anti-Spam 規則

**更新日期**：2026-01-12

---

### 5. 使用者背景資料策略

**整合位置**：`specs/ui/architecture/P0-5_UI_ARCHITECTURE.md` Layer 1

**整合內容**：
- 混合策略（Role Archetype + 出生年月日）
- 兩套系統整合（獨立、互不影響）
- 隱私與存留策略

**更新日期**：2026-01-12

---

### 6. P0-4.5 Funnel 整合

**整合位置**：`specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 1

**整合內容**：
- Priors Contract（SSOT）
- 缺失 Priors 的處理策略

**更新日期**：2026-01-12

---

### 7. UI/Engine 契約

**整合位置**：`specs/integration/ui_engine/FRONTEND_BACKEND_CALCULATION_ALIGNMENT.md`

**整合內容**：
- 權威來源定義
- 對齊機制要求

**更新日期**：2026-01-12

---

### 8. 風險鏈結構

**整合位置**：`specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 4.1

**整合內容**：
- L1/L2/L3 結構定義
- 與 A/B Framework 的關係
- Cascade warning 與本體描述的區分

**更新日期**：2026-01-12

---

## ⚠️ 待解決的問題（追問包）

### 追問 1：Domain Element 儲存結構（PRIORITY: HIGH）

**問題**：
1. 是否需要建立新的 `domain/domains/*.domain.v1.0.json` 結構？
2. 如何在 Facet manifest 中引用 Domain Key？
3. Domain element 的 Schema 如何定義？

**追問包位置**：`docs/task_packets/advisor/ENGINE_CORE_OMNISCIENT_CONSTITUTION_QUESTIONS.md` Section 2.1

---

### 追問 2：缺失 Priors 的 Rigidity 預設值（PRIORITY: MEDIUM）

**問題**：
1. 缺失 Priors 時，Rigidity 的預設值應該是 0 還是 0.50？
2. 如果採用 0.50，是否需要建立 ADR 說明原因？

**追問包位置**：`docs/task_packets/advisor/ENGINE_CORE_OMNISCIENT_CONSTITUTION_QUESTIONS.md` Section 2.2

---

### 追問 3：10 題擴展模板的 Schema 擴充（PRIORITY: MEDIUM）

**問題**：
1. 是否需要更新 `compiled_facet.schema.json` 和 `domain_manifest.schema.json`？
2. `scoring.question_set` 欄位的預設值是什麼？

**追問包位置**：`docs/task_packets/advisor/ENGINE_CORE_OMNISCIENT_CONSTITUTION_QUESTIONS.md` Section 2.3

---

### 追問 4：標準差模式的 ADR 更新（PRIORITY: LOW）

**問題**：
1. 是否需要更新 ADR_0005，新增標準差模式的決策記錄？

**追問包位置**：`docs/task_packets/advisor/ENGINE_CORE_OMNISCIENT_CONSTITUTION_QUESTIONS.md` Section 2.4

---

### 追問 5：世界級水準增強建議（PRIORITY: MEDIUM）

**問題**：
1. 是否需要建立多語言本地化策略？
2. 是否需要建立文化適應性策略？
3. 是否需要建立可訪問性規範？
4. 是否需要建立效能與擴展性策略？
5. 是否需要建立數據隱私與合規策略？

**追問包位置**：`docs/task_packets/advisor/ENGINE_CORE_OMNISCIENT_CONSTITUTION_QUESTIONS.md` Section 2.5

---

## 📦 交付物

1. ✅ **審核報告**：`docs/ops/analysis/ENGINE_CORE_OMNISCIENT_CONSTITUTION_AUDIT.md`
2. ✅ **追問包**：`docs/task_packets/advisor/ENGINE_CORE_OMNISCIENT_CONSTITUTION_QUESTIONS.md`
3. ✅ **ZIP 打包檔案**：`tmp/ENGINE_CORE_OMNISCIENT_CONSTITUTION_PACKAGE_20260112_220831.zip`（78KB，21 個文件）
4. ✅ **整合總結**：本文件

---

## 📝 已更新的 SSOT 文件

1. ✅ `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` - 引擎核心邏輯規格（已更新多個 Section）
2. ✅ `domain/knowledge_base/question_design_guidelines.v1.0.md` - 題目設計指南（已補強）
3. ✅ `specs/ui/architecture/P0-5_UI_ARCHITECTURE.md` - UI 架構設計（已補強 Layer 1）
4. ✅ `specs/integration/ui_engine/FRONTEND_BACKEND_CALCULATION_ALIGNMENT.md` - 前後端對齊規範（已補強）
5. ✅ `docs/ops/TASK_RECORDS_SUMMARY.md` - 任務記錄總覽（已更新）
6. ✅ `docs/ops/TASK_STATUS.md` - 任務狀態總覽（已更新）
7. ✅ `memory/changes/CHANGELOG.md` - 變更記錄（已更新）

---

## 🎯 下一步行動

1. **等待裁示**：等待使用者對追問包的回應
2. **後續整合**：根據裁示結果，完成剩餘部分的整合
3. **世界級增強**：考慮實施世界級水準增強建議

---

**整合者**：Cursor（總指揮）  
**整合日期**：2026-01-12
