/**
 * RiskOverride Interceptor
 * 
 * 高風險覆蓋攔截器
 * 
 * 核心原則：
 * - 攔截點必須在：Adapter Output → Risk Interceptor → Store.setState() → View Render
 * - 在 HIGH 狀態下，動態 L4 建議必須被丟棄
 * - 必須在 Store 更新前完成覆蓋，避免 FOUC
 * - 所有設計保持不鎖定、不凍結、可回滾
 */

import type { FacetViewModel } from '../../adapters/types';
import type { RiskResolved } from './riskTypes';
import { pickTemplateId, loadSafetyTemplate } from './templates';

/**
 * Risk Intercept 結果
 */
export type RiskInterceptResult = {
  vm: FacetViewModel;
  risk: RiskResolved;
};

/**
 * Risk Override Interceptor
 * 
 * @param vm - FacetViewModel（從 Adapter 輸出）
 * @returns RiskInterceptResult（包含覆蓋後的 ViewModel 和 Risk 狀態）
 */
export function riskIntercept(vm: FacetViewModel): RiskInterceptResult {
  try {
    // 1. 檢查風險等級
    if (vm.meta.riskLevel !== 'HIGH') {
      return {
        vm,
        risk: {
          level: 'NORMAL',
          overridden: false,
        },
      };
    }

    // 2. 選擇模板 ID（deterministic）
    const templateId = pickTemplateId(vm.meta.facetId);
    const template = loadSafetyTemplate(templateId);

    // 3. 丟棄動態 L4（關鍵）
    const safeResults = {
      ...vm.stages.results,
      layers: {
        ...vm.stages.results.layers,
        l4: {
          titleKey: vm.stages.results.layers.l4.titleKey,
          // 刪除 dynamicBodyKey
          safetyTemplateId: templateId === 'A' ? 'TEMPLATE_A' : 'TEMPLATE_B',
          safetyBodyKey: template.body_keys[0], // 使用第一個 body key
        },
      },
    };

    // 4. 返回新的 ViewModel（不可 mutate 原 vm，以利審計/測試）
    const safeVm: FacetViewModel = {
      ...vm,
      meta: {
        ...vm.meta,
        isOverridden: true,
      },
      stages: {
        ...vm.stages,
        results: safeResults,
      },
    };

    return {
      vm: safeVm,
      risk: {
        level: 'HIGH',
        overridden: true,
        templateId,
        reason: 'facet_risk_high',
      },
    };
  } catch (error) {
    // Fail-safe：如果攔截失敗，返回原始 ViewModel 並標記為 fail-safe
    console.error('[RiskInterceptor] Error:', error);
    return {
      vm,
      risk: {
        level: vm.meta.riskLevel,
        overridden: false,
        reason: 'interceptor_fail_safe',
      },
    };
  }
}

