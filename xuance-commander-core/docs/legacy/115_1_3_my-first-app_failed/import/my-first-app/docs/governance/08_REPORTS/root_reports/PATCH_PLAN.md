# Patch Plan (Minimal)

**Date**: 2024  
**Scope**: Round1 錯誤 + R3 卡住修補

---

## 必改檔案清單

### 1. `src/views/03_Resonance.vue`

#### Fix 1.1: Round1 錯誤視窗（line 437-445）
**問題**: 重複 canonicalize 導致錯誤
**修改**:
```javascript
// 原碼 (line 441-445):
const canonical = canonicalizeDomainId(t.domain)
const allowed = /^(domain_yuan|domain_cai|domain_shen|domain_ye|domain_jia|domain_ju|domain_xin|domain_ming)$/
if (!allowed.test(canonical)) {
  throw new Error(`[round1] invalid canonical domain id ${canonical}`)
}
selectedDomain.value = canonical

// 修補後:
let canonical
try {
  canonical = canonicalizeDomainId(t.domain)
} catch (err) {
  // 如果 canonicalize 失敗，檢查是否已經是 canonical 格式
  if (isCanonicalDomainId(t.domain)) {
    canonical = t.domain
  } else {
    throw err
  }
}
selectedDomain.value = canonical
```
**要點**: 
- 移除 `allowed` 正則（`canonicalizeDomainId()` 已會驗證）
- 如果 `t.domain` 已經是 canonical，直接使用
- 需要 import `isCanonicalDomainId` from `domainCanonicalMap.js`

#### Fix 1.2: R3 自動前進失敗（line 626-631）
**問題**: `transitionToRound(4)` 可能拋錯但沒有 catch
**修改**:
```javascript
// 原碼 (line 626-631):
if (round3Index.value < qs.length - 1) {
  round3Index.value += 1
  showRound3Question(round3Index.value)
} else {
  setTimeout(() => transitionToRound(4), 350)
}

// 修補後:
if (round3Index.value < qs.length - 1) {
  round3Index.value += 1
  showRound3Question(round3Index.value)
} else {
  // 確保所有問題都已回答
  if (round3Answers.value.length >= qs.length) {
    setTimeout(async () => {
      try {
        await transitionToRound(4)
      } catch (err) {
        console.error('[R3] auto-advance failed', err)
        isThinking.value = false
        alert('進入下一階段時發生錯誤，請重試')
      }
    }, 350)
  } else {
    console.warn('[R3] answers incomplete', { answers: round3Answers.value.length, total: qs.length })
  }
}
```
**要點**:
- 檢查 `round3Answers.length >= qs.length` 才自動前進
- 加上 try-catch 處理 `transitionToRound(4)` 的錯誤
- 錯誤時清除 `isThinking` 並提示用戶

#### Fix 1.3: R3 完成按鈕（可選，line 383, 107-114）
**問題**: `showRound3Confirm` 是 `false`，按鈕不顯示
**修改**:
```javascript
// 原碼 (line 383):
const showRound3Confirm = false

// 修補後:
const showRound3Confirm = computed(() => {
  if (!isRound3.value) return false
  const total = round3QuestionList.value.length
  const answered = round3Answers.value.length
  return answered >= total && answered > 0
})
```
**要點**:
- 改為 computed，當所有問題已回答時顯示按鈕
- 按鈕的 `@click` 改為 `confirmRound3`（line 111）
- 按鈕的 `:disabled` 改為 `!canConfirmRound3`（需要新增 computed）

#### Fix 1.4: 新增 canConfirmRound3 computed（line 383 附近）
**新增**:
```javascript
const canConfirmRound3 = computed(() => {
  const total = round3QuestionList.value.length
  const answered = round3Answers.value.length
  if (answered < total) return false
  return round3Answers.value.every(r => r?.selected_option && r?.rejected_option)
})
```

#### Fix 1.5: 錯誤處理增強（line 558-566）
**問題**: `transitionToRound()` 的 catch 可能沒有清除 `isThinking`
**修改**:
```javascript
// 原碼 (line 558-566):
} catch (err) {
  console.error('[R1] transitionToRound failed', err)
  isThinking.value = false
  if (err?.stack) console.error(err.stack)
  throw err
} finally {
  setTimeout(() => { isThinking.value = false }, 500)
}

// 修補後:
} catch (err) {
  console.error('[R1] transitionToRound failed', err)
  if (err?.stack) console.error(err.stack)
  isThinking.value = false  // 確保清除
  throw err
} finally {
  // Safety net: 確保 isThinking 最終會清除
  setTimeout(() => { 
    if (isThinking.value) {
      console.warn('[R1] safety net: forcing isThinking to false')
      isThinking.value = false 
    }
  }, 500)
}
```
**要點**:
- 在 catch 中確保清除 `isThinking`
- finally 中的安全網改為條件檢查（避免覆蓋正常清除）

---

## 測試檢查點

### Round1 點擊
- [ ] 點擊任一 domain 不會跳錯誤視窗
- [ ] Console 沒有 `[round1] invalid canonical domain id` 錯誤
- [ ] 成功進入 Round2

### Round2→Round3
- [ ] 點擊 Round2 選項後成功進入 Round3
- [ ] Round3 問題正確顯示

### Round3→Round4
- [ ] 選完所有 Round3 問題後自動進入 Round4（350ms 後）
- [ ] 或點擊「定象」按鈕手動進入 Round4
- [ ] 如果自動前進失敗，有錯誤提示且不會卡住

---

## 備註

1. **Fix 1.3 (R3 按鈕)** 是可選的，如果自動前進正常運作，可以保留 `showRound3Confirm = false`
2. **Fix 1.2** 是關鍵修補，必須實施
3. **Fix 1.1** 可以簡化為：移除 `allowed` 正則，直接使用 `canonicalizeDomainId()` 的結果（它會自己 throw）












