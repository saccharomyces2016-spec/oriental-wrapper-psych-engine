# P0-12 階段二-4 v3 版本符合要求內容（可寫入文本）

**建立日期**：2026-01-12  
**來源**：P0-12 階段二-4 最終結案報告 v3（完整權威版）  
**審核結果**：部分通過（部分內容符合要求，可寫入文本）  
**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）

---

## 一、說明

本文件提取了顧問團隊交付內容中**符合追問包要求**的部分，可以直接寫入文本作為設計基準。

**符合要求的部分**：
- ✅ buildGuidance.js 決策邏輯分析（1.1-1.4）
- ✅ guidancePrinciples 全量提取（2.1-2.3）

**需要補充的部分**：
- ❌ 規則文件不完整（僅有 4 個範例，需要完整的規則清單，至少 30-40 條規則）
- ❌ 驗證機制缺少具體範例（缺少驗證邏輯的詳細說明和驗證範例）
- ❌ 規則應用指南不完整（僅有高層次步驟，缺少詳細說明和範例）
- ❌ 整合報告不完整（僅有高層次說明，缺少提取過程、轉換記錄、驗證結果）

**詳細審核報告**：`P0-12_PHASE2-4_V3_AUDIT_REPORT.md`  
**追問包**：`P0-12_PHASE2-4_V3_FOLLOWUP.md`

---

## 二、buildGuidance.js 決策邏輯完整提取（符合要求）

### 2.1 主函數 `buildGuidance` 決策流程

**Legacy 來源**：`src/core/guidance/buildGuidance.js`

**輸入（Inputs）**：
- `themeHits`（motherThemeId + score）
- `domainId`
- `riskLevel`
- `birthDate`（optional）

**完整決策序列**：
```
1. deriveAgeFromBirth(birthDate)
2. toAgeBand(age) → ageBand
3. buildRecommendationsFromPrinciples(themeHits, ageBand)
4. 若為空 → buildRecommendationsByTheme(themeKeys)
5. 若仍為空 → pickRecommendationsFromDomain(domainCfg)
6. buildChainsByTheme(themeKeys)
7. 若為空 → pickChainsFromArray(domainKey)
8. 根據 riskThemeIds 判斷是否生成 warnings
9. 組裝輸出 payload（recommendations, riskChains, warnings）
```

**優先級原則（Legacy Canon）**：
- **Theme > Domain**
- **有即用，無則退**
- **禁止無中生有**

### 2.2 Recommendations 生成邏輯

#### 2.2.1 `buildRecommendationsFromPrinciples`

- 依 `score` 排序 `themeHits`
- 僅取前 **2 個** Mother Themes
- 每個 Theme：
  - 讀取 `guidancePrinciples`
  - 依 `ageBand` 取得 action templates（`pickActionTemplates`）
  - 透過 `actionsFromTemplates` 將原則轉為行動建議

**Stage 4 轉譯規則**：
- **Theme Dominance Rule**：僅允許最高權重的 Facet 生效
- **Action Count Gate**：High Risk ≤ 3、Mid ≤ 5、Low ≤ 5
- **No Fabrication**：JSON 無項即無輸出

#### 2.2.2 `buildRecommendationsByTheme`

- 當原則路徑為空時使用
- 直接依 Theme 對應之行動模板生成
- 不再進行原則推導

#### 2.2.3 `pickRecommendationsFromDomain`

- 最終保底機制
- 僅在 **完全無 Theme 命中** 時使用

**Stage 4 制度化結果**：
> Domain Fallback 被轉譯為「**每個 Facet JSON 必須有最低內容保證**」，因此 Stage 4 不再需要運行期 Domain Fallback。

### 2.3 Risk Chain / Warning 生成邏輯

#### 2.3.1 Risk Chain

- 僅在以下條件同時成立時生成：
  - `themeHits ∩ riskThemeIds ≠ ∅`
  - `riskLevel ≥ MID`
- 僅描述後果，不包含建議

#### 2.3.2 Warning

- `riskThemeIds = { chronic_depletion, chronic_alertness, unprocessed_loss }`
- 命中即生成固定 Warning 文本

**Stage 4 嚴格規則**：
- Low Risk：**禁止 Chain / Warning**
- High Risk：**至少 1 條 Chain**
- Chain 內容 **禁止 AI 擴寫**

### 2.4 Age Band 邏輯

