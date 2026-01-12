# R1｜Narrative Sharpness Metrics v1（Executable Spec）v1.0
> 來源：使用者提供的 R1 交付文件（P0-3）。  
> 用途：CI/驗收 Gate（M1–M4）、禁用詞機器檢查、internal signals 對外轉譯。

---

## 0. 採納結論（Commander Note）
此份規格 **可直接採納** 作為 P0-3 的品質閘門，優點是：
- 禁用詞表可 Regex 檢查（M3/M4 可自動 Fail）
- Internal signals → 農耕/倉廩意象有明確映射（M1 可對位）
- 門檻明確（Zero Modern Hits / Zero L5 Hits）
- 有 5 條標準測試樣本，可做 CI regression

> ⚠️ 最小修正提醒（不阻擋採納，但需列入後續修訂）  
> 1) 「建議你」被列入禁用詞：請確認產品語氣是否全面改用「宜／可／不宜」。  
> 2) Case 5 的「需立即止息」屬強指令語氣：對外需改為「此刻宜止息播種／先收手護根」，以維持 L4 姿態而非現實命令。  
> 3) 部分高強度意象（如「寸草不生」）可能觸發恐嚇感：建議列入 R4 的降溫轉譯白名單/黑名單（後續再定）。

---

## 1. Machine-Checkable Forbidden Lexicon（對外禁用詞表）
**任一敘事字串命中即 Fail（CI 報錯）。**

### 1.1 Modern Psychology & Science（M3 Violation）
| CN (Regex) | EN (Regex) | 備註 |
| --- | --- | --- |
| `(潛)?意識` | `(sub)?conscious(ness)?` | 改用：心神、靈臺、深處 |
| `焦慮` | `anxiety`, `anxious` | 改用：氣躁、心火、不寧 |
| `憂鬱`, `抑鬱` | `depression`, `depressed` | 改用：氣鬱、凝滯、灰暗 |
| `壓力` | `stress`, `pressure` | 改用：重負、緊繃、外力 |
| `創傷` | `trauma` | 改用：舊傷、裂痕、陰影 |
| `情緒`, `情商` | `emotion`, `EQ` | 改用：心氣、起伏 |
| `能量場` | `energy field`, `vibration` | 改用：氣場、氣象 |
| `歸因` | `attribution` | 改用：源頭、起因 |
| `防禦機制` | `defense mechanism` | 改用：護持、封閉 |
| `自我(價值)?` | `ego`, `self-worth` | 改用：本心、元神 |

### 1.2 Socio-Economic & Life Instructions（M4 Violation）
| CN (Regex) | EN (Regex) | 備註 |
| --- | --- | --- |
| `投資` | `invest(ment)?` | 改用：播種、佈局 |
| `資產` | `asset(s)?` | 改用：倉廩、庫存、基石 |
| `負債`, `債務` | `debt`, `liability` | 改用：漏卮、虧空、透支 |
| `離職`, `辭職` | `quit`, `resign` | 改用：轉向、休耕、另闢 |
| `離婚`, `分手` | `divorce`, `break up` | 改用：緣盡、分離、獨行 |
| `薪水`, `工資` | `salary`, `wage` | 改用：收成、雨水、俸祿 |
| `老闆`, `上司` | `boss`, `manager` | 改用：上位者、天候 |
| `建議你` | `recommend`, `suggest` | 改用：宜、可嘗試、方向為 |

### 1.3 Clinical & Deterministic（M4 Critical Fail）
| CN (Regex) | EN (Regex) | 備註 |
| --- | --- | --- |
| `治療`, `治癒` | `cure`, `heal`, `therapy` | 改用：調養、修復 |
| `醫生`, `就醫` | `doctor`, `physician` | 改用：專業之人 |
| `一定`, `絕對` | `definitely`, `certainly` | 改用：恐有、呈現、傾向 |
| `保證` | `guarantee` | 直接刪除 |
| `病`, `症` | `disorder`, `syndrome` | 改用：失調、違和 |

---

## 2. Esoteric Translation Rules（玄學轉譯規則）

