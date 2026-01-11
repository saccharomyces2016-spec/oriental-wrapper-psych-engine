/**
 * i18n Loader
 * 
 * 從 compiled_facet.json 載入 i18n 字典
 * 
 * 核心原則：
 * - 所有動態文本必須在編譯階段就包含在 i18n 字典中
 * - UI 只讀取 i18n key，不進行 runtime 翻譯
 * - 所有設計保持不鎖定、不凍結、可回滾
 */

import { useI18nStore } from './store';
import type { I18nDict } from './i18nTypes';

/**
 * 從 Raw JSON 載入 i18n 字典
 * 
 * @param raw - Raw JSON 資料（包含 i18n 欄位）
 * @returns I18nDict（i18n 字典）
 */
export function loadI18nFromFacetJson(raw: unknown): I18nDict {
  // Fail-soft: 若缺失，回空字典
  if (!raw || typeof raw !== 'object') {
    return {};
  }

  const data = raw as { i18n?: I18nDict };
  const dict = data.i18n;

  if (!dict || typeof dict !== 'object' || Array.isArray(dict)) {
    return {};
  }

  return dict as I18nDict;
}

/**
 * 初始化 i18n（從 Raw JSON 載入並設定到 Store）
 * 
 * @param rawFacet - Raw Facet JSON 資料
 */
export function bootstrapI18n(rawFacet: unknown): void {
  const dict = loadI18nFromFacetJson(rawFacet);
  useI18nStore.getState().setDict(dict);
}