**Legacy**：
- `deriveAgeFromBirth` → `toAgeBand`

**Stage 4 轉譯**：
- Age Band 僅作為 **模板可用性門控**
- 不參與風險升降、不影響語氣
- 若缺失生日 → 使用 `default` 模板
- 核心判斷移轉至 **Risk Level Band**

---

## 三、guidancePrinciples 全量提取與制度化（符合要求）

### 3.1 Mother Theme × 原則全集（Canonical List）

（完整保留原文，不刪減）

**chronic_depletion**：
1. reduce load to protect core energy
2. restore recovery signals and follow them
3. reclaim boundaries on time and output
4. schedule predictable recovery blocks

**loss_of_agency**：
1. surface real options before saying yes
2. practice small renegotiations
3. track and celebrate self-directed choices
4. set default pauses before commitments

**hyper_responsibility**：
1. redistribute load and co-own outcomes
2. allow shared imperfection
3. set stop rules for what is mine vs theirs
4. ask for support before overload

**fear_based_stability**：
1. run safe experiments with guardrails
2. clarify worst-case and cushions
3. stack small wins toward change
4. separate real risk from imagined collapse

**identity_diffusion**：
1. name what matters before deciding
2. test-fit choices against values
3. record moments that feel like me
4. reduce decisions driven only by others

**suppressed_needs**：
1. voice small needs early
2. set minimum self-care that does not move
3. practice clean asks instead of hints
4. create opt-out rules when capacity is low

**chronic_alertness**：
1. scan once, then settle the body
2. plant safety cues in daily spaces
3. schedule off-alert windows
4. practice flexible responses to change

**unprocessed_loss**：
1. create gentle rituals for what was lost
2. set short windows to feel without flooding
3. share one thread of the story with someone safe
4. notice when old loss is steering new choices

**meaning_vacuum**：
1. anchor daily tasks to a small why
2. swap one hollow task for a meaningful one
3. track moments that feel worthwhile
4. name a near-term outcome that matters

**self_erosion**：
1. restate personal preferences out loud
2. limit compromises that drain identity
3. take one decision that trusts your own read
4. protect energy from default yes-es

### 3.2 原則 → 制度分類 → Stage 4 規則

| 制度分類               | 核心意涵         | 對應行為           |
| ------------------ | ------------ | -------------- |
| Safety-First       | 不製造額外風險      | 禁止恐嚇、禁止升級      |
| No Escalation      | 語氣與行動不跨 Band | Band 一對一       |
| Conservation of Qi | 減法、守氣        | Stop Loss / 收斂 |
| Non-Coercive       | 非命令式         | 引導語氣           |

### 3.3 原則到決策規則映射（範例）

```json
{
  "principle_id": "GP_CD_01",
  "mother_theme_id": "chronic_depletion",
  "legacy_text": "reduce load to protect core energy",
  "stage4_rule": {
    "risk_band": "high",
    "action_intent": "stop_loss",
    "metaphysical_term": "守元氣",
    "priority": "high"
  }
}
```

---

## 四、總結

### 4.1 符合要求的部分

- ✅ buildGuidance.js 決策邏輯分析（2.1-2.4）：完整的決策邏輯分析
- ✅ guidancePrinciples 全量提取（3.1-3.3）：完整的 40 條原則提取和映射

### 4.2 需要補充的部分

- ❌ 規則文件不完整（僅有 4 個範例，需要完整的規則清單，至少 30-40 條規則）
- ❌ 驗證機制缺少具體範例（缺少驗證邏輯的詳細說明和驗證範例）
- ❌ 規則應用指南不完整（僅有高層次步驟，缺少詳細說明和範例）
- ❌ 整合報告不完整（僅有高層次說明，缺少提取過程、轉換記錄、驗證結果）

### 4.3 建議

1. **優先補充完整的規則文件**：這是任務包的核心要求之一，需要提供完整的規則清單（至少 30-40 條規則）
2. **補充驗證機制的詳細說明和範例**：說明每個驗證步驟的具體驗證邏輯，提供驗證範例
3. **補充規則應用指南的詳細說明和範例**：說明應用場景、使用方法、提供應用範例
4. **補充整合報告的詳細說明**：說明提取過程、轉換記錄（含範例）、驗證結果

---

**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）  
**最後更新**：2026-01-12  
**狀態說明**：本文件提取了符合要求的部分，可以直接寫入文本。不符合要求的部分請參考追問包進行補充。
