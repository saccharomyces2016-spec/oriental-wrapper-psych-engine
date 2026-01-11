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
    const v = dict[key]?.[locale];
    // Fail-soft: 找不到就回 key（可被 Gate 掃描抓到）
    return (typeof v === 'string' && v.trim().length > 0) ? v : key;
  },
}));

