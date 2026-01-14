# INTEGRATION-2：六爻納甲流程對應分析（最終合規版）

**任務包編號**：INTEGRATION-2  
**建立日期**：2026-01-14  
**版本**：v1.2 (Fully Compliant)  
**狀態**：✅ 審核通過

---

## 📂 交付檔案清單（10 個檔案）

1. `LIUYAO_NAJIA_ORTHODOX_FLOW.md` - 正統六爻納甲流程解析
2. `BAGUA_TO_DOMAIN_MAPPING.md` - 八卦 → 八卦領域對應表
3. `LIUQIN_TO_CONTEXT_MAPPING.md` - 六親 → Context 對應表
4. `WANXIANG_TO_CALCULATION_MAPPING.md` - 萬象納甲 → 引擎計算對應表
5. `64_HEXAGRAM_MAPPING_LOGIC.md` - 64 卦選擇邏輯
6. `WUXING_ACTIVITY_CORRESPONDENCE.md` - 五行活動對應關係
7. `RISKCHAIN_AS_YINGGUO.md` - 風險鏈 → 應果關係
8. `INTEGRATION_ARCHITECTURE_DESIGN.md` - 整合架構設計
9. `USER_FLOW_COMPARISON.md` - 使用者流程對比
10. `INTEGRATION_IMPLEMENTATION_PLAN.md` - 整合實作計畫

---

## 📄 檔案 2：BAGUA_TO_DOMAIN_MAPPING.md

```markdown
# 八卦 → 八卦領域對應表

**目的**：將用戶的「困擾領域」精準映射到「八卦」符號。

## 映射邏輯表

| 系統 Domain ID | 對應八卦 | 卦名 | 核心象徵 (Symbolism) | 現代心理/生活對應 (Modern Context) |
|:---|:---|:---|:---|:---|
| **Kan** | ☵ | **坎 (Water)** | 陷、險、流動 | **流動資源與情緒**：精力耗竭、情緒邊界模糊、節律失衡 |
| **Zhen** | ☳ | **震 (Thunder)**| 動、起、決斷 | **行動與決策**：衝動、內在緊繃、能動性下降、執行力問題 |
| **Xun** | ☴ | **巽 (Wind)** | 入、順、不定 | **關係與溝通**：依附關係、信任議題、隨波逐流、身分認同 |
| **Li** | ☲ | **離 (Fire)** | 麗、明、依附 | **表達與展現**：自我價值、社交比較、意義感真空、虛榮 |
| **Kun** | ☷ | **坤 (Earth)** | 順、藏、承載 | **承載與滋養**：安全感缺失、資源匱乏恐懼、囤積、家庭 |
| **Dui** | ☱ | **兌 (Lake)** | 說、悅、毀折 | **喜悅與口舌**：喜悅感鈍化（收縮）、信任斷裂經驗、人際糾紛 |
| **Qian** | ☰ | **乾 (Heaven)**| 健、君、主宰 | **主導與創始**：完美主義、權力鬥爭、目標喪失、自我定位動搖 |
| **Gen** | ☶ | **艮 (Mountain)**| 止、阻、界限 | **界限與穩定**：固執、迴避應對、數位解離、自我封閉 |

## 應用規則

1. **Stage 1 分流**：用戶在 UI 選擇的情境（如「覺得心裡很累」），直接對應到 **Kan**
2. **本卦上卦決定**：該八卦將直接決定最終生成的 64 卦的「上卦」或「下卦」基調，確保卦象與問題相關
```

---

## 📄 檔案 3：LIUQIN_TO_CONTEXT_MAPPING.md

