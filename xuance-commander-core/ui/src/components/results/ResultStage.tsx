/**
 * Result Stage Component
 * 
 * Stage 4 結果頁組件
 * 
 * 核心原則：
 * - L1–L4 分層揭示
 * - 順序鎖定：L1 → L2 → L3 → L4
 * - L2 自動揭示（2 秒後）
 * - L3 主動揭示（需使用者點擊/長按/展開）
 * - L4 必須遵守風險覆蓋規則
 * - 所有設計保持不鎖定、不凍結、可回滾
 */

import React, { useReducer, useEffect } from 'react';
import type { FacetViewModel } from '../../adapters/types';
import { useI18nStore } from '../../engine/i18n';
import { resultStateReducer, INITIAL_RESULT_STATE } from './resultStateMachine';
import { L1Title } from './layers/L1Title';
import { L2Narrative } from './layers/L2Narrative';
import { L3Reveal } from './layers/L3Reveal';
import { L4Action } from './layers/L4Action';
import './results.css';

/**
 * Result Stage Props
 */
export interface ResultStageProps {
  viewModel: FacetViewModel;
}

/**
 * Result Stage Component
 */
export function ResultStage({ viewModel }: ResultStageProps) {
  const { t } = useI18nStore();
  const [state, dispatch] = useReducer(resultStateReducer, INITIAL_RESULT_STATE);
  
  const results = viewModel.stages.results;
  const layers = results.layers;
  const reveal = results.reveal;
  const isHighRisk = viewModel.meta.riskLevel === 'HIGH';

  // L2 自動揭示（2 秒後）
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: 'REVEAL_L2' });
    }, reveal.l2AutoAfterMs);

    return () => clearTimeout(timer);
  }, [reveal.l2AutoAfterMs]);

  // L4 自動揭示（L3 揭示後）
  useEffect(() => {
    if (state.l3 === 'revealed') {
      dispatch({ type: 'REVEAL_L4' });
    }
  }, [state.l3]);

  return (
    <div className="result-stage">
      {/* L1：天象/定調 */}
      <L1Title titleKey={layers.l1.titleKey} getText={t} />

      {/* L2：物象/主敘事 */}
      <L2Narrative
        titleKey={layers.l2.titleKey}
        bodyKey={layers.l2.bodyKey}
        isRevealed={state.l2 === 'revealed'}
        getText={t}
      />

      {/* L3：干擾/盲點 */}
      <L3Reveal
        titleKey={layers.l3.titleKey}
        bodyKey={layers.l3.bodyKey}
        isRevealed={state.l3 === 'revealed'}
        onReveal={() => dispatch({ type: 'REVEAL_L3' })}
        getText={t}
      />

      {/* L4：姿態/儀式 */}
      <L4Action
        titleKey={layers.l4.titleKey}
        dynamicBodyKey={layers.l4.dynamicBodyKey}
        safetyTemplateId={layers.l4.safetyTemplateId}
        safetyBodyKey={layers.l4.safetyBodyKey}
        isHighRisk={isHighRisk}
        isRevealed={state.l4 === 'revealed'}
        getText={t}
      />
    </div>
  );
}

