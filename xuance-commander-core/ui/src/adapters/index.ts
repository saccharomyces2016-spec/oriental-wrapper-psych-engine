/**
 * Adapter 導出接口
 * 
 * 統一導出 Adapter 相關的類型與函數
 * 
 * 所有設計保持不鎖定、不凍結、可回滾
 */

export { facetAdapter } from './facetAdapter';
export type {
  FacetViewModel,
  RawUmipJson,
  RiskLevel,
  CompassTrack,
  QuestionType,
  I18nDict,
  ThemeResolved,
} from './types';
export {
  safeString,
  safeNumber,
  safeBoolean,
  safeObject,
  safeArray,
  safeColorCode,
  isValidColorCode,
  NEUTRAL_THEME,
} from './failsoft';

