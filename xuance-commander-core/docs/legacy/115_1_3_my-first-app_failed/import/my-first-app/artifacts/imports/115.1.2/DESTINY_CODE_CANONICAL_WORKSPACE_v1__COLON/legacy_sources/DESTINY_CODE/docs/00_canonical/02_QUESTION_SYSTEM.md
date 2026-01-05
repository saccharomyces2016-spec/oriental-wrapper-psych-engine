# 02_QUESTION_SYSTEM（四回合題庫、題目工程、計分推導規格）

產出日期：2026-01-01

本檔案收斂「四回合題目設計與執行規範」「題目設計與參考資料包」「QuestionBank + Scoring Whitepaper」。
來源原文逐字嵌入。

以下為來源原文：


---

# [SOURCE] 114.12.31 DESTINY_CODE_四回合題目設計與執行規範_v1.2.md

# DESTINY CODE｜四回合題目設計與執行規範 v1.2（最終定案）

（以下內容為完整 PRD 級文件，已整理為 Markdown，可直接納入專案 docs。）

---

## 一、系統總體目標（不可變）

以最少題目數量，在不讓使用者察覺心理測驗本質的前提下，
高精度捕捉事件、狀態、人格結構與痛苦來源，
並以命理／玄學敘事語言交由 AI 生成高命中分析。

---

## 二、四回合分工總覽

| 回合 | 功能 | 問什麼 | 不做什麼 |
|---|---|---|---|
| R1 | 入口 | 面對什麼事 | 不分析 |
| R2 | 狀態 | 卡在哪 | 不測人格 |
| R3 | 結構 | 你怎麼運作 | 不問事件 |
| R4 | 定錨 | 強度在哪 | 不再算分 |

---

## 三、Round 1｜入口回合（事件定位）

### 規範
- 單選
- 8 個單字領域
- 不用情緒詞

### 隱性副標（必採）
- 用於語意鎖定
- 不引導心理

範例：
```
變
（面對無法預期的動盪）
```

---

## 四、Round 2｜狀態回合（State）

### 結構
- 4 題：氣／勢／界／動
- 依 R1 domain 路由

### 畫面隱喻式選項（必採）
- 用直覺畫面承載多重訊號

### Decoder Ring（後台解碼簿，必採）

```json
{
  "visual_key": "Fog_Thunder_Squat",
  "signal_map": {
    "Qi": "Repressed",
    "Shi": "High_Pressure",
    "Jie": "Blurry",
    "Dong": "Conservative"
  },
  "archetype": "Hermit_in_Storm"
}
```

---

## 五、Round 3｜結構回合（Trait）

### 規範
- 單選
- 2–3 題（硬上限）

### 強迫二選一（必採）
- 兩選項皆有代價
- 禁止道德正確答案

### 變色龍皮膚（Dynamic Skinning）
- 結構不變
- 文案依 R1 domain 換皮

### 影子投票（Shadow Vote）
- 同時記錄選擇與拒絕
- 僅用於 AI 敘事

---

## 六、Round 4｜定錨回合（Intensity）

- 單選
- 2–4 選項
- 校正平衡 ↔ 過載

---

## 七、儀式性過場（UX 強化）

- 1.5–3 秒
- 用於心理狀態切換

範例：
- R1→R2：正在感知此刻的能量場…
- R2→R3：正在連結內在核心…
- R3→R4：命盤解鎖中…

---

## 八、AI 使用規範

AI 不得自行解讀畫面文案，
僅能使用 Metadata、State×Trait 摩擦、Shadow Vote 與強度標記。

---

## 九、版本治理

- v1.2 為穩定基準
- 僅可增補，不可破壞結構
- 四回合分工不可改

---

## 十、定案聲明

本文件為 DESTINY CODE 題庫系統唯一權威規範。


---

# [SOURCE] 115.1.1 03_題目設計與參考資料包_v2.md

# 題目設計與參考資料包（Question Design & Reference Pack）

