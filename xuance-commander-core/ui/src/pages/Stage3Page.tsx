/**
 * Stage 3 Page
 * 
 * 投射定歸因 - 投射卡片頁面
 * 
 * 核心原則：
 * - 投射卡片，一題一頁
 * - 直覺選擇（象/狀態），不得出現數值評分
 * - 所有設計保持不鎖定、不凍結、可回滾
 * 
 * 注意：目前為簡化實作，後續可擴展
 */

import React, { useState, useEffect } from 'react';
import type { FacetViewModel } from '../adapters/types';
import { useI18nStore } from '../engine/i18n';
import { useFlowState } from '../state';

/**
 * Stage 3 Page Props
 */
export interface Stage3PageProps {
  viewModel: FacetViewModel;
}

/**
 * Stage 3 Page Component
 */
export function Stage3Page({ viewModel }: Stage3PageProps) {
  const { t } = useI18nStore();
  const { state, setProjectionAnswer, setCurrentStage } = useFlowState();
  
  const projection = viewModel.stages.projection;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const questions = projection.questions;

  // 如果沒有問題，直接進入 Stage 4
  useEffect(() => {
    if (questions.length === 0) {
      setCurrentStage(4);
    }
  }, [questions.length, setCurrentStage]);

  if (questions.length === 0) {
    return null;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswer = (answerId: string) => {
    setProjectionAnswer(currentQuestion.id, answerId);
    
    if (isLastQuestion) {
      // 最後一題，進入 Stage 4
      setCurrentStage(4);
    } else {
      // 下一題
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <div className="stage-3-page">
      <div className="projection-card">
        <h2>{t(currentQuestion.titleKey)}</h2>
        <div className="projection-options">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleAnswer(option.id)}
              className="projection-option"
            >
              {t(option.labelKey)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

