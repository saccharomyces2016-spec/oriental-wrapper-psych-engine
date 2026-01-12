/**
 * Stage 4 Page
 * 
 * 命盤綜合與斷語 - 結果頁面
 * 
 * 核心原則：
 * - 使用 ResultStage 組件
 * - L1-L4 分層揭示
 * - 所有設計保持不鎖定、不凍結、可回滾
 */

import type { FacetViewModel } from '../adapters/types';
import { ResultStage } from '../components/results';

/**
 * Stage 4 Page Props
 */
export interface Stage4PageProps {
  viewModel: FacetViewModel;
}

/**
 * Stage 4 Page Component
 */
export function Stage4Page({ viewModel }: Stage4PageProps) {
  return (
    <div className="stage-4-page">
      <ResultStage viewModel={viewModel} />
    </div>
  );
}