本文件彙整所有「題目相關」：包含題目設計方向、題型設計、執行規範，以及可引用的參考資料來源。
（原則：心理學提供機制，命理提供隱喻；題目表面語言以命理語感呈現。）

---

## 一、四回合題庫分工（已定案）

- R1：入口定位（問局，不承擔心理鑑別）
- R2：狀態題（State）：高敏感度、短期波動
- R3：結構題（Trait）：高穩定性、長期運作方式
- R4：定錨（Intensity）：強度校正與敘事可信度支撐

---

## 二、題目設計最高原則（必守）

1. 少題高鑑別：每一題都要「切開族群」
2. 不要讓使用者察覺「被測」
3. 禁止道德正確答案：兩邊都合理、但代表不同傾向
4. 去病理化：不用診斷語言、不貼人格標籤
5. 跨文化可用：避免只在特定社群才懂的隱語（除非明確鎖定族群）

---

## 三、Round 2 與 Round 3 的語言鐵律（必守）

- R2（狀態）：必須有時間錨點（例如「最近」「這段時間」「此刻」）
- R3（結構）：必須是長期語氣（例如「一直以來」「通常」「多數時候」）
- 禁止混用：狀態題不可問人格、結構題不可問事件

---

## 四、題型設計規格（必用）

- 單選為主
- 強迫二選一（Forced Choice）優先：兩選項都「像真的」
- 投射式問法可用：用「一般人」或「某種場景」承載訊號
- 選項必須能映射到明確訊號（信號／標籤／構面）

---

## 五、後台解碼與中繼資料（工程必備）

每個選項至少要能對應：

- 視覺鍵（若有意象／畫面）
- 訊號映射（例如：氣／勢／界／動 的狀態碼）
- 標籤（pattern_tag）
- 行為面向（behavior_facet）
- 五行向量（僅作映射與敘事，不可主導 scoring）

---

## 六、五行、姓名學、命理語境的使用範圍（重點）

可用在：

- 題目表面語言（意象、隱喻、儀式感）
- 敘事渲染（讓使用者覺得是命理解讀）
- 先天偏置（prior）與文字風格化

不可用在：

- 直接下結論（吉凶、斷人生）
- 覆蓋使用者作答的訊號
- 形成黑盒分數

---

## 七、可引用的專案內參考資料（檔名級索引）

> 這裡只列「你專案中已存在的參考文件」，作為寫題與審題的依據來源。

### A) 題庫工程與規範（最重要）
- `114.12.31 DESTINY_CODE_MASTER_CONSTITUTION.md`：最高母檔（凍結版）
- `114.12.31 DESTINY_CODE_四回合題目設計與執行規範_v1.2.md`：四回合 PRD 規範

### B) 題目工程方法（鑑別度與偏誤控制）
- `114.12.31 心理題目設計指南建議.md`：高鑑別度題目工程學
- `114.12.31 題庫工程化工作計劃_MasterPlan_v1.md`：題庫產出流程與品質檢核

### C) 心理結構理論母檔（作為「機制來源」，非前台語言）
- `114.12.31 DESTINY_CODE_心理結構理論母檔.md`：跨文化心理結構動力學與八大領域困境

### D) 五行資料（作為「隱喻／映射」來源）
- `114.12.41_五行總集合.md`：五行相關總集合（作為映射／詞庫／隱喻來源）

### E) 文字與溝通規則
- `PLAIN_CHINESE_EXPLANATION_RULE.md`：白話文解釋與避免誤會規則

---

## 八、題目品質檢核清單（每題必跑）

- [ ] 使用者看得懂，但說不出「被測什麼」
- [ ] 沒有羞愧感、指責感、病理化語句
- [ ] 兩選都合理，不像在考道德
- [ ] 可映射到明確訊號與中繼資料
- [ ] 能用同一套結構跨領域換皮（若有換皮機制）


---

# [SOURCE] 115.1.1. 20：50 02_QUESTIONBANK_AND_SCORING_WHITEPAPER.md

