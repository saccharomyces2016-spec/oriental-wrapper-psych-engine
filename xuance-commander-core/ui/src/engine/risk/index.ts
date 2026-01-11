/**
 * Risk 導出接口
 * 
 * 統一導出 Risk 相關的類型與函數
 * 
 * 所有設計保持不鎖定、不凍結、可回滾
 */

export { riskIntercept } from './interceptor';
export { pickTemplateId, loadSafetyTemplate } from './templates';
export type { RiskLevel, RiskResolved, SafetyTemplate } from './riskTypes';
export type { RiskInterceptResult } from './interceptor';

