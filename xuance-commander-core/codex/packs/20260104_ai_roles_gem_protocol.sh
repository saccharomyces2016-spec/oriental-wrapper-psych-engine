#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# CODEX PACK: Advisory Roles + GEM Profiles + Governance Wiring
# ============================================================
# Purpose:
# - Define all required advisory roles (world-class + CN/EN).
# - Define how to run GEM (role prompts, input/output contract, review gates).
# - Persist everything into TEXT (docs/*, memory/index/*, CHANGELOG).
#
# IMPORTANT:
# - This is a STRUCTURAL/GOVERNANCE addition (new roles system + GEM protocol).
# - Per CHARTER/TEXT_ONLY rules: requires ADR + user approval.
# - We will create ADR_0004 as "Proposed" and wire docs, but you must approve.
#
# PREWRITE_STATE_CONFIRMATION:
# - No writes unless you explicitly confirm current state.
# - To proceed: run with CONFIRM=YES
#
# Usage:
#   CONFIRM=YES bash codex/packs/20260104_ai_roles_gem_protocol.sh
#
# ============================================================

if [[ "${CONFIRM:-}" != "YES" ]]; then
  cat <<'TXT'
STOP: PREWRITE_STATE_CONFIRMATION

Current known TEXT state (from latest COMMAND_BRIEF/CHAT_PACKET):
- CHARTER: interactive esoteric web product; scientific internal core; world-class + CN/EN; user-facing pure esoteric.
- ROADMAP: Phase 0 MVP single facet; P0-1 not checked complete; P0-2..P0-5 pending.
- ADR_0003: world-class + bilingual global readiness (Proposed).
- Prototype: loads compiled facet; CN/EN selector.

Request now:
- Add a complete advisory roles system + GEM role profiles + usage instructions.
- Persist into repo TEXT so Commander can manage roles and track their work.

If this matches your current reality, re-run:
  CONFIRM=YES bash <this_script>

TXT
  exit 1
fi

echo "== Step 0: Ensure directories =="
mkdir -p docs/adr docs/governance docs/gem docs/gem/profiles docs/gem/runs prompts/gem memory/index memory/changes

echo "== Step 1: Add ADR_0004 (Proposed) =="
cat > docs/adr/ADR_0004_ai_advisory_roles_and_gem_protocol.md <<'MD'
# ADR 0004 - AI Advisory Roles System & GEM Protocol

## Status
Proposed (requires user approval)

## Context
為達成「世界級水準」與「CN/EN 可原生切換」且維持「對使用者：純玄學體驗」，專案不能只靠單一 AI 隨機產出題目或文案。
需要一個可審計、可追溯、可分工的顧問角色系統，並用受限的 GEM 角色來產出「建議稿」供指揮官審核。

若未建立此制度，常見風險：
- 題目像心理測驗或太直白，削弱玄學體驗
- 英文版像翻譯機，失去原生語感與可信度
- 敘事/建議/風險鏈品質不穩定，無法迭代
- 無法回溯「為何這樣設計」，難以維護與擴充

## Decision
1) 建立「AI 顧問角色系統」（Advisory Roles System），定義每個角色的責任、輸入、輸出、禁區、驗收標準。
2) 建立「GEM Protocol」：以 Gemini GEM（或等價角色提示）模擬顧問，但其輸出僅能作為建議稿，不得直接寫入正式 domain。
3) 指揮官負責：
   - 指派任務給顧問角色
   - 審核顧問輸出
   - 決定是否寫入正式 domain（必要時追加 ADR）
4) 所有顧問輸出必須可追溯：保存到 `docs/gem/runs/`，包含：任務、輸入、輸出、指揮官決策摘要。

## Consequences
- 新增 docs/gem/ 與 prompts/gem/ 作為顧問角色與 GEM 設定的真相來源。
- 題目/敘事/建議/風險鏈進入正式 domain 前，必須先經過顧問輸出 -> 指揮官審核 ->（必要時）版本更新與測試。

