/**
 * Result State Machine
 * 
 * L1–L4 分層揭示狀態機
 * 
 * 核心原則：
 * - 順序鎖定：L1 → L2 → L3 → L4
 * - L2 自動揭示（2 秒後）
 * - L3 主動揭示（需使用者點擊/長按/展開）
 * - 所有設計保持不鎖定、不凍結、可回滾
 */

/**
 * 層級狀態
 */
export type LayerState = 'hidden' | 'revealing' | 'revealed';

/**
 * 結果狀態
 */
export interface ResultState {
  l1: LayerState;
  l2: LayerState;
  l3: LayerState;
  l4: LayerState;
}

/**
 * 初始狀態
 */
export const INITIAL_RESULT_STATE: ResultState = {
  l1: 'revealed',  // L1 立即顯示
  l2: 'hidden',
  l3: 'hidden',
  l4: 'hidden',
};

/**
 * 狀態轉換
 */
export type ResultAction =
  | { type: 'REVEAL_L2' }
  | { type: 'REVEAL_L3' }
  | { type: 'REVEAL_L4' };

/**
 * 結果狀態機（Reducer）
 */
export function resultStateReducer(
  state: ResultState,
  action: ResultAction
): ResultState {
  switch (action.type) {
    case 'REVEAL_L2':
      return {
        ...state,
        l2: 'revealed',
      };
    case 'REVEAL_L3':
      return {
        ...state,
        l3: 'revealed',
      };
    case 'REVEAL_L4':
      return {
        ...state,
        l4: 'revealed',
      };
    default:
      return state;
  }
}

