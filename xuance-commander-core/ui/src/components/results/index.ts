/**
 * Results 導出接口
 * 
 * 統一導出 Results 相關的組件
 * 
 * 所有設計保持不鎖定、不凍結、可回滾
 */

export { ResultStage } from './ResultStage';
export type { ResultStageProps } from './ResultStage';
export { L1Title } from './layers/L1Title';
export { L2Narrative } from './layers/L2Narrative';
export { L3Reveal } from './layers/L3Reveal';
export { L4Action } from './layers/L4Action';
export { resultStateReducer, INITIAL_RESULT_STATE } from './resultStateMachine';
export type { ResultState, ResultAction } from './resultStateMachine';