# 題庫設計白皮書 + 計分/權重/推導鏈工程架構書（Draft）
> 產出時間：2026-01-01  
> 資料來源：封存專案（封存.zip 解壓）中的 `reports/`, `docs/`, `src/core/`, `src/views/`，以及你在本對話中反覆強調的「不可動」範圍與重建方向。

> ⚠️ 誠實聲明：你要求「一個字都不可以漏掉」。我能做到的是：  
> 1) 把檔案庫中能找到的設計與邏輯全部抽出並結構化；  
> 2) 把你在本串對話中反覆確認的需求與限制完整寫入；  
> 但我無法保證逐字重現你所有口語表述的原句（因為對話不是逐字稿格式輸出），因此本文件屬「最完整可追溯的工程化整理版」。

---

## A. 產品流程分段（現況抽取 + 重建時的固定骨架）
現有 `src/views` 已形成明確的 01~05 流程分段（你也以此作為討論骨架）：

- **01 首頁**：引導、進入測驗  
- **02 輸入生日/名字**：姓名學/五行相關輸入（後續計算需要）  
- **03 題目作答主流程**：核心題庫（Round1-4 的引導與作答）  
- **04 轉場**：敘事/情緒轉換/等待（避免突兀跳到結果）  
- **05 結果頁**：四回合推導輸出 + 姓名學/五行輸出 + 警語/安全提醒 + 可解釋敘事

> 你提議未來可能擴充到 06/07（例如更深層報告、付費解鎖、追蹤回訪、或行為統計儀表板）。  
> 這部分屬「工程計畫書待定」，但不影響核心：Round1-4 與結果推導鏈。

---

## B. 題庫設計的「母題→題目化」方法（Mother Theme Questionization）
檔案：`reports/mother_theme_questionization_v2.md`

從這份報告能提取出你們的題庫設計方法論：  
- 先定義「母題」（Mother Theme）：一個穩定的心理/行為特質或命題  
- 再把母題拆成可作答的情境題/選項  
- 並明確規範題目命名、版本、對應的 trait/theme、以及對後續加權推導的用途

> 重建時：母題是題庫穩定性的核心，UI 可以改，但母題與其對映關係不能漂移。

---

## C. 題庫資料的「現況確定版」是哪些？
你要的是「確定版的題庫內容」與「應用的算分邏輯」。以封存專案的證據來看，現況有兩套層次：

### C1) Runtime 目前真正使用的題庫/母題來源（Canonical）
- `src/core/psych/motherThemes.v1.json`  
  - 內容：母題列表（每個 theme/trait 的定義、中文敘事、用途等）
  - 根結構鍵：['version', 'notes', 'enums', 'themes']
- `src/core/psych/questionToTheme.json`  
  - 內容：題目（question id）→ 母題（theme）映射  
  - 條目數：2
- `src/core/ontology/*`  
  - Round2：`round2FourSymbol.v1.json`（四象訊號定義與 id）  
  - Round3：`round3Ipsative.v2.json`（對比選擇題：A/B 對映 trait）  
  - Round4：`round4IntensityTrigger.v1.json`（強度觸發題：低/中/高）

這組資料是目前「最像最終系統」的 canonical，且與 `src/views/03_Resonance.vue` 的 runtime 流程直接對得上。

### C2) 另一份「questionBank.v1.json」（僅見於 archive/legacy）
- 路徑：`archive/legacy/questionBank.v1.json`
- 狀態：可 parse 的 JSON（sha256 已在你們的 cleanup 稽核檔中記錄）
- 題目數：10
- 重要結論：依你們的盤點，**runtime 入口對它的引用為 0**（屬 scripts/docs/歷史殘留用途，而非現行測驗流程的資料源）

> 因此，「確定版題庫」應以 C1 的 canonical（motherThemes/questionToTheme/ontology round files）為主；  
> `questionBank.v1.json` 目前更像「舊版題庫封存樣本」，除非未來決定重新導入 feature flag 模式。

