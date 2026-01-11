# Narrative Metrics Implementation Spec (v1)

Role: R1 (Narrative Metrics Architect)
Status: DRAFT-FROZEN (Ready for Coding)
Target Facet: income_expansion_pressure
Primary Metaphor: Agricultural / Granary

---

## M1: Specificity Scoring Algorithm

- Method: Weighted keyword hits
- Tier 1 (High Specificity): 10 pts / hit
- Tier 2 (General Esoteric): 2 pts / hit
- Max Cap: 60
- Minimum Pass: 20
- Final Score: min(60, M1_Raw)

### Tier 1 Lexicon (CN)
基石, 倉底, 裂痕, 潰決, 發霉, 淤泥, 乾裂, 暴雨, 賊風, 鼠竊, 蟲咬, 播種, 修繕, 築堤, 疏通, 引流, 休耕, 培土, 凍土, 野火

### Tier 2 Lexicon (CN)
氣運, 流轉, 阻滯, 天時, 地利, 人和, 動盪, 平穩, 晦暗, 光亮

---

## M2: Coherence Logic (Boolean Gate)

### Coping Axis
- Passive (-4 ~ -2):
  - Allowed: 修補, 築堤, 休耕, 清理, 內省, 止損
  - Forbidden: 擴張, 播種, 外求, 冒險, 遠行
- Neutral (-1 ~ +1): All allowed
- Active (+2 ~ +4):
  - Allowed: 疏通, 引流, 播種, 開墾, 順勢
  - Forbidden: 封死, 完全停止, 冬眠

### Attribution Axis
- Internal (-4 ~ -2):
  - Allowed: 基石, 牆體, 內氣, 修身
  - Forbidden (overuse): 外賊, 天災, 他人, 大環境
- External (+2 ~ +4):
  - Allowed: 天候, 風雨, 地形, 外力
  - Forbidden: 都是你的錯, 自我檢討, 能力不足

### Rule
- Any forbidden hit => M2 = 0
- Else => M2 = 40

---

## CI Output Schema

- final_score = (M1 + M2) * Gate
- Gate = M3 (Symbolic) * M4 (Safety)
- PASS threshold: >= 80
- If status != PASS => CI build fail

---

## Notes
- Lexicon to be externalized later as YAML (deferred)
- Regex matching is sufficient for MVP
- Embedding similarity is optional future enhancement
