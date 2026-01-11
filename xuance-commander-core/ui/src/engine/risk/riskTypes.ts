/**
 * Risk Types
 * 
 * 定義高風險覆蓋相關類型
 * 
 * 核心原則：
 * - RiskOverride 必須是 Interceptor
 * - 必須在 Store.setState() 之前完成覆蓋，避免 FOUC
 * - 所有設計保持不鎖定、不凍結、可回滾
 */

/**
 * 風險等級
 */
export type RiskLevel = 'NORMAL' | 'HIGH';

/**
 * Risk Resolved 類型
 */
export type RiskResolved = {
  level: RiskLevel;
  overridden: boolean;
  templateId?: 'A' | 'B';
  reason?: 'facet_risk_high' | 'interceptor_fail_safe';
};

/**
 * 安全模板類型
 */
export type SafetyTemplate = {
  template_id: 'A' | 'B';
  title_key: string;
  body_keys: string[];   // 多段落 i18n keys
  cta?: { label_key: string; href?: string };
};

