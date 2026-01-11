# ADR 0006 - Facet Question Design Scope Lock (P0-2)

## Status
Accepted

## Context
在 P0-2 階段，我們需要為 `income_expansion_pressure` Facet 設計題目。
團隊中出現了關於是否應在此階段引入「八卦多選盤」、「五行符號板」等創新 UI 交互模式的討論。
這些模式雖然符合玄學語境，但可能引入隱性權重邏輯與 UI 偏差。

## Decision
1. **P0-2 期間嚴格鎖定範圍**：
   - 題目設計必須優先考慮結構正確性、分層清晰度（Band differentiation）與風險鏈對齊。
   - 創新 UI 交互模式（如八卦盤、符號多選）明確列為 **Out of Scope**。
   - 僅允許使用最基礎、無歧義的輸入形式（如 Likert scale 變體或簡單單選/多選），確保數據結構乾淨。

2. **保留未來設計空間（Reserved Future Design）**：
   - 明確批准並保留「符號化多代幣選擇介面（Symbolic multi-token selection）」作為 P0-2 之後的發展方向。
   - 未來將支援：引擎層級的加權聚合、結構邏輯與敘事渲染層的分離。

3. **研究資料使用規範**：
   - 原始研究語料（Google Notebook, legacy failures）不得由 R1 直接在此階段消費。
   - 所有研究洞察必須經過預先萃取（Pre-distilled）、指揮官批准，並透過正式 Brief 或 ADR 提供。

## Consequences
- **正面**：降低 P0-2 複雜度，確保核心結構穩定，避免 UI 實作細節反向污染領域定義。
- **負面**：P0-2 的 UI 表現力可能較為樸素，不夠「玄學酷炫」。
- **緩解**：透過 ADR 明確保證未來會做，安撫對創新交互的期待。

## Compliance
- R1 顧問在產出題目藍圖時，不得包含特定 UI 交互設計要求。
- 任何違反此範圍的提案將被自動退回。
