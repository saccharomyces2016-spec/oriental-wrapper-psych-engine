/**
 * useFacetData Hook
 * 
 * 載入並處理 Facet 資料
 * 
 * 核心原則：
 * - 載入 compiled_facet.json
 * - 使用 Adapter 轉換資料
 * - 使用 Risk Interceptor 處理高風險覆蓋
 * - 使用 Theme Engine 應用主題
 * - 使用 i18n Loader 載入 i18n 字典
 * - 所有設計保持不鎖定、不凍結、可回滾
 */

import { useState, useEffect } from 'react';
import { facetAdapter } from '../adapters';
import { riskIntercept } from '../engine/risk';
import { resolveTheme, applyTheme } from '../engine/theme';
import { bootstrapI18n } from '../engine/i18n';
import type { FacetViewModel } from '../adapters/types';
import type { RiskResolved } from '../engine/risk/riskTypes';

/**
 * useFacetData 返回類型
 */
export type UseFacetDataResult = {
  viewModel: FacetViewModel | null;
  risk: RiskResolved | null;
  loading: boolean;
  error: Error | null;
};

/**
 * useFacetData Hook
 * 
 * @param dataPath - compiled_facet.json 的路徑（例如：'/data/compiled_facet.json'）
 * @returns UseFacetDataResult
 */
export function useFacetData(dataPath: string = '/data/compiled_facet.json'): UseFacetDataResult {
  const [viewModel, setViewModel] = useState<FacetViewModel | null>(null);
  const [risk, setRisk] = useState<RiskResolved | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      try {
        setLoading(true);
        setError(null);

        // 1. 載入 Raw JSON
        const response = await fetch(dataPath);
        if (!response.ok) {
          throw new Error(`Failed to load data: ${response.statusText}`);
        }
        const rawData = await response.json();

        // 2. 載入 i18n 字典
        bootstrapI18n(rawData);

        // 3. 使用 Adapter 轉換資料
        const vm = facetAdapter(rawData);

        // 4. 使用 Risk Interceptor 處理高風險覆蓋
        const { vm: finalVm, risk: riskResolved } = riskIntercept(vm);
        setRisk(riskResolved);

        // 5. 應用 Theme
        const theme = resolveTheme(finalVm.themeResolved);
        applyTheme(theme);

        // 6. 設定 ViewModel
        if (!cancelled) {
          setViewModel(finalVm);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      cancelled = true;
    };
  }, [dataPath]);

  return { viewModel, risk, loading, error };
}