## Verification
- 新增以下檔案：
  - docs/governance/AI_ADVISORY_ROLES.md
  - docs/gem/README.md
  - docs/gem/profiles/*.md
  - prompts/gem/*.md
  - docs/gem/runs/README.md
- CHANGELOG 與 INDEX 註冊完成
MD

echo "== Step 2: Add governance doc: AI_ADVISORY_ROLES =="
cat > docs/governance/AI_ADVISORY_ROLES.md <<'MD'
# AI Advisory Roles System（AI 顧問角色系統）

目的：
- 讓「世界級 + CN/EN 原生切換 + 純玄學體驗」可被分工、審核、追溯。
- 避免單一 AI 直接產出題目/文案導致品質不穩與不可維護。

硬規則：
1) 顧問角色輸出 = 建議稿，不得直接寫入正式 domain。
2) 寫入 domain 前，必須由指揮官做「採納/拒絕/修改」決策。
3) 所有顧問輸出必須存檔（docs/gem/runs/），可追溯。

## 角色總覽（必備）

### R1：題目設計顧問（Assessment Designer）
責任：
- 設計題目結構與問法，讓使用者「不覺得在做心理測驗」，但仍能穩定區分狀態。
- 規劃題目覆蓋面：行為、狀態、觸發、恢復、外在壓力（用玄學語境包裝）。

輸入（指揮官提供）：
- facet 目標（例如 stress_recovery）
- 玄學外層語境約束（不得暴露心理學/科學）
- 目標題數範圍（例如 12/24/36）
- 使用者輸入形式（單選/量表/情境題）

輸出（顧問提供）：
- 題目藍圖（分段/題目類型/每段目的）
- 題目草案（CN/EN）
- 風險：哪些題目可能太直白、太像心理測驗
- 驗收：最少要能把使用者分成可解釋的 3~5 種狀態

禁區：
- 不得解釋心理學原理
- 不得用診斷語氣（例如疾病、病名）
- 不得做醫療建議

驗收標準：
- 使用者讀起來像玄學問卦，而不是測驗
- 題目答案能穩定拉開差異（不全都選中間）
- CN/EN 兩邊都自然，不像翻譯

---

### R2：玄學敘事顧問（Esoteric Narrative Designer）
責任：
- 把「結果」講成「玄學敘事」，讓人覺得準、神秘但不空。
- 針對每個 outcome band 產出：opening、主敘事、行動建議語氣、警示語氣。

輸入：
- outcome band 定義（low/mid/high 或 5 段）
- 題目設計顧問的題目藍圖與 scoring 方向
- 玄學系統世界觀限制（CHARTER + ADR_0002）

輸出：
- 每個 band：CN/EN 敘事文案（原生語感）
- 文案禁用詞清單（避免暴露內核）
- 文案品質自檢：避免套話/雞湯

禁區：
- 不得拆解原理
- 不得用心理學名詞
- 不得用過度承諾（例如保證）

驗收標準：
- 使用者感覺「像命理系統」
- 讀完有畫面、有指向，不是空話
- EN 文案像英文玄學產品，不像翻譯

---

### R3：行動建議顧問（Actionability Coach）
責任：
- 把建議做成「可執行、可完成」的小步驟，且仍維持玄學語氣。
- 針對不同 band 產出不同強度的建議：維持/調整/止血。

輸入：
- band 敘事（R2）
- 風險鏈需求（R4）與產品約束（不可醫療化）

輸出：
- 每 band：3~7 條可執行步驟（CN/EN）
- 步驟分級：今天可做/三天可做/一週可做
- 禁止事項：不要讓人覺得被命令或被教育

驗收標準：
- 具體、短、可做
- 不需要額外工具或專業
- 仍像玄學指引，不像課程

---

### R4：風險鏈顧問（Risk Chain Architect）
責任：
- 定義「如果不調整，可能會怎麼走下去」的風險鏈條。
- 風險描述要讓人警覺，但不恐嚇、不醫療化。

輸入：
- band 定義 + 敘事（R2）
- 題目結果的可觀測徵象（R1 的題目訊號）

輸出：
- 每 band（至少 mid/high）：risk chains（CN/EN）
- 每條風險鏈要是「可理解的因果序列」：A -> B -> C
- 同時給「打斷點」：哪一步最早能介入

驗收標準：
- 讓使用者覺得「對，我有這種走向」
- 不用專業名詞也看得懂
- 不造成恐慌與過度承諾

---

### R5：CN/EN 原生語感校對（Bilingual Native Editor）
責任：
- 把 CN/EN 文案變成「原生語感」，避免翻譯腔。
- 建立 CN/EN 玄學用語對照表（可持續擴充）。

輸入：
- R1~R4 所有輸出
- 目標市場語氣（更神秘/更理性/更詩意）由指揮官指定

輸出：
- CN/EN 修訂版
- 用語對照表（glossary）
- 禁用詞（避免暴露內核）

驗收標準：
- EN 不像直翻，不像 ESL
- 同一個系統在 CN/EN 仍一致、可信

---

## 指揮官責任（你要我做到的「合夥人掌管」）
1) 我必須知道有哪些角色可用（本文件為準）。
2) 我必須知道每個角色的任務、輸入、輸出、禁區、驗收。
3) 我必須要求保存每次顧問輸出到 docs/gem/runs/。
4) 我必須在任何「要直接寫題目/文案進 domain」之前，先觸發顧問流程與審核。
MD

echo "== Step 3: Add GEM docs: README + runs logging =="
cat > docs/gem/README.md <<'MD'
# GEM（顧問角色）使用說明

目的：
- 用 Gemini GEM（或等價角色提示）模擬顧問角色，產出「建議稿」。
- 指揮官審核後，才可能寫入正式 domain。

硬規則：
1) GEM 輸出 = 建議稿，不得直接寫入 domain。
2) 每次 GEM 任務都要存檔到 docs/gem/runs/（可追溯）。

## 工作流程（最小可行）
1) 指揮官選角色（R1~R5）與任務
2) 指揮官把「輸入包」貼給 GEM
3) GEM 回傳輸出（建議稿）
4) 指揮官做決策：採納/拒絕/要求重做
5) 存檔：docs/gem/runs/YYYYMMDD_HHMM_<role>_<topic>.md
6) 若採納：再由指揮官下指令寫入 domain（需要版本化 + golden tests）

## 輸入包格式（你貼給 GEM）
- Role: R?
- Goal: 這次要解決什麼
- Constraints: 禁區/語氣/題數
- Current artifacts: 目前已有的 facet/compiled/敘事片段（若有）
- Output format: 你要 GEM 用什麼結構吐回

## 輸出格式（GEM 必須遵守）
- Assumptions（若有）
- Deliverables（主輸出）
- Risks（可能翻車點）
- Next questions（需要指揮官補的資訊）
MD

cat > docs/gem/runs/README.md <<'MD'
# GEM Runs Archive

目的：
- 保存每次顧問任務的輸入/輸出/決策，做到可追溯、可審計。

命名：
- docs/gem/runs/YYYYMMDD_HHMM_R{n}_{short_topic}.md

每份 run 檔至少包含：
- Role
- Task
- Input (exact paste)
- Output (exact paste)
- Commander decision (Adopt/Reject/Revise + reason)
MD

echo "== Step 4: Add GEM role profiles (human-readable) =="
cat > docs/gem/profiles/R1_assessment_designer.md <<'MD'
# R1 題目設計顧問（Assessment Designer）

## 名稱
R1 - 題目設計顧問

## 使命
設計題目，讓使用者覺得在「問卦」，不是在「做測驗」，但答案仍能穩定分出狀態。

## 你要產出的東西（輸出）
1) 題目藍圖（分段/每段目的/題型）
2) 題目草案（CN/EN）
3) 每題「避免測驗感」的改寫建議
4) 風險提示（哪題太直白、太像心理測驗）

## 禁止
- 解釋原理（任何心理學/科學）
- 醫療化語氣
- 診斷式措辭

## 驗收
- 玄學感：像問卦
- 差異性：不會全部選中間
- CN/EN 原生、不像翻譯
MD

cat > docs/gem/profiles/R2_esoteric_narrative_designer.md <<'MD'
# R2 玄學敘事顧問（Esoteric Narrative Designer）

## 名稱
R2 - 玄學敘事顧問

## 使命
把結果講得「像命理系統」，讓人覺得準、神秘但不空。

## 輸出
- 每 band 的 opening / main narrative / tone notes（CN/EN）
- 禁用詞清單（避免暴露內核）
- 防套話檢查：哪些句子像雞湯，提供替代句

## 禁止
- 拆解原理
- 心理學名詞
- 過度承諾

## 驗收
- 讀起來像玄學
- 有畫面、有指向
- EN 像原生英文玄學產品
MD

cat > docs/gem/profiles/R3_actionability_coach.md <<'MD'
# R3 行動建議顧問（Actionability Coach）

## 名稱
R3 - 行動建議顧問

## 使命
把建議做成「今天就能做」的小步驟，仍保持玄學語氣。

## 輸出
- 每 band：3~7 條建議（CN/EN）
- 分級：今天/三天/一週
- 避免命令語氣的替代句

## 禁止
- 醫療化
- 說教式長篇
- 需要專業工具或課程才能做

## 驗收
- 具體、短、可做
- 不教育人
- 像指引，不像教學
MD

cat > docs/gem/profiles/R4_risk_chain_architect.md <<'MD'
# R4 風險鏈顧問（Risk Chain Architect）

## 名稱
R4 - 風險鏈顧問

## 使命
定義「不調整會怎麼走下去」的因果鏈，讓人警覺但不恐嚇。

## 輸出
- 每 band（至少 mid/high）：A -> B -> C 的風險鏈（CN/EN）
- 每條鏈的「最早打斷點」（在哪一步介入最有效）
- 語氣備註：如何避免恐嚇

## 禁止
- 醫療化、診斷化
- 恐嚇、詛咒式語氣
- 保證或斷言未來必然發生

## 驗收
- 合理、好懂
- 有介入點
- 不引發恐慌
MD

cat > docs/gem/profiles/R5_bilingual_native_editor.md <<'MD'
# R5 CN/EN 原生語感校對（Bilingual Native Editor）

## 名稱
R5 - CN/EN 原生語感校對

## 使命
把 CN/EN 文案改成「原生語感」，避免翻譯腔；建立可擴充用語表。

## 輸出
- 修訂版 CN/EN 文案
- glossary（玄學用語對照表）
- 禁用詞（避免暴露內核）
- 語氣選項（更神秘/更冷靜/更詩意）

## 禁止
- 變成學術解釋
- 破壞玄學氛圍
- 用太口語導致質感下降

## 驗收
- EN 像原生產品
- CN/EN 一致可信
- 玄學氛圍完整
MD

echo "== Step 5: Add GEM prompt templates (copy-paste into Gemini GEM) =="
cat > prompts/gem/README.md <<'MD'
# GEM Prompt Templates

用途：
- 這些模板是「貼到 Gemini GEM」的角色指令起手式。
- 指揮官每次仍需補上任務與輸入包。

規則：
- GEM 輸出只能是建議稿。
- 必須遵守：對使用者純玄學、不可暴露內核。
MD

cat > prompts/gem/R1_assessment_designer.prompt.md <<'MD'
You are R1: Assessment Designer (for an esoteric "divination" web product).

Non-negotiable constraints:
- User-facing experience is PURE ESOTERIC. No psychology terms. No scientific explanations.
- Avoid medical/diagnostic language. No treatment advice.
- Questions must feel like divination prompts, not a test.

Your job:
- Produce a question blueprint and CN/EN drafts that can separate users into 3-5 meaningful bands.
- Provide risk notes: which questions feel too direct or too "test-like" and how to rewrite.

Output format (must follow):
1) Blueprint (sections, purpose, question types, counts)
2) CN Questions (with option sets)
3) EN Questions (native-sounding, not literal translation)
4) Risks & rewrites
5) What you still need from the Commander
MD

cat > prompts/gem/R2_esoteric_narrative.prompt.md <<'MD'
You are R2: Esoteric Narrative Designer.

Constraints:
- PURE ESOTERIC for users. No psychology terms. No scientific explanation.
- No overpromising. No "guarantees". No fearmongering.
- EN must read like a native esoteric product, not a translation.

Your job:
- For each outcome band, produce CN/EN: opening + main narrative + tone notes.
- Provide banned words/phrases and "anti-cliche" rewrites.

Output format:
1) Band definitions you assumed
2) CN narratives by band
3) EN narratives by band
4) Banned words list
5) Anti-cliche rewrites
6) Questions for the Commander
MD

cat > prompts/gem/R3_actionability.prompt.md <<'MD'
You are R3: Actionability Coach for an esoteric guidance product.

Constraints:
- PURE ESOTERIC tone; no educational lecturing; no medical advice.
- Steps must be small, concrete, doable without special tools.

Your job:
- For each band: 3-7 actions in CN/EN, grouped by Today / 3-days / 1-week.
- Provide tone alternatives (soft suggestion vs firm guidance).

Output format:
1) Actions by band (CN)
2) Actions by band (EN, native)
3) Tone alternatives
4) Risks (too bossy / too vague) + fixes
MD

cat > prompts/gem/R4_riskchain.prompt.md <<'MD'
You are R4: Risk Chain Architect.

Constraints:
- PURE ESOTERIC; no medical/diagnostic terms.
- No fearmongering; no certainty claims about the future.

Your job:
- For mid/high (or specified bands): create clear A->B->C risk chains in CN/EN.
- Provide the earliest interruption point for each chain.

Output format:
1) Risk chains by band (CN)
2) Risk chains by band (EN)
3) Interruption points
4) Tone safety notes
MD

cat > prompts/gem/R5_bilingual_editor.prompt.md <<'MD'
You are R5: CN/EN Native Editor for an esoteric product.

Constraints:
- Maintain premium "world-class" tone.
- EN must be native and esoteric; not literal translation.
- No psychology/science explanations.

Your job:
- Rewrite provided CN/EN outputs into native, premium style.
- Build a glossary of recurring esoteric terms (CN<->EN) and banned words.

Output format:
1) Revised CN
2) Revised EN
3) Glossary (CN term -> EN term -> usage note)
4) Banned words list
5) Notes for consistency across bands
MD

echo "== Step 6: Register in memory index and changelog =="
# Update memory/index/INDEX.md if exists; create minimal if missing.
if [[ ! -f memory/index/INDEX.md ]]; then
  cat > memory/index/INDEX.md <<'MD'
# MEMORY INDEX（小檔索引）

入口：
- 當前摘要：memory/briefs/CURRENT.md
- 變更紀錄：memory/changes/CHANGELOG.md
- 最高憲章：charter/CHARTER.md
- 主線進度：roadmap/ROADMAP.md

## 治理
- docs/governance/TEXT_ONLY_EXECUTION_RULES.md
- docs/governance/PREWRITE_STATE_CONFIRMATION.md

## ADR
- docs/adr/ADR_0001_externalize_domain_and_version_schema.md
- docs/adr/ADR_0002_esoteric_experience_scientific_core.md
- docs/adr/ADR_0003_world_class_bilingual_global_market.md
MD
fi

# Append new entries if not present
if ! rg -q "AI_ADVISORY_ROLES.md" memory/index/INDEX.md; then
  cat >> memory/index/INDEX.md <<'MD'

## AI 顧問角色與 GEM
- docs/governance/AI_ADVISORY_ROLES.md
- docs/gem/README.md
- docs/gem/profiles/
- prompts/gem/
- docs/gem/runs/
MD
fi

if ! rg -q "ADR_0004_ai_advisory_roles_and_gem_protocol.md" memory/index/INDEX.md; then
  cat >> memory/index/INDEX.md <<'MD'

## ADR（新增）
- docs/adr/ADR_0004_ai_advisory_roles_and_gem_protocol.md
MD
fi

# Update CHANGELOG
if [[ ! -f memory/changes/CHANGELOG.md ]]; then
  cat > memory/changes/CHANGELOG.md <<'MD'
# CHANGELOG

## Unreleased
MD
fi

if ! rg -q "ADR_0004" memory/changes/CHANGELOG.md; then
  perl -0777 -i -pe 's/## Unreleased\n/## Unreleased\n- Added: ADR_0004 AI advisory roles system + GEM protocol (Proposed; requires user approval)\n- Added: docs\/governance\/AI_ADVISORY_ROLES.md (roles + responsibilities)\n- Added: docs\/gem\/ (profiles + run archive) and prompts\/gem\/ (GEM templates)\n/s' memory/changes/CHANGELOG.md
fi

echo "== Step 7: Quick verification =="
echo "Created/updated files:"
ls -la \
  docs/adr/ADR_0004_ai_advisory_roles_and_gem_protocol.md \
  docs/governance/AI_ADVISORY_ROLES.md \
  docs/gem/README.md \
  docs/gem/runs/README.md \
  docs/gem/profiles/R1_assessment_designer.md \
  docs/gem/profiles/R2_esoteric_narrative_designer.md \
  docs/gem/profiles/R3_actionability_coach.md \
  docs/gem/profiles/R4_risk_chain_architect.md \
  docs/gem/profiles/R5_bilingual_native_editor.md \
  prompts/gem/README.md \
  prompts/gem/R1_assessment_designer.prompt.md \
  prompts/gem/R2_esoteric_narrative.prompt.md \
  prompts/gem/R3_actionability.prompt.md \
  prompts/gem/R4_riskchain.prompt.md \
  prompts/gem/R5_bilingual_editor.prompt.md \
  memory/index/INDEX.md \
  memory/changes/CHANGELOG.md

echo
echo "rg checks:"
rg "AI_ADVISORY_ROLES|GEM|ADR 0004" -n docs memory prompts || true

echo
echo "DONE (text persisted)."
echo "NEXT (manual): approve ADR_0004 status -> Accepted if you agree."
