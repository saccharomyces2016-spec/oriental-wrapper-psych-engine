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

  const data = raw as { i18n?: I18nDict | Record<string, unknown> };
  const dict = data.i18n;

  if (!dict || typeof dict !== 'object' || Array.isArray(dict)) {
    return {};
  }

  // 檢查是否為舊格式（dict['zh-TW'] 和 dict['en'] 作為頂層 key）
  const hasOldFormat = 'zh-TW' in dict || 'en' in dict || 'en-US' in dict;
  
  if (hasOldFormat) {
    // 舊格式：{ "zh-TW": { "key": "value" }, "en": { "key": "value" } }
    // 轉換為新格式：{ "key": { "zh-TW": "value", "en-US": "value" } }
    const normalized: I18nDict = {};
    const zhTW = (dict as Record<string, Record<string, string>>)['zh-TW'];
    const en = (dict as Record<string, Record<string, string>>)['en'] || 
               (dict as Record<string, Record<string, string>>)['en-US'];
    
    if (zhTW && typeof zhTW === 'object' && !Array.isArray(zhTW)) {
      Object.keys(zhTW).forEach((key) => {
        if (!normalized[key]) {
          normalized[key] = {};
        }
        normalized[key]['zh-TW'] = zhTW[key];
      });
    }
    
    if (en && typeof en === 'object' && !Array.isArray(en)) {
      Object.keys(en).forEach((key) => {
        if (!normalized[key]) {
          normalized[key] = {};
        }
        normalized[key]['en-US'] = en[key];
      });
    }
    
    // 合併其他 key（新格式的 key）
    Object.keys(dict).forEach((key) => {
      if (key !== 'zh-TW' && key !== 'en' && key !== 'en-US') {
        const value = (dict as Record<string, unknown>)[key];
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          normalized[key] = value as Partial<Record<'zh-TW' | 'en-US', string>>;
        }
      }
    });
    
    return normalized;
  }

  // 新格式：直接返回
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

