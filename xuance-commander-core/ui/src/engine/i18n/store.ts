/**
 * i18n Store
 * 
 * 使用 Zustand 管理 i18n 狀態
 * 
 * 核心原則：
 * - CN/EN 即時切換（不 reload）
 * - fail-soft 機制（缺 key 時顯示 key）
 * - 所有設計保持不鎖定、不凍結、可回滾
 */

import { create } from 'zustand';
import type { I18nDict, Locale } from './i18nTypes';

/**
 * i18n State 類型
 */
type I18nState = {
  locale: Locale;
  dict: I18nDict;
  setLocale: (locale: Locale) => void;
  setDict: (dict: I18nDict) => void;
  t: (key: string) => string;
};

/**
 * i18n Store
 */
export const useI18nStore = create<I18nState>((set, get) => ({
  locale: 'zh-TW',
  dict: {},
  setLocale: (locale) => set({ locale }),
  setDict: (dict) => set({ dict }),
  t: (key) => {
    const { dict, locale } = get();
    
    // 優先使用標準格式：dict[key][locale]
    let v = dict[key]?.[locale];
    
    // 如果找不到，嘗試處理舊格式（dict[locale][key]）- 向後兼容
    if (!v && typeof dict[locale] === 'object' && dict[locale] !== null) {
      const localeDict = dict[locale] as Record<string, string>;
      v = localeDict[key];
    }
    
    // Fail-soft: 找不到就回 key，並在開發環境警告
    if (!v || typeof v !== 'string' || v.trim().length === 0) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[i18n] Missing translation for key: "${key}" in locale: "${locale}"`);
      }
      return key;
    }
    
    return v;
  },
}));

