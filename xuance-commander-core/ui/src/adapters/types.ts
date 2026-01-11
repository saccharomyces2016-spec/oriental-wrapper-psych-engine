/**
 * Adapter Types
 * 
 * 定義 ViewModel 介面，確保 UI 只接收「可渲染、可驗收、可降級」的乾淨資料
 * 
 * 核心原則：
 * - UI 不得直接讀取 Raw JSON
 * - ViewModel 必須遮罩所有敏感欄位（score, weights, severity, band 等）
 * - 所有設計保持不鎖定、不凍結、可回滾
 */

/**
 * 風險等級
 */
export type RiskLevel = 'NORMAL' | 'HIGH';

/**
 * 羅盤軌道類型
 */
export type CompassTrack = 'INNER' | 'MIDDLE' | 'OUTER';

/**
 * 題目類型
 */
export type QuestionType = 'SINGLE' | 'MULTI';

/**
 * i18n 字典類型
 */
export type I18nDict = Record<string, { 'zh-TW': string; 'en-US': string }>;

/**
 * Theme 解析結果
 */
export interface ThemeResolved {
  cssVars: Record<string, string>;
  assetUrls: {
    backgroundUrl?: string;
    particleTextureUrl?: string;
    borderPatternUrl?: string;
  };
  isNeutralFallback: boolean;
  metaphorId?: string;
}

/**
 * Facet ViewModel（UI 可用資料）
 * 
 * 此介面確保 UI 只接收乾淨資料，不包含任何敏感欄位
 */
export interface FacetViewModel {
  meta: {
    facetId: string;
    title?: string;
    riskLevel: RiskLevel;
    isOverridden?: boolean;
  };

  i18nDict: I18nDict;

  themeResolved: ThemeResolved;

  stages: {
    compass: {
      symbols: Array<{
        id: string;
        labelKey: string;
        svgRef: string; // asset key/path
        track: CompassTrack;
        initialAngle?: number;
        // weight?: never; // explicitly forbidden
      }>;
      rules: {
        selectMax: number;
        selectMin: number;
      };
    };

    projection: {
      questions: Array<{
        id: string;
        titleKey: string;
        promptKey: string;
        type: QuestionType;
        options: Array<{
          id: string;
          labelKey: string;
          imageRef?: string;
          sceneKey?: string; // 情境描述 key
          // score?: never; // forbidden
        }>;
      }>;
    };

    results: {
      layers: {
        l1: {
          titleKey: string;
          bodyKey: string;
          variants?: Array<{
            titleKey: string;
            bodyKey: string;
          }>;
        };
        l2: {
          titleKey: string;
          bodyKey: string;
          variants?: Array<{
            titleKey: string;
            bodyKey: string;
          }>;
        };
        l3: {
          titleKey: string;
          bodyKey: string;
          variants?: Array<{
            titleKey: string;
            bodyKey: string;
          }>;
        };
        l4: {
          titleKey: string;
          // NORMAL: may have dynamic; HIGH: must be overridden to template
          dynamicBodyKey?: string;
          safetyTemplateId?: 'TEMPLATE_A' | 'TEMPLATE_B';
          safetyBodyKey?: string;
        };
      };
      reveal: {
        orderLocked: ['L1', 'L2', 'L3', 'L4'];
        l2AutoAfterMs: number;
        l3RequiresUserAction: boolean;
      };
    };
  };
}

/**
 * Raw UMIP JSON 類型（部分定義，用於 Adapter 輸入）
 * 
 * 注意：此類型僅用於 Adapter 內部，UI 不得直接使用
 */
export interface RawUmipJson {
  facet_id: string;
  risk_level: RiskLevel;
  theme_config?: {
    metaphor_id?: string;
    primary_color?: string;
    font_family?: string;
    assets?: {
      background_url?: string;
      particle_texture?: string;
      border_pattern?: string;
    };
    typography?: {
      heading_font?: string;
      body_font?: string;
      font_size_scale?: number;
    };
  };
  i18n?: I18nDict;
  stage2_compass?: {
    symbols?: Array<{
      symbol_id?: string;
      id?: string;
      label_key: string;
      svg_ref?: string;
      track?: CompassTrack;
      initial_angle?: number;
    }>;
    rules?: {
      select_max?: number;
      select_min?: number;
      min_selections?: number;
      max_selections?: number;
    };
  };
  stage3_projection?: {
    questions?: Array<{
      question_id?: string;
      id?: string;
      title_key: string;
      prompt_key?: string;
      question_type?: QuestionType;
      options?: Array<{
        option_id?: string;
        id?: string;
        label_key: string;
        image_ref?: string;
        scene_key?: string;
      }>;
    }>;
  };
  stage4_results?: {
    layers?: {
      l1?: {
        title_key?: string;
        body_key?: string;
        variants?: Array<{
          title_key?: string;
          body_key?: string;
        }>;
      };
      l2?: {
        title_key?: string;
        body_key?: string;
        variants?: Array<{
          title_key?: string;
          body_key?: string;
        }>;
      };
      l3?: {
        title_key?: string;
        body_key?: string;
        variants?: Array<{
          title_key?: string;
          body_key?: string;
        }>;
      };
      l4?: {
        title_key?: string;
        dynamic_body_key?: string;
      };
    };
  };
}

