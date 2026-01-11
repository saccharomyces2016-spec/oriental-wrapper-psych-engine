# P0-3 Field Translation Rules（內部概念對外轉譯規則）

## 狀態
- ACTIVE
- Facet 限定：`income_expansion_pressure`（歲時農耕・倉廩觀）
- 版本：v1.0
- 日期：2026-01-09

---

## 目的
定義內部技術概念（欄位名）對外輸出的轉譯規則，確保內部欄位名不出現在 user-facing 文本中。

---

## 硬規則（Hard Rule）

**內部欄位名不得直接出現在對外輸出**

所有內部技術概念必須轉譯為符合主隱喻（歲時農耕・倉廩觀）的語感，才能出現在對外輸出中。

---

## 1️⃣ 內部概念 → 對外轉譯表

| 內部概念 | 對外允許語感（農耕／倉廩） | 說明 |
|---------|------------------------|------|
| **severity** | 氣節、天候、田況 | 嚴重程度的農耕語感轉譯 |
| **coping** | 耕法、農事、作息 | 應對方式的農耕語感轉譯 |
| **attribution** | 緣由、根源（地氣 / 天時） | 歸因的農耕語感轉譯 |
| **risk chain** | 流年、走勢、誤植稗草 | 風險鏈的農耕語感轉譯 |

---

## 2️⃣ 轉譯範例

### severity（嚴重程度）
- ❌ **禁止**：對外輸出中出現 "severity" 或 "嚴重程度"
- ✅ **允許**：
  - "氣節不順"（對應高 severity）
  - "天候異常"（對應中 severity）
  - "田況平穩"（對應低 severity）

### coping（應對方式）
- ❌ **禁止**：對外輸出中出現 "coping" 或 "應對"
- ✅ **允許**：
  - "耕法調整"（對應 coping strategy）
  - "農事作息"（對應 daily coping）
  - "疏渠導流"（對應 active coping）

### attribution（歸因）
- ❌ **禁止**：對外輸出中出現 "attribution" 或 "歸因"
- ✅ **允許**：
  - "緣由在於地氣不順"（對應 internal attribution）
  - "根源來自天時不利"（對應 external attribution）

### risk chain（風險鏈）
- ❌ **禁止**：對外輸出中出現 "risk chain" 或 "風險鏈"
- ✅ **允許**：
  - "流年不利"（對應風險鏈整體）
  - "走勢漸弱"（對應風險鏈階段）
  - "誤植稗草"（對應風險鏈觸發點）

---

## 3️⃣ 檢查規則

### 機器化檢查
使用 Regex 檢查對外輸出是否包含內部欄位名：

```regex
# 檢查是否包含內部欄位名（不區分大小寫）
/(severity|coping|attribution|risk.?chain|嚴重程度|應對|歸因|風險鏈)/i
```

**違規後果**：匹配到任何內部欄位名 → FAIL（Gate=0）

### 轉譯驗證
- 對外輸出前必須通過轉譯規則驗證
- 所有內部欄位名必須已轉譯為符合主隱喻的語感
- 不得直接使用技術術語

---

## 4️⃣ 治理定位說明

### 規則性質
- **本轉譯規則屬於**：P0-3 Facet-Level Governance
- **適用範圍**：僅限 Facet `income_expansion_pressure`（歲時農耕・倉廩觀）
- **目的**：防止欄位名與現代詞外洩

### 跨 Facet 差異性
其他 Facet 若需使用不同的轉譯規則，必須：
1. **另立 Facet**：新建獨立的 Facet 定義
2. **另立轉譯規則**：建立該 Facet 專屬的內部概念轉譯表
3. **不可回滲本 Facet**：其他 Facet 的轉譯規則，不得反向影響本 Facet

---

## 5️⃣ 狀態與版本

- **狀態**：ACTIVE
- **版本**：v1.0
- **建立日期**：2026-01-09
- **建立依據**：R4 顧問交付（P0-3 B2 任務交付）
- **審核狀態**：APPROVED（已審核通過，品質達 P0-3 封版等級）

---

## 參考文件
- **禁用詞表**：`docs/domain/advisory/R4/P0-3_BANNED_TERMS_LIST.md`
- **機器化黑名單**：`docs/domain/advisory/R4/P0-3_NARRATIVE_BLACKLIST_SSOT.json`
- **治理規則**：`docs/domain/advisory/GOVERNANCE_METAPHOR_COMPATIBILITY_RULE.md`



