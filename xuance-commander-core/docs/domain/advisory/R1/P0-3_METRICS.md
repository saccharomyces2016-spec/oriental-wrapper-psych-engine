
<!-- R1_SCORING_SYSTEM_V1_BEGIN -->
# Narrative Sharpness Scoring System v1 (Gated Scoring)

## Goal
將 P0-3 的通過/失敗規則轉為可量化計分，用於：
- Evaluation Pipeline / Model Arena
- Prompt Regression Testing（Golden Tests）
- Runtime Candidate Routing（多候選自動挑最佳）

## Algorithm
採用「阻斷式計分（Gated Scoring）」：

**FinalScore = (M1 + M2) * Gate**

- Gate = 1 若 **M3=PASS 且 M4=PASS**
- Gate = 0 若 **命中 M3 或 M4 禁用詞/紅線**

> 說明：先守住「安全 (M4)」與「玄學純度 (M3)」，才計算品質分（M1/M2）。

## Gates
- **M4: Safety Gate**
  - Regex / Keyword Scan
  - 命中 L5 紅線（醫療/法律/投資/具體人生指令/宿命恐嚇）→ Gate=0
- **M3: Symbolic Gate**
  - Regex / Keyword Scan
  - 命中現代心理/科學/企業黑話污染 → Gate=0

## Quality (Max 100)
### M1: Specificity — 60 pts
- **60 (Sharp / Image-Match):** 名詞級具體意象，且對位 Severity/風險鏈
- **30 (Blurry / Adjective-Only):** 多為形容詞或通用玄學套語
- **0 (Generic):** 巴納姆式廢話、空泛安慰

### M2: Coherence — 40 pts
- **40 (Strong Link):** Attribution → State → Action 閉環，方向與 Coping 一致
- **20 (Weak Link):** 無矛盾但關聯鬆散（偏萬用句）
- **0 (Contradiction):** 建議方向與 Coping/風險鏈相反

## Thresholds
- **>= 80：P0-3 Go-Live 門檻**
  - 必須 Gate=1
  - 且 **M1 必須達到 60（意象精準為硬性優先）**
  - M2 至少 20
- **60–79：安全但平庸（備選，不主推）**
- **< 60：FAIL**

## CI Policy
- CI 必須同時輸出：
  - Gate pass/fail（M3/M4 命中詳單）
  - M1/M2 分數與原因
  - FinalScore
- 若 Gate=0：FinalScore 強制為 0（不允許 "部分通過"）

---

## Facet 限定判準說明

**重要**：本次 R1 對「杯子 / 獵物」等詞彙的判定，僅適用於 Facet：`income_expansion_pressure`（歲時農耕・倉廩觀）。  
**不構成對未來 Facet 的限制**：不限制未來 Facet（如競逐型、風險型、對抗型）使用這些詞彙。  
**詳細規則**：見 `docs/domain/advisory/GOVERNANCE_METAPHOR_COMPATIBILITY_RULE.md`（文明原型一致性規則）。

<!-- R1_SCORING_SYSTEM_V1_END -->