---

## D. 計分/加權/權重：現行可證明的演算法鏈
### D1) Round2/3/4 的推導（DestinyScoringEngine）
檔案：`src/core/scoring/DestinyScoringEngine.ts`

此引擎輸入：  
- Round1 的 domain（領域選擇）  
- Round2 的四象訊號（來自 normalized signals）  
- Round3 的 trait（ipsative 選擇的結果）  
- Round4 的 intensity（強度觸發的結果）

輸出：  
- `code`（一個組合字串，用於後續結果頁/敘事組裝）  
  - 結構（從程式碼可直接讀到）：`{domainId}.{trait}.{friction}.{intensity}`
- friction 規則（程式可證明）：
  - `shi >= 0.5` 且 Round3 trait 為 `INTERNAL_CONTROL` → `LOW_FRICTION`
  - 否則 → `HIGH_FRICTION`

Round2 的四象取值來源（程式可證明）：
- Round2 signals 先用 `normalizeSignalMap`  
- 再取：`yin, yang, shi, xu` 四個值（若不存在，視為 0）

### D2) 心理訊號的標準化與加權（psych/scorer.js）
檔案：`src/core/psych/scorer.js`（此檔是你最在意「題庫→加權→象限→結果」的核心）

這份檔案可直接抽出三個核心能力：
1) **把使用者的選項資料 canonicalize**（避免不同輸入型態造成計分漂移）  
2) **產生 signal map**（把選擇累積成可計算向量）  
3) **normalize / scale / quadrantize**（把分數轉成可比較尺度與象限結果）

以下是檔案中「可直接指認」的片段（節錄，用於工程計畫書標記，不代表完整程式碼）：

```js
canonicalizeUserChoices(rawUserChoices, { domain })

  const baseAxes = resonance?.axes || {}
  const baseElements = resonance?.elements || {}

  const traits = emptyTraits()
  const axes = emptyAxes()
  const elements = emptyElements()

  addWeights(axes, baseAxes)
  addWeights(elements, baseElements)

  // governance: only respect weights already present on choices
  for (const uc of userChoices) {
    if (uc?.weights) {
      addWeights(traits, uc.weights?.traits)
      addWeights(axes, uc.weights?.axes)
      addWeights(elements, uc.weights?.elements)
    }
  }

  const SCALE = { traits: 1.2, axes: 2.0 }
  const traits01 = {
    drive: clamp01((toNum(traits.drive) + 0.5) / SCALE.traits),
    control: clamp01((toNum(traits.control) + 0.5) / SCALE.traits),
    stabilityNeed: clamp01((toNum(traits.stabilityNeed) + 0.5) / SCALE.traits),
    sensitivity: clamp01((toNum(traits.sensitivity) + 0.5) / SCALE.traits),
    riskAversion: clamp01((toNum(traits.riskAversion) + 0.5) / SCALE.traits),
    innerTension: clamp01((toNum(traits.innerTension) + 0.5) / SCALE.traits)
  }

  const axes01 = {
    move: clamp01((toNum(axes.move) + 1) / SCALE.axes),
    inward: clamp01((toNum(axes.inward) + 1) / SCALE.axes),
    heat: clamp01((toNum(axes.heat) + 1) / SCALE.axes),
    damp: clamp01((toNum(axes.damp) + 1) / SCALE.axes),
    boundary: clamp01((toNum(axes.boundary) + 1) / SCALE.axes)
  }

  const elementsUnit = normalizeElementsToUnit(elements)

  // Mother themes derived only from provided pattern tags
  const motherThemes = accumulateMotherThemesFromQuestions(userChoices)

  return {
    input: {
      domain,
      domainLabel,
      r2Label: resonance?.r2Label || '',
      r3Labels: Array.isArray(resonance?.r3Labels) ? resonance.r3Labels : [],
      userChoices
    },
    traits: traits01,
    axes: axes01,
    elements: elementsUnit,
    archetype: {
      topElements: topElementsFromUnit(elementsUnit, 2)
    },
    motherThemes
  }
}

export default { scorePsychometrics }
```

