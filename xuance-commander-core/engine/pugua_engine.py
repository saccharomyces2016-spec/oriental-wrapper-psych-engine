"""
譜掛系統診斷引擎 (PuGua Diagnostic Engine)

核心功能：
- 符號盤輸入解析
- 多項量加權計算
- 六爻卦象生成
- 東方語言敘事生成
"""

import json
import math
from typing import Dict, List, Optional, Tuple, Any
from dataclasses import dataclass
from enum import Enum

class AttributionType(Enum):
    INTERNAL = "internal"
    EXTERNAL = "external"
    MIXED = "mixed"

class RigidityState(Enum):
    FLUID = "fluid"
    LOCKED = "locked"
    CRITICAL = "critical"

@dataclass
class DiagnosticResult:
    """診斷結果數據結構"""
    hexagram: Dict[str, Any]
    severity: float
    attribution: AttributionType
    agency: float
    dominant_facet: str
    six_kin: Dict[int, str]
    yongshen: str
    relation_function: Dict[str, float]
    pressure_distribution: Dict[str, float]
    confidence: float
    narrative: Dict[str, str]

class PuGuaEngine:
    """譜掛系統核心引擎"""

    def __init__(self):
        # 載入符號庫
        with open('symbol_library/symbols_phaseA_complete.json', 'r', encoding='utf-8') as f:
            self.phaseA_symbols = json.load(f)

        with open('symbol_library/symbols_phaseB_sample.json', 'r', encoding='utf-8') as f:
            self.phaseB_symbols = json.load(f)

        # 載入 Facet 映射
        # TODO: 載入現有的 Facet 定義

    def diagnose(self, user_input: Dict[str, Any]) -> DiagnosticResult:
        """
        主要診斷函數

        Args:
            user_input: 使用者輸入數據，包含 Phase A/B/C 的選擇

        Returns:
            DiagnosticResult: 完整的診斷結果
        """

        # ===== Phase A 處理 =====
        phaseA_result = self._process_phaseA(user_input.get('phaseA', {}))

        # ===== Phase B 處理 =====
        phaseB_result = self._process_phaseB(user_input.get('phaseB', {}))

        # ===== Phase C 處理 =====
        phaseC_result = self._process_phaseC(user_input.get('phaseC', {}))

        # ===== 綜合計算 =====
        combined_result = self._combine_phases(
            phaseA_result, phaseB_result, phaseC_result
        )

        # ===== 生成卦象 =====
        hexagram = self._generate_hexagram(combined_result)

        # ===== 生成六親 =====
        six_kin = self._generate_six_kin(hexagram)

        # ===== 選取用神 =====
        yongshen = self._select_yongshen(
            user_input.get('theme', 'general'),
            six_kin
        )

        # ===== 生成敘事 =====
        narrative = self._generate_narrative(
            hexagram, combined_result, six_kin, yongshen
        )

        return DiagnosticResult(
            hexagram=hexagram,
            severity=combined_result['severity'],
            attribution=combined_result['attribution'],
            agency=combined_result['agency'],
            dominant_facet=combined_result['dominant_facet'],
            six_kin=six_kin,
            yongshen=yongshen,
            relation_function=combined_result['relation_function'],
            pressure_distribution=combined_result['pressure_distribution'],
            confidence=phaseC_result['confidence'],
            narrative=narrative
        )

    def _process_phaseA(self, phaseA_data: Dict[str, Any]) -> Dict[str, Any]:
        """處理八象盤輸入"""

        selections = phaseA_data.get('selections', [])

        # 收集所有符號權重
        symbol_weights = []
        bagua_counts = {}

        for selection in selections:
            bagua = selection['bagua']
            symbols = selection.get('symbols', [])
            weight = selection.get('weight', 1.0)

            # 統計八卦選擇
            bagua_counts[bagua] = bagua_counts.get(bagua, 0) + weight

            # 收集符號權重
            for symbol in symbols:
                symbol_data = self._get_symbol_data('phaseA', symbol)
                if symbol_data:
                    symbol_weights.append(symbol_data['vectors']['weight'] * weight)

        # 計算平均 severity
        avg_severity = sum(symbol_weights) / len(symbol_weights) if symbol_weights else 0.5

        # 確定主要八卦
        primary_bagua = max(bagua_counts, key=bagua_counts.get) if bagua_counts else 'Kun'

        return {
            'severity_base': avg_severity,
            'primary_bagua': primary_bagua,
            'bagua_distribution': bagua_counts,
            'symbol_weights': symbol_weights
        }

    def _process_phaseB(self, phaseB_data: Dict[str, Any]) -> Dict[str, Any]:
        """處理六十四狀態盤輸入"""

        primary_state = phaseB_data.get('primary', '')
        secondary_states = phaseB_data.get('secondary', [])
        direction = phaseB_data.get('direction', 0)  # -1 到 1，負數偏內部
        role_tokens = phaseB_data.get('role_tokens', [])

        # 獲取狀態符數據
        primary_data = self._get_symbol_data('phaseB', primary_state)
        secondary_data_list = [
            self._get_symbol_data('phaseB', state)
            for state in secondary_states
        ]

        # 計算綜合指標
        all_weights = []
        if primary_data:
            all_weights.append(primary_data['vectors']['severity'] * 1.2)  # 主象加權

        for data in secondary_data_list:
            if data:
                all_weights.append(data['vectors']['severity'])

        # 計算 severity
        severity = sum(all_weights) / len(all_weights) if all_weights else 0.5

        # 計算 attribution（考慮方向滑桿）
        attribution_scores = []
        if primary_data:
            attr = primary_data['vectors']['attribution']
            attribution_scores.append(self._attribution_to_score(attr))

        for data in secondary_data_list:
            if data:
                attr = data['vectors']['attribution']
                attribution_scores.append(self._attribution_to_score(attr))

        avg_attribution = sum(attribution_scores) / len(attribution_scores) if attribution_scores else 0
        # 加上方向調整
        final_attribution_score = avg_attribution + direction

        # 轉換為 AttributionType
        if final_attribution_score < -0.3:
            attribution = AttributionType.INTERNAL
        elif final_attribution_score > 0.3:
            attribution = AttributionType.EXTERNAL
        else:
            attribution = AttributionType.MIXED

        # 計算 agency
        agency_scores = []
        if primary_data:
            agency_scores.append(primary_data['vectors']['agency'])

        for data in secondary_data_list:
            if data:
                agency_scores.append(data['vectors']['agency'])

        agency = sum(agency_scores) / len(agency_scores) if agency_scores else 0.5

        # 處理關係角色
        relation_function = {}
        role_mappings = {
            '長輩': {'父母': 0.8},
            '上司': {'官鬼': 0.8},
            '伴侶': {'妻財': 0.7},
            '平輩': {'兄弟': 0.6},
            '晚輩': {'子孫': 0.6}
        }

        for role in role_tokens:
            if role in role_mappings:
                relation_function.update(role_mappings[role])

        return {
            'severity': severity,
            'attribution': attribution,
            'attribution_score': final_attribution_score,
            'agency': agency,
            'relation_function': relation_function,
            'primary_state': primary_state,
            'secondary_states': secondary_states
        }

    def _process_phaseC(self, phaseC_data: Dict[str, Any]) -> Dict[str, Any]:
        """處理錨定盤輸入"""

        anchors = phaseC_data.get('anchors', [])
        confidence = phaseC_data.get('confidence', 0.7)

        # 根據錨定詞調整歸因
        anchor_adjustments = {
            '我想要逃離': {'attribution': -0.2, 'agency': -0.1},  # 偏內部
            '我覺得是對方的錯': {'attribution': 0.2, 'agency': 0.1},  # 偏外部
            '我應該更成熟': {'attribution': -0.3, 'agency': 0.1},  # 內部責任
            '我很沒用': {'attribution': -0.4, 'agency': -0.2},  # 內部自責
            '我需要更多支持': {'attribution': 0.1, 'agency': -0.1}  # 混合
        }

        adjustments = {'attribution': 0, 'agency': 0}
        for anchor in anchors:
            if anchor in anchor_adjustments:
                adj = anchor_adjustments[anchor]
                adjustments['attribution'] += adj['attribution']
                adjustments['agency'] += adj['agency']

        return {
            'confidence': confidence,
            'anchor_adjustments': adjustments
        }

    def _combine_phases(self, phaseA: Dict, phaseB: Dict, phaseC: Dict) -> Dict[str, Any]:
        """綜合三階段結果"""

        # 綜合 severity（Phase A 和 B 加權平均）
        severity_a = phaseA.get('severity_base', 0.5)
        severity_b = phaseB.get('severity', 0.5)
        combined_severity = (severity_a * 0.4 + severity_b * 0.6)

        # 綜合 attribution（Phase B 為主，Phase C 調整）
        attribution = phaseB.get('attribution', AttributionType.MIXED)
        attribution_score = phaseB.get('attribution_score', 0)
        attribution_score += phaseC.get('anchor_adjustments', {}).get('attribution', 0)

        # 重新判定 attribution
        if attribution_score < -0.3:
            final_attribution = AttributionType.INTERNAL
        elif attribution_score > 0.3:
            final_attribution = AttributionType.EXTERNAL
        else:
            final_attribution = AttributionType.MIXED

        # 綜合 agency
        agency = phaseB.get('agency', 0.5)
        agency += phaseC.get('anchor_adjustments', {}).get('agency', 0)
        agency = max(0, min(1, agency))  # 限制在 0-1

        # 確定 dominant facet（簡化版）
        # TODO: 實作更複雜的 facet 匹配邏輯
        dominant_facet = "chronic_depletion"  # 預設值

        # 綜合 relation function
        relation_function = phaseB.get('relation_function', {})

        # 計算 pressure distribution（簡化）
        pressure_distribution = {
            "internal_standard": 0.5,
            "external_authority": 0.3,
            "resource_lack": 0.2
        }

        return {
            'severity': combined_severity,
            'attribution': final_attribution,
            'agency': agency,
            'dominant_facet': dominant_facet,
            'relation_function': relation_function,
            'pressure_distribution': pressure_distribution
        }

    def _generate_hexagram(self, combined_result: Dict[str, Any]) -> Dict[str, Any]:
        """生成六爻卦象"""

        severity = combined_result['severity']
        attribution = combined_result['attribution']

        # 根據 severity 和 attribution 生成卦象
        # 簡化邏輯：映射到現有的 64 卦

        hexagram_mappings = {
            ('low', 'internal'): {'id': 'hex_01', 'name': '坤為地', 'description': '柔順包容'},
            ('low', 'external'): {'id': 'hex_02', 'name': '地雷復', 'description': '復甦新生'},
            ('low', 'mixed'): {'id': 'hex_03', 'name': '地水師', 'description': '眾志成城'},
            ('medium', 'internal'): {'id': 'hex_04', 'name': '山水蒙', 'description': '啟蒙學習'},
            ('medium', 'external'): {'id': 'hex_05', 'name': '風水渙', 'description': '分散化解'},
            ('medium', 'mixed'): {'id': 'hex_06', 'name': '天水訟', 'description': '爭執不合'},
            ('high', 'internal'): {'id': 'hex_07', 'name': '地火明夷', 'description': '明傷不顯'},
            ('high', 'external'): {'id': 'hex_08', 'name': '山地剝', 'description': '剝落衰退'},
            ('high', 'mixed'): {'id': 'hex_09', 'name': '雷地豫', 'description': '豫備安樂'}
        }

        # 將數值轉換為分類
        severity_level = 'low' if severity < 0.4 else 'medium' if severity < 0.7 else 'high'
        attribution_key = attribution.value

        hexagram = hexagram_mappings.get((severity_level, attribution_key),
                                       hexagram_mappings[('medium', 'mixed')])

        return hexagram

    def _generate_six_kin(self, hexagram: Dict[str, Any]) -> Dict[int, str]:
        """生成六親配置"""

        # 簡化邏輯：根據卦象類型分配六親
        hexagram_name = hexagram.get('name', '')

        if '坤' in hexagram_name:
            return {1: '父母', 2: '兄弟', 3: '子孫', 4: '妻財', 5: '官鬼', 6: '父母'}
        elif '乾' in hexagram_name:
            return {1: '子孫', 2: '妻財', 3: '官鬼', 4: '父母', 5: '兄弟', 6: '子孫'}
        else:
            # 預設配置
            return {1: '父母', 2: '兄弟', 3: '官鬼', 4: '父母', 5: '妻財', 6: '兄弟'}

    def _select_yongshen(self, theme: str, six_kin: Dict[int, str]) -> str:
        """選取用神"""

        theme_mappings = {
            'career': '官鬼',
            'wealth': '妻財',
            'relationship': '妻財',
            'authority': '父母',
            'creativity': '子孫',
            'general': '官鬼'
        }

        target_kin = theme_mappings.get(theme, '官鬼')

        # 找到用神在第幾爻
        for position, kin in six_kin.items():
            if kin == target_kin:
                return f"{target_kin}（第{position}爻）"

        return f"{target_kin}（第3爻）"  # 預設

    def _generate_narrative(self, hexagram: Dict, combined_result: Dict,
                           six_kin: Dict, yongshen: str) -> Dict[str, str]:
        """生成東方語言敘事"""

        severity = combined_result['severity']
        attribution = combined_result['attribution']

        # 主象敘事
        hexagram_name = hexagram.get('name', '未知卦')
        primary_narrative = f"卦象：{hexagram_name}。{hexagram.get('description', '')}"

        # 內外勢分析
        if attribution == AttributionType.INTERNAL:
            inner_outer = "內勢較重，外勢輔助。問題根源多來自自我要求與內在標準。"
        elif attribution == AttributionType.EXTERNAL:
            inner_outer = "外勢較重，內勢受制。問題主要來自環境壓力與他人期望。"
        else:
            inner_outer = "內外勢平衡，問題源於多重因素的交織影響。"

        # 建議生成
        if severity > 0.7:
            advice = "宜守不宜進，先固本培元，再圖發展。"
        elif severity > 0.4:
            advice = "可進可守，視時機而動，適度調整。"
        else:
            advice = "宜進不宜守，大好時機，可積極開展。"

        # 風險鏈
        if severity > 0.7:
            riskchain = "若不調整，可能導致進一步耗竭與崩潰。"
        elif severity > 0.4:
            riskchain = "若忽視問題，可能演變為更複雜的困局。"
        else:
            riskchain = "整體穩定，但仍需留意細節變化。"

        return {
            'primary': primary_narrative,
            'inner_outer': inner_outer,
            'advice': advice,
            'riskchain': riskchain,
            'yongshen_analysis': f"用神為{yongshen}，代表當前關注焦點。"
        }

    def _get_symbol_data(self, phase: str, symbol_key: str) -> Optional[Dict[str, Any]]:
        """獲取符號數據"""

        if phase == 'phaseA':
            for symbol in self.phaseA_symbols:
                if symbol['character_zh'] == symbol_key:
                    return symbol
        elif phase == 'phaseB':
            for symbol in self.phaseB_symbols:
                if symbol['compound_zh'] == symbol_key:
                    return symbol

        return None

    def _attribution_to_score(self, attribution: str) -> float:
        """將 attribution 轉換為數值分數"""

        mapping = {
            'internal': -1.0,
            'external': 1.0,
            'mixed': 0.0
        }

        return mapping.get(attribution, 0.0)

# 使用範例
if __name__ == "__main__":
    engine = PuGuaEngine()

    # 模擬使用者輸入
    user_input = {
        "theme": "career",
        "phaseA": {
            "selections": [
                {"bagua": "Kan", "symbols": ["困", "重"], "weight": 0.8},
                {"bagua": "Kun", "symbols": ["壓", "撐"], "weight": 0.6}
            ]
        },
        "phaseB": {
            "primary": "困內",
            "secondary": ["嚴壓", "累逃"],
            "direction": -0.6,
            "role_tokens": ["長輩", "上司"]
        },
        "phaseC": {
            "anchors": ["我想要逃離", "我覺得是對方的錯"],
            "confidence": 0.7
        }
    }

    result = engine.diagnose(user_input)

    print(f"卦象: {result.hexagram}")
    print(f"嚴重度: {result.severity}")
    print(f"歸因傾向: {result.attribution}")
    print(f"能動性: {result.agency}")
    print(f"主要面向: {result.dominant_facet}")
    print(f"用神: {result.yongshen}")
    print(f"敘事: {result.narrative['primary']}")