# ENGINE_CORE_OMNISCIENT_CONSTITUTION_V4 追問包（精簡版）

**建立日期**：2026-01-13  
**狀態**：OPEN  
**用途**：精簡版追問包，便於 Gemini 處理

---

## 📋 快速背景

**專案目標**：
- 世界級水準、國際市場、全文化、全年齡
- 核心引擎可審計；外層以東方命理敘事呈現

**當前狀態**：
- V4 引擎實作已完成（`engine/score_facet.py`）
- Schema 已更新（domainKey/questionSet/scoringModel）
- Volatility 標準差模式已明確為 sample stddev

---

## ❓ 關鍵追問問題（4 個）

### 追問 1：缺失 Priors 的 Rigidity 預設值（PRIORITY: HIGH）

**問題**：三個地方對缺失 Priors 的 Rigidity 預設值不一致：

- **DIRECTIVE REV.B Section 1.2**：`return 0.0`（實際內容）
- **CONSTITUTION Section 7.2**：`rigidity_default_when_missing = 0.50`（MIXED default）
- **engine/score_facet.py**：`default_when_missing` 參數預設值是 `0.5`
- **GPT V4 聲稱**：最終裁示為 0.50（MIXED default），與 REV.B 一致
- **實際檢查結果**：GPT V4 的說法與 DIRECTIVE REV.B 的實際內容不一致

**選項**：
- **選項 A**：採用 0.0（符合 DIRECTIVE REV.B 的實際內容）
  - 理由：DIRECTIVE REV.B 是技術裁示文件，具有更高的權威性；缺失 Priors 時，不應該假設使用者的歸因模式；0.0 是最安全的預設值（避免誤判）
- **選項 B**：採用 0.50（符合 CONSTITUTION 和 GPT V4 的裁示）
  - 理由：CONSTITUTION 是最新的整合規格；0.50 代表「混合歸因」，是一個中性的假設；符合「缺失資訊時使用中等風險」的保守策略；但需要建立 ADR 說明為何改為 0.50，並更新 DIRECTIVE REV.B

**需要執行的行動**：
- 如果採用 0.0：更新 CONSTITUTION Section 7.2 和 engine/score_facet.py
- 如果採用 0.50：建立 ADR 說明為何改為 0.50，並更新 DIRECTIVE REV.B

---

### 追問 2：Domain Schema 定義（PRIORITY: MEDIUM）

**問題**：是否需要建立 `schemas/domain.schema.json` 來定義 Domain 配置文件的結構？

**現狀**：
- 已有 JSON 範例：`domain/domains/bagua.domain_map.v1.0.json`
- 沒有 Schema 定義
- GPT V4 聲稱「已完成」，但實際上只有 JSON 範例，沒有 Schema 定義

**選項**：
- **選項 A**：建立完整的 Domain Schema
  - 理由：符合 SSOT 原則；完整的 Schema 定義可以確保數據一致性；便於驗證和維護
- **選項 B**：不需要，使用 JSON 範例作為參考即可
- **選項 C**：建立簡化的 Schema（只定義必填欄位）

**必填欄位候選**：`domainKey`, `trigram`, `element`, `labels`, `routing_hints`, `default_facets`

---

### 追問 3：ADR_0005 標準差模式更新（PRIORITY: MEDIUM）

**問題**：ADR_0005 是否已更新標準差模式的決策記錄？

**現狀**：
- CONSTITUTION Section 3.2：已明確寫入 sample stddev（SSOT）
- GPT V4 聲稱已寫入 ADR_0005
- 需要確認 ADR_0005 是否真的已更新

**選項**：
- **選項 A**：更新 ADR_0005，新增標準差模式的決策記錄
  - 理由：符合文件要求（「一經決定寫入 ADR_0005 附錄」）；保持決策記錄的完整性
- **選項 B**：建立新的 ADR（如 ADR_0006）
- **選項 C**：不需要，只在 CONSTITUTION 中記錄即可

---

### 追問 4：世界級增強建議的實作細節（PRIORITY: MEDIUM）

**問題**：是否需要建立詳細的實作規格？

**項目**：
1. **多語言本地化策略（i18n）**：哪些欄位需要多語言？如何處理現有欄位？
2. **可訪問性規範（A11y）**：如何確保符合 WCAG 2.1 AA 標準？
3. **數據隱私與合規策略**：如何確保符合 GDPR、CCPA 等隱私法規？
4. **效能與擴展性策略**：如何確保系統在大量使用者同時使用時仍能保持「準到發毛」的體驗？
5. **文化適應性策略**：如何確保不同文化背景的使用者都能理解和使用系統？

**選項**：
- **選項 A**：建立完整的實作規格文件（每個項目一個文件）
  - 理由：符合專案目標（世界級水準、國際市場、全文化、全年齡）；這些增強建議可以讓系統超脫最終目標，達到真正的世界級水準；提前規劃可以避免後續重構
- **選項 B**：在現有文件中補強相關內容
- **選項 C**：暫時不需要，後續再考慮

---

## 📊 建議的裁示選項

### 建議 1：缺失 Priors 的 Rigidity 預設值
**建議選項**：選項 A（採用 0.0，符合 DIRECTIVE REV.B 的實際內容）

**理由**：
- DIRECTIVE REV.B 是技術裁示文件，具有更高的權威性
- 缺失 Priors 時，不應該假設使用者的歸因模式
- 0.0 是最安全的預設值（避免誤判）
- GPT V4 的說法與 DIRECTIVE REV.B 的實際內容不一致

---

### 建議 2：Domain Schema 定義
**建議選項**：選項 A（建立完整的 Domain Schema）

**理由**：
- 符合 SSOT 原則（Domain element 作為獨立配置）
- 完整的 Schema 定義可以確保數據一致性
- 便於驗證和維護

---

### 建議 3：ADR_0005 標準差模式更新
**建議選項**：選項 A（更新 ADR_0005，新增標準差模式的決策記錄）

**理由**：
- 符合文件要求（「一經決定寫入 ADR_0005 附錄」）
- 保持決策記錄的完整性

---

### 建議 4：世界級增強建議
**建議選項**：選項 A（所有增強建議都應該建立）

**理由**：
- 符合專案目標（世界級水準、國際市場、全文化、全年齡）
- 這些增強建議可以讓系統超脫最終目標，達到真正的世界級水準
- 提前規劃可以避免後續重構

---

## ✅ 可直接整合的部分（已完成）

以下部分已經過審核，可以直接整合到現有文件：

1. ✅ **八大領域標準映射** → 已更新
2. ✅ **V4 引擎實作** → `engine/score_facet.py`（可直接使用）
3. ✅ **V4 測試** → `tests/test_v3_scoring.py`（可直接使用）
4. ✅ **跨域擴散引擎** → 已更新
5. ✅ **Cascade 實作** → `engine/cascade_calculator.py`（可直接使用）
6. ✅ **Cascade 覆寫表** → `domain/cascade/cascade_overrides.v1.0.json`（可直接使用）
7. ✅ **詞彙治理** → `engine/narrative_guard.py`（可直接使用）
8. ✅ **Schema 更新** → 可直接使用更新後的 schema
9. ✅ **Volatility 標準差模式** → CONSTITUTION Section 3.2 已明確寫入 sample stddev（SSOT）

---

**建立日期**：2026-01-13  
**狀態**：OPEN  
**等待裁示**：使用者對追問問題的回應
