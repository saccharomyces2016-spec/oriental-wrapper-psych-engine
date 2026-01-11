/**
 * Safety Template Management
 * 
 * 安全模板管理
 * 
 * 核心原則：
 * - Template 選擇邏輯必須是 deterministic（可追溯、可重跑）
 * - 所有設計保持不鎖定、不凍結、可回滾
 */

import type { SafetyTemplate } from './riskTypes';

/**
 * Template A（預設模板，用於 fallback）
 */
const TEMPLATE_A: SafetyTemplate = {
  template_id: 'A',
  title_key: 'l4_safety_template_a_title',
  body_keys: ['l4_safety_template_a_body'],
  cta: {
    label_key: 'l4_safety_template_a_cta',
  },
};

/**
 * Template B（預設模板，用於 fallback）
 */
const TEMPLATE_B: SafetyTemplate = {
  template_id: 'B',
  title_key: 'l4_safety_template_b_title',
  body_keys: ['l4_safety_template_b_body'],
  cta: {
    label_key: 'l4_safety_template_b_cta',
  },
};

/**
 * 選擇模板 ID（deterministic，基於 facet_id 的 hash）
 * 
 * @param facetId - Facet ID
 * @returns 'A' 或 'B'
 */
export function pickTemplateId(facetId: string): 'A' | 'B' {
  let h = 0;
  for (let i = 0; i < facetId.length; i++) {
    h = (h * 31 + facetId.charCodeAt(i)) >>> 0;
  }
  return (h % 2 === 0) ? 'A' : 'B';
}

/**
 * 載入安全模板（同步，從記憶體快取或預載入 JSON）
 * 
 * @param templateId - Template ID ('A' 或 'B')
 * @returns SafetyTemplate
 */
export function loadSafetyTemplate(templateId: 'A' | 'B'): SafetyTemplate {
  // 目前使用預設模板（未來可從 JSON 載入）
  return templateId === 'A' ? TEMPLATE_A : TEMPLATE_B;
}

