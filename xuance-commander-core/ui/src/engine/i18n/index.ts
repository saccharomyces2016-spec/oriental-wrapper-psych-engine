/**
 * i18n 導出接口
 * 
 * 統一導出 i18n 相關的類型與函數
 * 
 * 所有設計保持不鎖定、不凍結、可回滾
 */

export { useI18nStore } from './store';
export { loadI18nFromFacetJson, bootstrapI18n } from './loader';
export type { Locale, I18nDict } from './i18nTypes';

