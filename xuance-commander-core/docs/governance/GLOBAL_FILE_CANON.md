# Global File Canon（全域檔案憲法）

## 核心原則
- 同一「資料性質」只能有一個 Canon Path
- Canon Path 以外的同名資料夾，視為 Shadow 或 Drift
- 未登記的新路徑，視為非法

---

## Canon Paths（唯一真相）

### 顧問證據（GEM）
- Canon: xuance-commander-core/docs/gem/
- 禁止：
  - /docs/gem
  - 任何非 xuance-commander-core/docs 下的 gem

### 治理文件
- Canon: xuance-commander-core/docs/governance/

### 主線進度
- Canon:
  - roadmap/ROADMAP.md
  - memory/briefs/CURRENT.md

---

## Shadow Paths（允許存在但不可引用）
- prompts/
- templates/
- examples/

---

## Forbidden Patterns（直接視為 Drift）
- repo root 下新增與 Canon 同名資料夾
- 未登記的新「證據類資料夾」
