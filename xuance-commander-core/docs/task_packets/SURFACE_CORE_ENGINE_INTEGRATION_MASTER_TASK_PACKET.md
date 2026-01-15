# SURFACE_CORE_ENGINE_INTEGRATION_MASTER_TASK_PACKET

**任務名稱**：SURFACE_CORE_ENGINE_INTEGRATION_REBASELINE_001  
**建立日期**：2026-01-15  
**狀態**：ACTIVE  
**任務性質**：主線整合（表層八卦/六十四卦 × 底層引擎）  

---

## 1) 任務目標

建立「表層八卦/六十四卦 → 底層題庫/計分/敘事/建議/風險」的單一路徑，讓引擎可直接支援網頁流程，並完成缺口補齊與可驗收輸出。

---

## 2) 任務輸入（資料來源）

- 表層掃描報告：`docs/ops/analysis/ENGINE_SURFACE_CORE_INTEGRATION_SCAN_2026-01-15.md`
- 八卦領域：`domain/domains/bagua.domain_map.v1.0.json`
- 八卦知識庫：`domain/knowledge_base/bagua_8_trigrams.v1.0.json`
- 六十四卦資料：`domain/knowledge_base/hexagram_64_full.v1.0.json`
- 符碼庫：`symbol_library/symbols_phaseA_complete.json` + `symbols_stage2a_driver.json` + `symbols_stage2b_environment.json` + `symbols_stage3_behavior.json`
- 四階段流程：`P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md`
- 引擎現況：`engine/symbol_facet_mapper.py`、`engine/hexagram_deriver.py`

---

## 3) 輸出交付物（Deliverables）

1. **表層詞彙 SSOT**（八卦 + 64 卦內圈/中圈/外圈詞彙）
2. **八卦→Facet 映射表**（每個領域至少 1-3 個可計算 facet）
3. **64 卦映射規則**（輸入/計分→卦象）
4. **Facet 完整資料**（Questions/Scoring/Narratives/Recommendations/Riskchains/Manifest/Compiled）
5. **端到端驗收腳本**（可驗證輸入→運算→輸出）

---

## 4) 分階段任務清單（可逐步執行）

### Phase A — 表層詞彙與結構定錨
- [ ] 補齊「八卦領域」對應語義（確認 8 領域命名與用途）。
- [ ] 補齊「六十四卦內圈/中圈/外圈」詞彙 SSOT。
- [x] 已建立表層計劃書 SSOT：`docs/domain/design/PROJECT_SPEC_ESOTERIC_UI_PSY_ENGINE_V4.md`

### Phase B — 八卦領域 → Facet 對應
- [ ] 盤點 bagua.domain_map 的 default_facets 是否存在題庫/計分/敘事/建議/風險。
- [ ] 補齊缺失 facet（或改用既有 facet），形成「八卦領域→可運算 facet 集合」。
- [ ] 更新 `bagua.domain_map.v1.0.json` 使其指向真實可用 facet。

### Phase C — 64 卦映射規則
- [ ] 建立 64 卦映射規則（domain + severity + rigidity/agency/attribution）。
- [ ] 定義「內圈/中圈/外圈」與 64 卦映射關係。
- [ ] 更新引擎（`hexagram_deriver.py` 或新模組）讀取 mapping。

### Phase D — 引擎資料完整化
- [ ] 補齊 Scoring 缺口（至少覆蓋八卦 8 領域核心 facet）。
- [ ] 補齊 Recommendations/Riskchains/Manifests。
- [ ] 建立 compiled facets，形成可直接執行輸出。

### Phase E — 端到端驗收
- [ ] 建立「八卦 → 題庫 → 計分 → 64 卦 → 輸出」測試流程。
- [ ] 產出最小驗收報告（輸入/輸出樣例 + 缺口清單）。

---

## 5) 驗收標準（Definition of Done）

- ✅ 八卦領域與 64 卦詞彙皆有 SSOT 文件。
- ✅ 八卦領域可直接導向至少一組「完整 facet 資料」。
- ✅ 64 卦映射規則可由引擎讀取與執行。
- ✅ 最少一條完整流程可以輸入→計算→輸出。
- ✅ 缺口清單可被追蹤為子任務。

---

## 6) 風險與依賴

- **若缺少表層 SSOT**（內圈/中圈/外圈詞彙），需先補齊詞彙再談映射。
- **若 scoring/manifest 未補齊**，引擎無法形成可運算結果。
- **若 64 卦映射未落地**，最終輸出仍停留在「八卦分流」。

---

## 7) 任務關聯與替代

本任務為「全案整合主線」，已取代先前所有未完成任務；後續所有工作應掛載於本任務的子階段。
