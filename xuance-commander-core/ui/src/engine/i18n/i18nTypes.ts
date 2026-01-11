/**
 * i18n Types
 * 
 * 定義 i18n 相關類型
 * 
 * 核心原則：
 * - Parallel-key dictionary，非 runtime 翻譯
 * - 每個 key 必須包含 zh-TW 和 en-US
 * - 所有設計保持不鎖定、不凍結、可回滾
 */

/**
 * Locale 類型
 */
export type Locale = 'zh-TW' | 'en-US';

/**
 * i18n 字典類型
 * 
 * 每個 key 對應一個包含 zh-TW 和 en-US 的物件
 */
export type I18nDict = Record<
  string,
  Partial<Record<Locale, string>>
>;

