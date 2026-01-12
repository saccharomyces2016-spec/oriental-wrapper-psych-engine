# P0-5 資料結構規格（SPEC-2）

**Status**：ACTIVE · EDITABLE · REFERENCE  
**Version**：v1.0 | **Date**：2026-01-10  
**Data Source**：`compiled_facet.json`（UMIP Schema v1）

---

## 1. 設計目標

1. 可機器驗證（JSON Schema）  
2. 可 fail-soft（缺欄位不白屏）  
3. 可遮罩（敏感欄位不出現在 ViewModel）  
4. 可支援 Stage 2 / Stage 3 / Stage 4

---

## 2. UMIP Schema v1（JSON Schema，Draft-07）

> **注意**：此 Schema 定義「資料最小可用集合」。Adapter 仍需實作補值與降級策略。

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://example.local/umip.schema.v1.json",
  "type": "object",
  "additionalProperties": true,
  "required": [
    "facet_id",
    "risk_level",
    "theme_config",
    "i18n",
    "stage2_compass",
    "stage3_projection",
    "stage4_results"
  ],
  "properties": {
    "facet_id": {
      "type": "string",
      "minLength": 1,
      "description": "Facet 唯一識別碼（如：income_expansion_pressure, relationship_imbalance）"
    },

    "risk_level": {
      "type": "string",
      "enum": ["NORMAL", "HIGH"],
      "description": "風險等級。HIGH 時必須觸發 RiskOverride Interceptor"
    },

    "theme_config": {
      "type": "object",
      "additionalProperties": true,
      "required": ["primary_color", "assets"],
      "properties": {
        "metaphor_id": {
          "type": "string",
          "description": "隱喻 ID（如：agriculture_v1, ocean_v1），用於識別視覺主題"
        },
        "primary_color": {
          "type": "string",
          "pattern": "^#([A-Fa-f0-9]{6})$",
          "description": "主色調（十六進位色碼）"
        },
        "font_family": {
          "type": "string",
          "description": "字體族（如：'Noto Serif SC', 'Inter'）"
        },
        "assets": {
          "type": "object",
          "additionalProperties": true,
          "properties": {
            "background_url": {
              "type": "string",
              "format": "uri",
              "description": "背景圖片 URL（可選）"
            },
            "particle_texture": {
              "type": "string",
              "format": "uri",
              "description": "粒子紋理 URL（可選）"
            },
            "border_pattern": {
              "type": "string",
              "format": "uri",
              "description": "邊框圖案 URL（可選）"
            }
          }
        },
        "typography": {
          "type": "object",
          "additionalProperties": true,
          "properties": {
            "heading_font": { "type": "string" },
            "body_font": { "type": "string" },
            "font_size_scale": { "type": "number", "minimum": 0.5, "maximum": 2.0 }
          }
        }
      }
    },

    "i18n": {
      "type": "object",
      "description": "Parallel-key dictionary，非 runtime 翻譯。每個 key 必須包含 zh-TW 和 en-US",
      "additionalProperties": {
        "type": "object",
        "required": ["zh-TW", "en-US"],
        "properties": {
          "zh-TW": {
            "type": "string",
            "minLength": 1,
            "description": "繁體中文文本（原生語感，非翻譯）"
          },
          "en-US": {
            "type": "string",
            "minLength": 1,
            "description": "英文文本（原生語感，非翻譯腔）"
          }
        },
        "additionalProperties": false
      }
    },

    "stage2_compass": {
      "type": "object",
      "required": ["symbols"],
      "properties": {
        "symbols": {
          "type": "array",
          "minItems": 12,
          "maxItems": 30,
          "description": "羅盤符碼列表（20-30 個）",
          "items": {
            "type": "object",
            "required": ["id", "label_key", "svg_ref", "track"],
            "properties": {
              "id": {
                "type": "string",
                "minLength": 1,
                "description": "符碼唯一 ID（如：symbol_authority, symbol_power）"
              },
              "label_key": {
                "type": "string",
                "description": "i18n key（對應 i18n 字典中的 key）"
              },
              "svg_ref": {
                "type": "string",
                "description": "SVG 圖示引用（asset key 或 path）"
              },
              "track": {
                "type": "string",
                "enum": ["INNER", "MIDDLE", "OUTER"],
                "description": "符碼所在軌道（內/中/外層）"
              },
              "initial_angle": {
                "type": "number",
                "minimum": 0,
                "maximum": 360,
                "description": "初始角度（度數，0-360），可選"
              }
            },
            "additionalProperties": true
          }
        },
        "rules": {
          "type": "object",
          "properties": {
            "select_max": {
              "type": "integer",
              "minimum": 1,
              "maximum": 5,
              "default": 3,
              "description": "最多可選符碼數量（預設 3 個）"
            },
            "select_min": {
              "type": "integer",
              "minimum": 1,
              "maximum": 3,
              "default": 2,
              "description": "至少需選符碼數量（預設 2 個）"
            }
          },
          "additionalProperties": true
        }
      },
      "additionalProperties": true
    },

    "stage3_projection": {
      "type": "object",
      "required": ["questions"],
      "properties": {
        "questions": {
          "type": "array",
          "minItems": 1,
          "description": "投射定歸因題目列表",
          "items": {
            "type": "object",
            "required": ["id", "title_key", "prompt_key", "question_type", "options"],
            "properties": {
              "id": {
                "type": "string",
                "minLength": 1,
                "description": "題目唯一 ID"
              },
              "title_key": {
                "type": "string",
                "description": "題目標題 i18n key"
              },
              "prompt_key": {
                "type": "string",
                "description": "題目提示 i18n key（引導文字）"
              },
              "question_type": {
                "type": "string",
                "enum": ["SINGLE", "MULTI"],
                "description": "題目類型（單選/多選）"
              },
              "options": {
                "type": "array",
                "minItems": 2,
                "description": "選項列表（必須是「象/狀態」描述，不得包含分數）",
                "items": {
                  "type": "object",
                  "required": ["id", "label_key"],
                  "properties": {
                    "id": {
                      "type": "string",
                      "minLength": 1,
                      "description": "選項唯一 ID"
                    },
                    "label_key": {
                      "type": "string",
                      "description": "選項文字 i18n key（必須是「象/狀態」描述）"
                    },
                    "image_ref": {
                      "type": "string",
                      "description": "選項圖片引用（asset key 或 path），可選"
                    },
                    "scene_key": {
                      "type": "string",
                      "description": "情境描述 i18n key（可選，用於更詳細的「象/狀態」描述）"
                    }
                  },
                  "additionalProperties": false
                }
              }
            },
            "additionalProperties": false
          }
        }
      },
      "additionalProperties": false
    },

    "stage4_results": {
      "type": "object",
      "required": ["layers"],
      "properties": {
        "layers": {
          "type": "object",
          "required": ["l1", "l2", "l3", "l4"],
          "properties": {
            "l1": {
              "$ref": "#/definitions/layerBlock",
              "description": "L1：天象/定調（The Atmosphere）"
            },
            "l2": {
              "$ref": "#/definitions/layerBlock",
              "description": "L2：物象/主敘事（The Manifestation）"
            },
            "l3": {
              "$ref": "#/definitions/layerBlock",
              "description": "L3：干擾/盲點（The Fog）"
            },
            "l4": {
              "type": "object",
              "required": ["title_key"],
              "description": "L4：姿態/儀式（The Stance）。HIGH Risk 時必須被 RiskOverride Interceptor 覆蓋",
              "properties": {
                "title_key": {
                  "type": "string",
                  "description": "L4 標題 i18n key"
                },
                "dynamic_body_key": {
                  "type": "string",
                  "description": "動態建議內容 i18n key（僅在 risk_level: NORMAL 時使用）"
                },
                "safety_template_id": {
                  "type": "string",
                  "enum": ["TEMPLATE_A", "TEMPLATE_B"],
                  "description": "安全模板 ID（僅在 risk_level: HIGH 時由 RiskOverride Interceptor 注入）"
                },
                "safety_body_key": {
                  "type": "string",
                  "description": "安全模板內容 i18n key（僅在 risk_level: HIGH 時由 RiskOverride Interceptor 注入）"
                }
              },
              "additionalProperties": false
            }
          },
          "additionalProperties": false
        }
      },
      "additionalProperties": false
    }
  },

  "definitions": {
    "layerBlock": {
      "type": "object",
      "required": ["title_key", "body_key"],
      "description": "L1/L2/L3 層級的基本結構",
      "properties": {
        "title_key": {
          "type": "string",
          "description": "層級標題 i18n key"
        },
        "body_key": {
          "type": "string",
          "description": "層級內容 i18n key"
        },
        "variants": {
          "type": "array",
          "description": "變體內容（同 Band 下至少 3 組，用於隨機輪播）",
          "items": {
            "type": "object",
            "properties": {
              "title_key": { "type": "string" },
              "body_key": { "type": "string" }
            }
          }
        }
      },
      "additionalProperties": false
    }
  }
}
```

---

## 3. i18n 結構（Parallel Key）

**核心原則**：不做 runtime 翻譯，UI 只透過 key 取值

### 3.1 結構說明

- **Key-Value 結構**：每個 key 對應一個包含 `zh-TW` 和 `en-US` 的物件
- **原生語感**：英文文本必須是原生語感，不得是逐字翻譯
- **獨立內容資產**：CN/EN 文本應由內容顧問（R5）獨立產出，不依賴機器翻譯

### 3.2 範例結構

```json
{
  "i18n": {
    "btn_confirm": {
      "zh-TW": "確認定象",
      "en-US": "Confirm Ritual"
    },
    "compass_guide": {
      "zh-TW": "請凝視盤面，選出三個最有感的符碼",
      "en-US": "Gaze into the circle, select three symbols that call to you."
    },
    "stage3_question_1_title": {
      "zh-TW": "此刻的你，更像哪一種狀態？",
      "en-US": "In this moment, which state resonates with you?"
    },
    "l4_dynamic_suggestion": {
      "zh-TW": "宜止息播種，先護根，守中養根，避風保本。",
      "en-US": "Allow the field to rest, tend to the roots, hold steady and preserve the core, guard against storms."
    },
    "l4_safety_template_a": {
      "zh-TW": "宜暫停自判，轉向外部守護者。",
      "en-US": "Seek an external keeper of balance."
    }
  }
}
```

### 3.3 動態文本處理方式

**問題**：如何處理來自 `compiled_facet.json` 的動態文本？

**解法**：
1. 所有動態文本必須在編譯階段（build time）就包含在 `compiled_facet.json` 的 `i18n` 字典中
2. UI 只讀取 i18n key，不進行 runtime 翻譯
3. 如果某個動態文本沒有 i18n key，Adapter 應回退到 key 字串本身（fail-soft）

### 3.4 原生語感保證機制

**如何確保英文非逐字翻譯**：
1. **內容產出階段**：由 R5（CN/EN 原生語感顧問）獨立產出英文文本
2. **驗收階段**：英文文本必須通過「原生語感檢查」（無翻譯腔、符合英文表達習慣）
3. **技術實現**：i18n 字典中的 `en-US` 欄位視為獨立內容資產，不依賴任何翻譯工具

---

## 4. `theme_config` 結構設計

### 4.1 完整結構定義

```json
{
  "theme_config": {
    "metaphor_id": "agriculture_v1",
    "primary_color": "#8B4513",
    "font_family": "Noto Serif SC",
    "assets": {
      "background_url": "/assets/themes/agriculture/background.jpg",
      "particle_texture": "/assets/themes/agriculture/particles.png",
      "border_pattern": "/assets/themes/agriculture/border.svg"
    },
    "typography": {
      "heading_font": "Noto Serif SC",
      "body_font": "Noto Sans SC",
      "font_size_scale": 1.0
    },
    "animations": {
      "transition_duration": 300,
      "easing": "ease-in-out"
    }
  }
}
```

### 4.2 隱喻解耦原則

**`metaphor_id` 的作用**：
- 識別視覺主題（如：`agriculture_v1`, `ocean_v1`, `cosmic_v1`）
- UI 不硬編碼任何單一隱喻，只讀取 `theme_config`
- 更換 `metaphor_id` 即可切換整個視覺宇宙

### 4.3 容錯機制（Fail-soft）

**Neutral Ritual Skin 定義**：

```json
{
  "NEUTRAL_THEME": {
    "metaphor_id": "neutral_ritual_skin",
    "primary_color": "#6B7280",
    "font_family": "system-ui",
    "assets": {},
    "typography": {
      "heading_font": "system-ui",
      "body_font": "system-ui",
      "font_size_scale": 1.0
    },
    "isNeutralFallback": true
  }
}
```

**降級策略**：
- `theme_config` 缺失 → 使用 Neutral Ritual Skin
- `primary_color` 格式錯誤 → 使用 Neutral Ritual Skin 的 `primary_color`
- `assets` 載入失敗 → 只停用該視覺效果，不阻斷流程

---

## 5. 至少 2 組完整的範例 JSON

### 5.1 範例 A：Normal Risk（正常風險等級）

**文件位置**：`examples/normal_risk_sample.json`（建議路徑）

```json
{
  "facet_id": "income_expansion_pressure",
  "risk_level": "NORMAL",
  "theme_config": {
    "metaphor_id": "agriculture_v1",
    "primary_color": "#8B4513",
    "font_family": "Noto Serif SC",
    "assets": {
      "background_url": "/assets/themes/agriculture/background.jpg",
      "particle_texture": "/assets/themes/agriculture/particles.png"
    },
    "typography": {
      "heading_font": "Noto Serif SC",
      "body_font": "Noto Sans SC",
      "font_size_scale": 1.0
    }
  },
  "i18n": {
    "facet_title": {
      "zh-TW": "事業擴張壓力",
      "en-US": "Career Expansion Pressure"
    },
    "compass_guide": {
      "zh-TW": "請凝視盤面，選出三個最有感的符碼",
      "en-US": "Gaze into the circle, select three symbols that call to you."
    },
    "stage3_question_1_title": {
      "zh-TW": "此刻的你，更像哪一種狀態？",
      "en-US": "In this moment, which state resonates with you?"
    },
    "l1_title": {
      "zh-TW": "天象",
      "en-US": "The Atmosphere"
    },
    "l1_body_variant_1": {
      "zh-TW": "此時天象為大旱，倉廩微裂...",
      "en-US": "The heavens show a great drought, the granary shows slight cracks..."
    },
    "l2_title": {
      "zh-TW": "物象",
      "en-US": "The Manifestation"
    },
    "l2_body": {
      "zh-TW": "溝渠淤積，水流不轉，倉門緊鎖...",
      "en-US": "The channels are silted, the water does not flow, the granary doors are locked..."
    },
    "l3_title": {
      "zh-TW": "干擾",
      "en-US": "The Fog"
    },
    "l3_body": {
      "zh-TW": "熱浪虛景，山林迷霧遮眼，勿誤逐鬼火...",
      "en-US": "Heat mirages, mountain mists cloud the eyes, do not mistake will-o'-the-wisps..."
    },
    "l4_title": {
      "zh-TW": "姿態",
      "en-US": "The Stance"
    },
    "l4_dynamic_body": {
      "zh-TW": "宜止息播種，先護根，守中養根，避風保本。",
      "en-US": "Allow the field to rest, tend to the roots, hold steady and preserve the core, guard against storms."
    }
  },
  "stage2_compass": {
    "symbols": [
      {
        "id": "symbol_authority",
        "label_key": "symbol_authority_label",
        "svg_ref": "authority.svg",
        "track": "INNER"
      },
      {
        "id": "symbol_power",
        "label_key": "symbol_power_label",
        "svg_ref": "power.svg",
        "track": "MIDDLE"
      }
      // ... 更多符碼（總共 20-30 個）
    ],
    "rules": {
      "select_max": 3,
      "select_min": 2
    }
  },
  "stage3_projection": {
    "questions": [
      {
        "id": "q1",
        "title_key": "stage3_question_1_title",
        "prompt_key": "stage3_question_1_prompt",
        "question_type": "SINGLE",
        "options": [
          {
            "id": "opt1",
            "label_key": "option_state_a",
            "scene_key": "option_state_a_scene"
          },
          {
            "id": "opt2",
            "label_key": "option_state_b",
            "scene_key": "option_state_b_scene"
          }
        ]
      }
      // ... 更多題目
    ]
  },
  "stage4_results": {
    "layers": {
      "l1": {
        "title_key": "l1_title",
        "body_key": "l1_body_variant_1",
        "variants": [
          { "title_key": "l1_title", "body_key": "l1_body_variant_1" },
          { "title_key": "l1_title", "body_key": "l1_body_variant_2" },
          { "title_key": "l1_title", "body_key": "l1_body_variant_3" }
        ]
      },
      "l2": {
        "title_key": "l2_title",
        "body_key": "l2_body"
      },
      "l3": {
        "title_key": "l3_title",
        "body_key": "l3_body"
      },
      "l4": {
        "title_key": "l4_title",
        "dynamic_body_key": "l4_dynamic_body"
        // 注意：NORMAL Risk 時，dynamic_body_key 可用
        // HIGH Risk 時，此欄位必須被 RiskOverride Interceptor 丟棄
      }
    }
  }
}
```

### 5.2 範例 B：High Risk（高風險等級）

**文件位置**：`examples/high_risk_sample.json`（建議路徑）

```json
{
  "facet_id": "relationship_imbalance",
  "risk_level": "HIGH",
  "theme_config": {
    "metaphor_id": "ocean_v1",
    "primary_color": "#1E3A8A",
    "font_family": "Noto Serif SC",
    "assets": {
      "background_url": "/assets/themes/ocean/background.jpg",
      "particle_texture": "/assets/themes/ocean/particles.png"
    },
    "typography": {
      "heading_font": "Noto Serif SC",
      "body_font": "Noto Sans SC",
      "font_size_scale": 1.0
    }
  },
  "i18n": {
    "facet_title": {
      "zh-TW": "關係失衡",
      "en-US": "Relationship Imbalance"
    },
    "compass_guide": {
      "zh-TW": "請凝視盤面，選出三個最有感的符碼",
      "en-US": "Gaze into the circle, select three symbols that call to you."
    },
    "l4_safety_template_a": {
      "zh-TW": "宜暫停自判，轉向外部守護者。",
      "en-US": "Seek an external keeper of balance."
    },
    "l4_safety_template_b": {
      "zh-TW": "此刻風暴太急，強辨方位只會越走越偏。不要急著與狂風較勁，也不必立刻修補碎裂的籬笆。當下的吉凶法則，是一字：「歸」。先退回內心最堅固的角落，或尋一處可暫避的信標，借光定心。有些風雨不靠肉身硬撐，先求庇護，再談整田。",
      "en-US": "The storm is too fierce now; forcing direction will only lead further astray. Do not rush to contend with the gale, nor hasten to mend the shattered fence. The rule of fortune in this moment is one word: 'Return.' Retreat to the innermost corner of your heart, or find a beacon to shelter by, borrowing its light to steady your mind. Some storms are not borne by flesh alone; seek shelter first, then tend to the field."
    }
  },
  "stage2_compass": {
    "symbols": [
      // ... 符碼列表（與 Normal Risk 範例類似）
    ],
    "rules": {
      "select_max": 3,
      "select_min": 2
    }
  },
  "stage3_projection": {
    "questions": [
      // ... 題目列表（與 Normal Risk 範例類似）
    ]
  },
  "stage4_results": {
    "layers": {
      "l1": {
        "title_key": "l1_title",
        "body_key": "l1_body_variant_1",
        "variants": [
          // ... 至少 3 組變體
        ]
      },
      "l2": {
        "title_key": "l2_title",
        "body_key": "l2_body"
      },
      "l3": {
        "title_key": "l3_title",
        "body_key": "l3_body"
      },
      "l4": {
        "title_key": "l4_title",
        "dynamic_body_key": "l4_dynamic_body"
        // ⚠️ 重要：HIGH Risk 時，此 dynamic_body_key 必須被 RiskOverride Interceptor 丟棄
        // RiskOverride Interceptor 會注入 safety_template_id 和 safety_body_key
      }
    }
  }
}
```

**關鍵差異**：
- `risk_level: "HIGH"`（而非 `"NORMAL"`）
- L4 可能包含 `dynamic_body_key`（但必須被 RiskOverride Interceptor 丟棄）
- 必須包含安全模板的 i18n key（`l4_safety_template_a`, `l4_safety_template_b`）

---

## 6. Fail-soft 規則（最小降級策略）

Adapter 必須保證以下 fail-soft 行為：

| 情境 | Fallback 行為 | 驗收標準 |
| --- | --- | --- |
| `theme_config` 缺失或錯誤 | 使用 Neutral Ritual Skin | UI 不白屏，基本功能可用 |
| `i18n` 缺 key | 回退到 key 字串本身 | UI 顯示 key（如：`btn_confirm`），不崩潰 |
| `stage2_compass.symbols` 缺資料 | 顯示「資料缺失」引導，不白屏 | 顯示占位內容，使用者知道資料缺失 |
| `stage3_projection.questions` 缺資料 | 跳過 Stage 3 或顯示占位卡，不崩潰 | 流程可繼續，不卡死 |
| `stage4_results.layers` 缺資料 | 至少保留 L1 占位（安全文案） | 至少顯示 L1，不白屏 |

---

## 7. 資料結構擴展性說明

### 7.1 如何新增欄位（版本控制、向後相容）

**版本控制策略**：
- 使用 `domainVersion` 欄位（如：`"1.0"`, `"1.1"`）標註 Schema 版本
- 新增欄位時，必須標註為 `optional`（不在 `required` 列表中）
- 舊版 Adapter 應忽略未知欄位，不報錯（fail-soft）

**向後相容保證**：
```typescript
// Adapter 應支援版本兼容
function normalizeAndMask(raw: any): FacetViewModel {
  const version = raw.domainVersion || '1.0';
  
  // 根據版本選擇不同的處理邏輯
  if (version === '1.0') {
    return normalizeV1_0(raw);
  } else if (version === '1.1') {
    return normalizeV1_1(raw); // 新版本可能有額外欄位
  }
  
  // 預設回退到最新版本
  return normalizeV1_1(raw);
}
```

### 7.2 如何擴展 `theme_config`（新增隱喻類型）

**步驟**：
1. 新增隱喻 ID（如：`cosmic_v1`）
2. 在 `theme_config.assets` 中新增對應的視覺資產
3. Theme Engine 自動讀取並應用（不需要修改程式碼）

**擴展成本**：**零代碼修改**（只需新增 JSON 欄位）

### 7.3 如何擴展 i18n（新增語言）

**步驟**：
1. 在 `i18n` 字典中為每個 key 新增語言欄位（如：`ja-JP`）
2. i18nManager 支援多語言切換（擴展 `Locale` 類型）
3. UI 自動適應新語言（因為使用 key 取值）

**擴展成本**：**低**（只需擴展 i18n 字典和 Locale 類型）

---

## 8. 與上游文件的對齊關係（Traceability）

本文件與以下文件的對齊關係：

- **技術規格結案包**：`P0-5/P0-5_TECHNICAL_SPEC_CLOSURE_PACK.md` 第 3 章「D1: UMIP UI Schema」
  - ✅ 對齊：UMIP Schema v1 完整定義要求
  - ✅ 對齊：Fail-soft Fallback 行為定義

- **UMIP 結案報告**：`P0-5/P0-5_UMIP_CLOSURE_REPORT.md` 第 3 章「資料驅動視覺」、第 4 章「Stage 規格」、第 5 章「結果呈現規格」
  - ✅ 對齊：`theme_config` 結構設計
  - ✅ 對齊：Stage 2/3/4 資料結構設計
  - ✅ 對齊：L1-L4 結果呈現結構設計

- **現有 Schema**：`schemas/compiled_facet.schema.json`
  - ⚠️ 現有 Schema 較簡單，需擴展為本文件定義的完整 UMIP Schema v1

---

## 9. 可修改與可回滾聲明

**本文件所有資料結構定義均為「可修改」「可回滾」**：

- **可修改**：所有欄位定義、約束規則、fallback 行為均可根據實際需求調整
- **可回滾**：所有資料結構變更均可回滾，但必須以 ADR 記錄變更原因與影響範圍
- **影響範圍**：資料結構變更需評估對 Adapter 和 Components 的影響，確保向後相容

**回滾機制**：
- 若某個欄位不符合需求，可移除或修改，但需 ADR 記錄
- 若 Fail-soft 規則不符合需求，可調整降級策略，但需 ADR 記錄
- 若版本控制策略不符合需求，可改用其他策略，但需 ADR 記錄

---

**End of SPEC-2**