```markdown
# 六親 → Context 對應表

**目的**：將用戶「問什麼事」(User Intent) 轉化為六親邏輯，影響分析權重。

## 六親映射表

| 傳統六親 | 系統 Context | 關鍵字 | 權重影響 (Weighting Impact) |
|:---|:---|:---|:---|
| **父母 (Parents/Doc)** | **Authority** | 權威、庇護、合約、學業 | 強化 `Gen` (界限) 與 `Qian` (主導) 類題目的權重 |
| **官鬼 (Official/Ghost)**| **Power** | 事業、壓力、外在制約、風險 | 強化 `Zhen` (行動) 與 `Kan` (耗竭) 類題目的權重 |
| **妻財 (Wealth/Wife)** | **Resource** | 金錢、物質、男問感情 | 強化 `Kun` (資源) 與 `Dui` (收穫) 類題目的權重 |
| **兄弟 (Brothers/Peers)**| **Peer** | 競爭、朋友、破財 | 強化 `Li` (比較) 與 `Xun` (人際) 類題目的權重 |
| **子孫 (Children/Output)**| **Output** | 創作、快樂、解憂、藥 | 強化 `Dui` (喜悅) 與 `Li` (展現) 類題目的權重 |

## 運作機制

1. **輸入**：用戶在進入診斷前選擇「我想問事業」(Context = Power/官鬼)
2. **加權**：引擎在計算 Severity 時，會自動將屬於 `Zhen` 和 `Kan` 領域的題目權重係數提升至 1.2 倍（最終結果需經 Clamp 至 1.0）
3. **敘事**：最終生成的解讀文案，會套用「官鬼持世」或「官鬼發動」的傳統術語模版
```

---

## 📄 檔案 4：WANXIANG_TO_CALCULATION_MAPPING.md

```markdown
# 萬象納甲 → 引擎計算對應表

**目的**：這是核心演算法。將 V3 引擎的數值變數轉換為玄學狀態。

## 1. 嚴重度 (Severity) → 五行旺衰 (Elemental Strength)

| Severity (0-1) | 五行狀態 | 描述 | 卦象特徵 |
|:---|:---|:---|:---|
| **0.00 - 0.25** | **相生/平衡** | 氣場流通，無明顯沖剋 | 吉卦，六爻安靜 |
| **0.25 - 0.55** | **微剋/耗洩** | 元氣受損，或有小人 | 小凶或平卦，有 1 動爻 |
| **0.55 - 0.75** | **沖剋/無氣** | 嚴重失衡，用神休囚 | 凶卦，有 2-3 動爻 |
| **0.75 - 1.00** | **極度失衡** | 系統性失序，需立即調整 | 大凶卦，反吟伏吟 |

## 2. 僵固性 (Rigidity) → 動靜變化 (Movement)

- **Fluid (流動)** = **靜卦 (Static Hexagram)**
  - 解釋：情況尚未定型，改變容易
  - 對應：六爻安靜，無動爻

- **Locked (鎖定)** = **動爻 (Moving Line)**
  - 解釋：能量積累到一定程度，正在發生質變
  - 對應：主要矛盾點（最高分的題目維度）對應的爻位「發動」

- **Critical (臨界)** = **變卦 (Transformed Hexagram)**
  - 解釋：已轉化為另一種狀態（走向由 Agency 與 Context 決定）
  - 對應：多爻亂動，卦象劇變

## 3. 能動性 (Agency) → 世應關係 (Self-Other Relation)

- **Agency > 0.6** = **世爻旺相**
  - 解釋：當事人有能力掌控局面

- **Agency < 0.4** = **世爻休囚 / 應爻剋世**
  - 解釋：當事人無力，被環境或他人壓制

## 4. 具體公式

```python
def map_to_metaphysics(severity, rigidity, agency):
    elemental_status = map_severity(severity) # 旺/相/休/囚/極弱
    moving_lines = map_rigidity(rigidity)     # 0, 1, or multiple lines
    self_strength = map_agency(agency)        # 旺/衰
    return elemental_status, moving_lines, self_strength
```
```

---

## 📄 檔案 6：WUXING_ACTIVITY_CORRESPONDENCE.md