```js

```

> 重建時，任何題庫、選項、權重，只要會改變此檔的輸入/輸出語意，都必須先更新白皮書並做回歸驗證。

### D3) 題目停留時間統計（telemetry）
檔案：`src/core/telemetry/choiceMetrics.js`

你提出的需求是：每題停留時間可以回饋題目結構調整。  
現有實作提供「開始計時、記錄每題耗時、輸出摘要」的最小閉環（節錄）：

```js

```

---

## E. 題目命名、版本、選項結構：要「可追蹤」與「可驗證」
你們在清理/去重討論中痛到的點是：題庫多版本重疊、最後版本不明。  
因此在工程計畫書中必須固定以下規格（這是你明確要的）：

- 題目必須有穩定 `id`（不可用純文字當主鍵）
- 題目命名需包含：round、母題/trait、版本（v1/v2...）與用途標記（anchor/trigger/ipsative 等）
- 選項結構必須能映射到：
  - trait / theme / element / name-studies 的其中一種或多種
  - 權重（weight）或加權規則（rule id）

---

## F. 姓名學 / 五行：目前在檔案庫中能提取的「公式與先驗」
目前封存專案裡，有兩份明確的「文字規格」型資料，可作為重建時的不可動依據：
- `docs/metaphysics/ELEMENT_PRIOR_SPEC.md`：五行先驗/權重/基礎假設（需保留其定義與推導）
- `docs/metaphysics/NAME_STUDIES.md`：姓名學（筆畫、三才五格、或對應規則）的整理

> 若未來要把這兩份文字規格「程式化」，必須把程式模組納入 PROTECTED SET，並建立測試向量（同一輸入→同一輸出）。

---

## G. 結果頁輸出與安全提醒：不可被 UI 重寫吃掉
檔案：`src/views/05_Dashboard.vue`

此頁負責把推導結果轉為：
- 人可讀的敘事輸出（schema-based sections）
- 警語/免責/使用提醒（你要求「用得上的都不可以動」）
- 可能包含隱私/安全提示（視實際區塊而定）

重建 UI 時，建議把「警語/免責」與「結果敘事 schema」抽成獨立 module（但內容仍屬 PROTECTED）。

---

## H. 去重/刪除計畫與重建計畫如何銜接（你要的工作路徑）
你提出兩個方向，其實可以合併成一條安全路徑：

1) **先把核心抽成白皮書（本文件）**  
2) **在 repo 內只保留核心（題庫/母題/推導/安全/telemetry/必要最小 views）**  
3) 其他 UI/雜項全部刪除（或搬到 archive），但前提是：  
   - 有檔案系統快照回滾（你們最後在 `/tmp` 已做到）  
   - 有 runtime 引用鏈證據（你們已做到：28 個候選檔 runtime 0 hit）
4) 接著在「工程架構書」上把 01~05/06~07 的功能拆到可施工任務
5) 只要架構書定稿，再下 Codex 指令包批量重建乾淨專案

---

## I. 待決策清單（重建前必須釘死）
1) **是否要恢復 questionBank 模式（VITE_USE_QUESTION_BANK）？**  
   - 現況：flag 存在於 `03_Resonance.vue`，且 `archive/legacy/questionBank.v1.json` 存在，但 runtime 未引用  
   - 選項：  
     - A. 正式 deprecate：移除 flag 與相關 loader（需工程計畫書批准）  
     - B. 正式支援：把 canonical 題庫輸出成 questionBank 格式，並把 loader 接回（只改路徑/匯入，不改公式）
2) **Round1 的 domain 對應資料來源要固定在哪？**  
   - 需在 `src/core/ontology` 或 `src/core/psych` 中找到/建立唯一來源
3) **姓名學/五行的程式化模組是否存在？若不存在，要新增但必須可測試**

---