### 2.1 Severity（Heat/Pain）1–10
| Range | Esoteric Tone | Key Imagery（農耕/倉廩） | Forbidden Terms |
| --- | --- | --- | --- |
| 1–3 | 溫／潤／平 | 微風、細雨、土壤鬆軟、倉有餘糧、平順 | 無感、舒服、沒事 |
| 4–7 | 燥／濕／緊 | 烈日當空、梅雨不絕、地表微裂、倉門緊閉、糧食發霉 | 有點累、煩躁 |
| 8–10 | 烈／凍／崩 | 大旱千里、暴雪封山、堤防潰決、寸草不生、倉底穿孔 | 崩潰、極度痛苦、完蛋 |

### 2.2 Attribution（Locus）-4 ~ +4
| Range | Esoteric Direction | Key Imagery | Forbidden Terms |
| --- | --- | --- | --- |
| Negative (-) | 內虛／滲漏 | 地基不穩、牆體老化、疏於修繕、倉底自漏 | 都是我的錯、內歸因 |
| Positive (+) | 外沖／劫奪 | 洪水猛獸、賊風入倉、天災頻仍、外力擠壓 | 環境不好、別人害的 |

### 2.3 Coping（Flow）-4 ~ +4
| Range | Esoteric Action | Key Imagery | Forbidden Terms |
| --- | --- | --- | --- |
| Negative (-) | 固守／封藏 | 加固堤防、深挖溝渠、封倉過冬、休耕養息 | 逃避、躺平、防禦 |
| Positive (+) | 疏通／開墾 | 引水灌溉、開闢新田、修築水道、疏通淤泥 | 積極進取、冒險 |

### 2.4 Risk Chains（internal → 對外敘事）
| Internal Code | Internal Name | Esoteric Narrative Output |
| --- | --- | --- |
| A-Mid | 氣滯流塞 | 渠道淤積之象：水流雖有，但溝渠阻塞，灌溉難行。 |
| A-High | 基石掏空 | 倉底懸空之象：表面雖有糧，但地基已被蝕空，恐有塌陷之虞。 |
| B-Mid | 雙力相衝 | 野火燒田之象：欲開新田卻逢大旱，兩頭燒灼，地力難支。 |
| B-High | 逐幻斷航 | 雲中播種之象：無視節氣與地力，執意在虛地播種，終將顆粒無收。 |

---

## 3. Metric Thresholds（M1–M4 最低通過線）
| Metric | Threshold | Check Method |
| --- | --- | --- |
| M1 Specificity | 至少 1 個與 Severity 對位的具體名詞（裂痕/發霉/潰決…），不得只用形容詞 | Manual / LLM Audit（後續可機器化） |
| M2 Coherence | 建議方向必須與 Coping 邏輯一致（Coping 負不可鼓勵大舉開墾） | Logic Check |
| M3 Symbolic | Category 1.1 命中數 = 0 | Regex / CI |
| M4 Safety | Category 1.2 & 1.3 命中數 = 0 | Regex / CI |

---

## 4. Standard Test Cases（CI/驗收用例）
> 用於 R2/R3 生成結果回歸測試。

### Case 1｜High Pressure
Input: Severity 9, Attribution +3, Coping +2  
Expected: 洪水/堤防將潰/強行疏導；L4 以「不宜與天爭地」姿態收束  
Fail: 出現「焦慮」；或出現現實金融/借貸指令

### Case 2｜Stagnation（A-Mid）
Input: Severity 5, Attribution -2, Coping -3  
Expected: 溝渠淤塞/死水微瀾/倉門緊鎖；L4 以「清淤通竅」  
Fail: 出現「抑鬱」；或出現「離職」等現實決策

### Case 3｜External Clash
Input: Severity 7, Attribution +4, Coping -1  
Expected: 賊風入倉/冰雹；L4 以「修補籬笆、靜待時變」  
Fail: 現代社會詞（如經濟不景氣/受害者心態）

### Case 4｜Internal Depletion（A-High）
Input: Severity 8, Attribution -4, Coping -1  
Expected: 倉底懸空/地基塌陷/鼠竊蟲咬；L4「培土固本」  
Fail: 心理診斷/就醫/自我價值低落等現代詞

### Case 5｜Critical Risk（B-High）
Input: Severity 10, Attribution -3, Coping +4  
Expected: 雲中播種/燃燒根基/油盡燈枯；L4 以「宜止息播種、先護根」  
Fail: 任何臨床名詞；或「立刻停止投資」等現代語句（需玄學化）