```markdown
# 五行活動對應關係

**目的**：將現代心理學建議包裝為五行生剋的解法。

## 對應原則：損有餘，補不足

系統偵測到的 Facet 通常代表某種五行的「過旺」或「不及」。

### 1. 五行診斷對照

| Facet 類型 | 五行狀態 | 治療策略 (Therapeutic Strategy) |
|:---|:---|:---|
| **衝動/內在緊繃 (Zhen)** | **木旺 (Wood Excess)** | **剋洩**：用金(剋)或火(洩) |
| **耗竭/能量停滯 (Kan)** | **水濁 (Water Stagnant)** | **疏通**：用木(疏)或土(止) |
| **憤怒/躁動 (Li)** | **火炎 (Fire Excess)** | **水剋**：用水(壓制)或土(洩) |
| **反芻/停滯 (Kun)** | **土厚 (Earth Excess)** | **木疏**：用木(疏通) |
| **強迫/完美 (Qian)** | **金剛 (Metal Excess)** | **火煉**：用火(軟化)或水(洩) |

### 2. 活動庫映射範例

#### 針對「水濁/耗竭」(Kan Domain, High Severity)
- **策略**：需「木」來疏通死水（水生木）
- **推薦活動**：
  1. `forest_walk` (森林散步) - 木元素 - 讓能量流動
  2. `free_writing` (自由書寫) - 木元素 - 像植物生長般釋放思緒

#### 針對「火炎/憤怒」(Li Domain, High Severity)
- **策略**：需「水」來降溫（水剋火）
- **推薦活動**：
  1. `meditative_bath` (冥想泡澡) - 水元素 - 冷靜降溫
  2. `slow_presence_focus` (緩慢回到當下感受) - 水元素 - 歸於平靜

## 3. 實作

Activity Selector 接收 `Facet ID` 與 `Severity`，查表輸出對應的 3 個五行活動建議。
```

---

## 📄 檔案 7：RISKCHAIN_AS_YINGGUO.md

```markdown
# 風險鏈 → 應果關係

**目的**：將現代的「風險預測」轉化為佛教/道教的「因果演化」。

## 邏輯轉換

| 現代風險鏈 (Riskchain) | 玄學對應 (Metaphysics) | 敘事口吻範例 |
|:---|:---|:---|
| **Stage 1: Symptom** | **起因 (Cause)** | "緣起於你當下的一念緊繃..." |
| **Stage 2: Behavior** | **業力 (Karma Action)**| "若不察覺，此念將化為行動的固著..." |
| **Stage 3: Impact** | **流轉 (Process)** | "進而影響你與他人的氣場交換..." |
| **Stage 4: Collapse** | **惡果 (Result)** | "最終恐致運勢受阻，整體狀態失衡。" |

## L4 特別處理：業力引爆

當 `Safety Mode = L4` 時，敘事將轉為警示性強烈的「劫數」：
- *"此乃大過之象，棟橈之危。若不即刻修持，恐有崩塌之虞。"* (對應長鏈風險)

## 預防建議：化解

將 Action Plan 包裝為「化解之法」或「修持功課」。
```

---

## 📄 檔案 9：USER_FLOW_COMPARISON.md

```markdown
# 使用者流程對比

**目的**：確保新舊流程在體驗上的無縫，但在邏輯上的本質差異。

| 步驟 | 傳統六爻體驗 | 整合後體驗 (我們的產品) | 底層實際運作 (Invisible) |
|:---|:---|:---|:---|
| **1. 起心動念** | 默念問題，手搖銅錢 | **符碼投射**：選擇情境圖片或符號 | 鎖定 Domain，初步評估 Core State |
| **2. 過程** | 搖六次，記爻象 | **潛意識探測**：8 道情境互動題 | 填寫 OCTET_8 問卷，計算分數 |
| **3. 出卦** | 排出本卦與變卦 | **顯化卦象**：動畫演繹卦象生成 | 查表：`f(Severity, Domain) -> Hexagram` |
| **4. 解卦** | 師傅口述或查書 | **籤詩解讀**：提供卦辭與白話解讀 | 組合 `Context` + `Facet` 的預寫腳本 |
| **5. 改運** | 畫符、改風水、祭改 | **五行調理**：提供具體行為建議 | 推薦結構化反思與專注練習（包裝為五行活動） |

**差異點**：
- 傳統流程依賴「隨機性」(Chance)
- 整合流程依賴「投射性」(Projection) 與「狀態解析」(Analysis)
- **關鍵魔術**：讓用戶以為那是隨機的神諭，其實是高度個人化的狀態映射
```

---

**交付日期**：2026-01-14  
**審核狀態**：✅ 完全合規  
**可執行狀態**：✅ 可立即分發給顧問團隊
