/**
 * Flow State
 * 
 * 單次會話的用戶交互數據管理
 * 
 * 核心原則：
 * - 單次會話（Single Session）的用戶交互數據
 * - 包含：選取的符碼、投射答案等
 * - 使用 React Context 管理（與 Global Store 分離）
 * - 所有設計保持不鎖定、不凍結、可回滾
 */

import { createContext, useContext, useState, ReactNode } from 'react';

/**
 * Flow State 類型
 */
export type FlowState = {
  // Stage 2 選取的符碼 ID
  selectedSymbolIds: string[];
  
  // Stage 3 投射答案（question_id -> answer）
  projectionAnswers: Record<string, string>;
  
  // 當前階段（1-4）
  currentStage: 1 | 2 | 3 | 4;
};

/**
 * Flow State Context 類型
 */
type FlowStateContextType = {
  state: FlowState;
  setSelectedSymbolIds: (ids: string[]) => void;
  setProjectionAnswer: (questionId: string, answer: string) => void;
  setCurrentStage: (stage: 1 | 2 | 3 | 4) => void;
  resetFlow: () => void;
};

/**
 * Flow State Context
 */
const FlowStateContext = createContext<FlowStateContextType | undefined>(undefined);

/**
 * 初始 Flow State
 */
export const INITIAL_FLOW_STATE: FlowState = {
  selectedSymbolIds: [],
  projectionAnswers: {},
  currentStage: 2, // 預設從 Stage 2 開始（Stage 1 可延後）
};

/**
 * Flow State Provider Props
 */
export interface FlowStateProviderProps {
  children: ReactNode;
}

/**
 * Flow State Provider
 */
export function FlowStateProvider({ children }: FlowStateProviderProps) {
  const [state, setState] = useState<FlowState>(INITIAL_FLOW_STATE);

  const setSelectedSymbolIds = (ids: string[]) => {
    setState((prev) => ({ ...prev, selectedSymbolIds: ids }));
  };

  const setProjectionAnswer = (questionId: string, answer: string) => {
    setState((prev) => ({
      ...prev,
      projectionAnswers: {
        ...prev.projectionAnswers,
        [questionId]: answer,
      },
    }));
  };

  const setCurrentStage = (stage: 1 | 2 | 3 | 4) => {
    setState((prev) => ({ ...prev, currentStage: stage }));
  };

  const resetFlow = () => {
    setState(INITIAL_FLOW_STATE);
  };

  return (
    <FlowStateContext.Provider
      value={{
        state,
        setSelectedSymbolIds,
        setProjectionAnswer,
        setCurrentStage,
        resetFlow,
      }}
    >
      {children}
    </FlowStateContext.Provider>
  );
}

/**
 * useFlowState Hook
 */
export function useFlowState(): FlowStateContextType {
  const context = useContext(FlowStateContext);
  if (!context) {
    throw new Error('useFlowState must be used within FlowStateProvider');
  }
  return context;
}

