# ENGINE_SURFACE_CORE_INTEGRATION_SCAN_2026-01-15

**目的**：全案掃描表層（八卦/六十四卦）與底層引擎資料的對應狀況，產出缺口盤點與對應表。  
**範圍**：表層詞彙/結構、底層資料庫、引擎映射邏輯、題庫與結果產出。  
**結論**：表層資產（八卦/六十四卦/符碼）已存在部分基礎資料，但與底層題庫/計分/結果資料的系統性對應仍未完成，必須重整成單一任務主線。  

---

## 1) 既有表層資產（已存在）

### 1.1 八卦領域基礎
- **Domain 對照表**：`domain/domains/bagua.domain_map.v1.0.json` 已定義八卦領域與預設 facet。  
- **八卦知識庫**：`domain/knowledge_base/bagua_8_trigrams.v1.0.json` 已包含 8 卦代碼/五行/屬性。  

### 1.2 六十四卦基礎資料
- **六十四卦完整表**：`domain/knowledge_base/hexagram_64_full.v1.0.json` 已具備 64 卦基本資訊與心理敘述欄位。  
- **部分卦象敘事**：`domain/narratives/hexagram_*.narrative.v1.0.json` 已有 28 個卦象敘事檔案。  

### 1.3 符碼與多階段輸入
- **符碼庫**：`symbol_library/symbols_phaseA_complete.json`、`symbols_stage2a_driver.json`、`symbols_stage2b_environment.json`、`symbols_stage3_behavior.json`。  
- **多階段流程定義**：P0-4.5 4-Stage Funnel（八卦→六親→萬象→斷語）已定義流程框架。  

---

## 2) 既有底層引擎資料（已存在）

### 2.1 題庫/計分/敘事/建議/風險
- **Questions**：30 份題庫 JSON。  
- **Scoring**：9 份 scoring JSON。  
- **Narratives**：56 份敘事 JSON（含 28 份 hexagram 敘事）。  
- **Recommendations**：28 份建議 JSON。  
- **Riskchains**：30 份風險鏈 JSON。  
- **Manifests**：14 份 manifest JSON（定義題庫/計分/敘事/建議/風險組裝）。  

### 2.2 引擎映射與輸出
- **符碼→Facet/GAP 分析**：`engine/symbol_facet_mapper.py` 已具備 4 階段符碼輸入與 GAP 分析流程。  
- **API 層**：`api/comprehensive_api.py` 可回傳診斷結果、卦象與敘事（以符碼引擎結果為主）。  
- **64 卦推導**：`engine/hexagram_deriver.py` 僅有 8 卦對 8 卦 ID 的 MVP 對應。  

---

## 3) 現況對應盤點（表層 ↔ 底層）

### 3.1 八卦領域 ↔ Facet
- `bagua.domain_map.v1.0.json` 的 **default_facets 全部無對應資料檔**（題庫/計分/敘事/建議/風險皆缺）。  
- **結論**：八卦領域存在，但尚未完成「八卦→可計算 facet 集合」的實際對接。  

### 3.2 六十四卦 ↔ 底層輸出
- 64 卦資料存在，但**缺乏把引擎結果映射到 64 卦的規則**。  
- 目前僅 **income_expansion_pressure** 具備 `hexagram_mapping.v1.0.json`（單一範例）。  
- 其餘 facet 未有卦象映射規則，也未形成「內圈/中圈/外圈」的詞彙結構。  

### 3.3 多階段符碼 ↔ 資料庫
- 符碼庫（Stage2/3）已具備 vectors 與 candidate_facets，但尚未綁到實際題庫/計分資料。  
- 符碼引擎目前使用硬編 facet 清單（非 domain manifests），與主資料庫並未合流。  

---

## 4) 引擎資料完整度缺口（統計）

- **Facet Key 總數**：58  
- **Questions**：30（缺 28）  
- **Scoring**：9（缺 49）  
- **Narratives**：56（缺 2）  
- **Recommendations**：28（缺 30）  
- **Riskchains**：30（缺 28）  
- **Manifests**：14（缺 44）  
- **Compiled Facet**：僅 `stress_recovery` 完成（其餘未編譯）  

---

## 5) 缺口總結（必補）

### 5.1 表層結構缺口
- **表層系統開發計劃書**：已建立 SSOT（`docs/domain/design/PROJECT_SPEC_ESOTERIC_UI_PSY_ENGINE_V4.md`）。  
- **64 卦內圈/中圈/外圈詞彙表**：目前未在 repo 中找到明確定義檔案。  

### 5.2 引擎資料缺口
- **八卦領域對應 facet 未落地**：bagua domain map 未接到實際題庫/計分。  
- **64 卦映射規則缺失**：僅有單一 facet mapping，尚未形成系統級規則。  
- **多數 facet 缺 scoring/manifest**：無法形成可執行引擎輸出。  
- **compiled facet 缺失**：無法直接交給前端運行。  

### 5.3 引擎邏輯缺口
- **hexagram_deriver** 僅 MVP 8 卦對 8 卦 ID，未涵蓋 64 卦。  
- **符碼引擎與 domain 資料未合流**（symbol_facet_mapper 未讀取 domain manifests）。  

---

## 6) 對應表（目前存在的可用連結）

### 6.1 八卦領域
| 資產 | 位置 | 狀態 |
| --- | --- | --- |
| 八卦領域定義 | domain/domains/bagua.domain_map.v1.0.json | ✅ 存在 |
| 八卦知識庫 | domain/knowledge_base/bagua_8_trigrams.v1.0.json | ✅ 存在 |
| 八卦→Facet 映射 | default_facets | ❌ 對應資料缺失 |

### 6.2 六十四卦
| 資產 | 位置 | 狀態 |
| --- | --- | --- |
| 64 卦全表 | domain/knowledge_base/hexagram_64_full.v1.0.json | ✅ 存在 |
| 64 卦敘事 | domain/narratives/hexagram_*.narrative.v1.0.json | ⚠️ 部分存在 |
| 64 卦映射規則 | domain/facets/*/hexagram_mapping.v1.0.json | ⚠️ 僅一個 facet |
| 64 卦推導邏輯 | engine/hexagram_deriver.py | ⚠️ 8 卦 MVP |

### 6.3 多階段符碼
| 資產 | 位置 | 狀態 |
| --- | --- | --- |
| Stage1/2/3 符碼庫 | symbol_library/*.json | ✅ 存在 |
| Stage1/2/3 與 domain 對接 | engine/symbol_facet_mapper.py | ❌ 未讀取 domain manifests |

---

## 7) 下一步建議

已建立新的「單一總任務」與分階段清單，詳見：
- `docs/task_packets/SURFACE_CORE_ENGINE_INTEGRATION_MASTER_TASK_PACKET.md`

該任務將統一完成：
1. 表層詞彙與結構定錨  
2. 八卦/64 卦對應表建立  
3. 引擎資料缺口補齊（題庫/計分/敘事/建議/風險/manifest/compiled）  
4. 引擎與表層流程整合（輸入→計算→輸出）
