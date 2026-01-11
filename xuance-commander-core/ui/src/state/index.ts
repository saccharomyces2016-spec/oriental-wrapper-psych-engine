/**
 * State 導出接口
 * 
 * 統一導出 State 相關的類型與函數
 * 
 * 所有設計保持不鎖定、不凍結、可回滾
 */

export {
  FlowStateProvider,
  useFlowState,
  INITIAL_FLOW_STATE,
} from './flowState';
export type { FlowState, FlowStateProviderProps } from './flowState';

