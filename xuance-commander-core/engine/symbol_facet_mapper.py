"""
東方玄學心理引擎：符號到 Facet 映射與 GAP 分析

核心功能：
- 支援4階段符號選擇系統
- 實現GAP分析邏輯（內在能量 vs. 行為成本）
- 生成陰陽定錨建議
- 計算綜合指標（Severity, Attribution, Agency）
- 生成卦象和六親
"""

import json
import math
from typing import Dict, List, Optional, Any
from enum import Enum

class AttributionType(Enum):
    INTERNAL = "internal"
    EXTERNAL = "external"
    MIXED = "mixed"

class YinYangDirection(Enum):
    YIN = "yin"  # 向內修
    YANG = "yang"  # 向外衝

class PsychologicalEngine:
    """東方玄學心理引擎"""

    def __init__(self):
        # 載入符號庫
        try:
            with open('symbol_library/symbols_phaseA_complete.json', 'r', encoding='utf-8') as f:
                self.phaseA_symbols = json.load(f)
        except:
            self.phaseA_symbols = []

        try:
            with open('symbol_library/symbols_stage2a_driver.json', 'r', encoding='utf-8') as f:
                self.stage2a_symbols = json.load(f)
        except:
            self.stage2a_symbols = []

        try:
            with open('symbol_library/symbols_stage2b_environment.json', 'r', encoding='utf-8') as f:
                self.stage2b_symbols = json.load(f)
        except:
            self.stage2b_symbols = []

        try:
            with open('symbol_library/symbols_stage3_behavior.json', 'r', encoding='utf-8') as f:
                self.stage3_symbols = json.load(f)
        except:
            self.stage3_symbols = []

        # 載入 Facet 定義
        self.facet_db = self._load_facet_definitions()

    def _load_facet_definitions(self):
        """載入 Facet 定義"""
        facets = [
            "chronic_depletion", "stress_recovery", "loss_of_agency",
            "hyper_responsibility", "creative_blockage", "identity_diffusion",
            "suppressed_needs", "void_drifting", "meaning_vacuum",
            "social_comparison", "fear_based_stability", "resource_scarcity_mode",
            "apathy_stagnation", "grief_stagnation", "perfectionism_paralysis",
            "impostor_syndrome", "anger_dysregulation", "shame_spiral",
            "guilt_accumulation", "sleep_rhythm_chaos", "attachment_rupture",
            "trust_erosion", "betrayal_wound"
        ]
        return {facet: {} for facet in facets}

    def diagnose_comprehensive(self, theme: str, stage1_selections: List[Dict],
                             stage2a_selections: List[str], stage2b_selections: List[str],
                             stage3_selections: List[str]) -> Dict[str, Any]:
        """
        綜合心理診斷主函數（支援4階段）

        Args:
            theme: 占問主題（財/情/業/家/人/身/學/運）
            stage1_selections: 第一階段八卦領域選擇
            stage2a_selections: 第二階段內在狀態選擇
            stage2b_selections: 第二階段外在環境選擇
            stage3_selections: 第三階段行為策略選擇

        Returns:
            完整的診斷結果
        """

        # 階段處理
        stage1_result = self._process_stage1_battlefield(stage1_selections)
        stage2a_result = self._process_stage2a_driver_status(stage2a_selections)
        stage2b_result = self._process_stage2b_environment(stage2b_selections)
        stage3_result = self._process_stage3_behavior(stage3_selections)

        # GAP 分析
        gap_analysis = self._perform_gap_analysis(stage2a_result, stage2b_result, stage3_result)

        # 陰陽定錨
        anchoring_result = self._determine_yin_yang_direction(gap_analysis)

        # 生成卦象
        hexagram_result = self._generate_hexagram_comprehensive(stage1_result, gap_analysis)

        # 生成六親
        six_kin = self._generate_six_kin(hexagram_result)

        # 選取用神
        yongshen = self._select_yongshen(theme, six_kin)

        return {
            "diagnosis": {
                "battlefield": stage1_result,
                "driver_status": stage2a_result,
                "environment": stage2b_result,
                "behavior": stage3_result,
                "gap_analysis": gap_analysis,
                "anchoring": anchoring_result
            },
            "hexagram": hexagram_result,
            "six_kin": six_kin,
            "yongshen": yongshen,
            "theme": theme
        }

    def diagnose(self, theme: str, phaseA_selections: List[Dict], phaseB_data: Dict) -> Dict[str, Any]:
        """向後相容的舊版診斷方法"""
        return self.diagnose_comprehensive(theme, phaseA_selections, [], [], [])

    def _process_stage1_battlefield(self, selections: List[Dict]) -> Dict[str, Any]:
        """處理第一階段：鎖定戰場"""

        all_symbols = []
        battlefield_weights = {}

        for selection in selections:
            battlefield = selection.get("battlefield", "")
            symbols = selection.get("symbols", [])
            weight = selection.get("weight", 1.0)

            battlefield_weights[battlefield] = weight

            for symbol_char in symbols:
                symbol_data = self._find_symbol_by_char(symbol_char, "phaseA")
                if symbol_data:
                    all_symbols.append(symbol_data)

        # 計算綜合指標
        if all_symbols:
            severity = sum(s["vectors"]["weight"] for s in all_symbols) / len(all_symbols)
            agency = sum(s["vectors"]["agency"] for s in all_symbols) / len(all_symbols)

            attribution_counts = {}
            for s in all_symbols:
                attr = s["vectors"]["attribution"]
                attribution_counts[attr] = attribution_counts.get(attr, 0) + 1
            dominant_attr = max(attribution_counts, key=attribution_counts.get)

            facet_scores = self._calculate_facet_scores(all_symbols)
            dominant_facet = max(facet_scores, key=facet_scores.get) if facet_scores else "chronic_depletion"

        else:
            severity = 0.5
            agency = 0.5
            dominant_attr = "mixed"
            dominant_facet = "chronic_depletion"

        return {
            "severity": severity,
            "agency": agency,
            "attribution": dominant_attr,
            "dominant_facet": dominant_facet,
            "battlefield_weights": battlefield_weights,
            "symbol_count": len(all_symbols)
        }

    def _process_stage2a_driver_status(self, selections: List[str]) -> Dict[str, Any]:
        """處理第二階段A：駕駛員掃描（內在狀態）"""

        symbols_data = []
        for symbol_char in selections:
            symbol_data = self._find_symbol_by_char(symbol_char, "stage2a")
            if symbol_data:
                symbols_data.append(symbol_data)

        if not symbols_data:
            return {
                "energy": 0.5,
                "clarity": 0.5,
                "action_potential": 0.5,
                "driver_score": 0.5
            }

        # 計算三軸指標
        energy_values = [s["vectors"]["agency"] for s in symbols_data if "agency" in s["vectors"]]
        clarity_values = [s["vectors"]["clarity"] for s in symbols_data if "clarity" in s["vectors"]]
        action_values = [s["vectors"]["action_potential"] for s in symbols_data if "action_potential" in s["vectors"]]

        energy = sum(energy_values) / len(energy_values) if energy_values else 0.5
        clarity = sum(clarity_values) / len(clarity_values) if clarity_values else 0.5
        action_potential = sum(action_values) / len(action_values) if action_values else 0.5

        # 關鍵規則：若選中「虛」，能量強制扣減
        if any(s["character_zh"] == "虛" for s in symbols_data):
            energy = min(energy, -0.5)
            action_potential = min(action_potential, -0.5)

        # 關鍵規則：若選中「滯」，行動力強制癱瘓
        if any(s["character_zh"] == "滯" for s in symbols_data):
            action_potential = min(action_potential, -0.5)

        driver_score = (energy + clarity + action_potential) / 3

        return {
            "energy": energy,
            "clarity": clarity,
            "action_potential": action_potential,
            "driver_score": driver_score,
            "selected_symbols": [s["character_zh"] for s in symbols_data]
        }

    def _process_stage2b_environment(self, selections: List[str]) -> Dict[str, Any]:
        """處理第二階段B：路況掃描（外在環境）"""

        symbols_data = []
        for symbol_char in selections:
            symbol_data = self._find_symbol_by_char(symbol_char, "stage2b")
            if symbol_data:
                symbols_data.append(symbol_data)

        if not symbols_data:
            return {
                "hardness_sum": 7.5,  # 中間值
                "urgency_sum": 7.5,
                "risk_level": "stable"
            }

        # 計算硬度與急迫度
        hardness_values = [s["vectors"]["hardness"] for s in symbols_data if "hardness" in s["vectors"]]
        urgency_values = [s["vectors"]["urgency"] for s in symbols_data if "urgency" in s["vectors"]]

        hardness_sum = sum(hardness_values) if hardness_values else 7.5
        urgency_sum = sum(urgency_values) if urgency_values else 7.5

        # 風險等級判定
        if hardness_sum >= 12 or urgency_sum >= 12:
            risk_level = "critical"
        elif hardness_sum >= 8 or urgency_sum >= 8:
            risk_level = "high"
        else:
            risk_level = "stable"

        return {
            "hardness_sum": hardness_sum,
            "urgency_sum": urgency_sum,
            "risk_level": risk_level,
            "selected_symbols": [s["character_zh"] for s in symbols_data]
        }

    def _process_stage3_behavior(self, selections: List[str]) -> Dict[str, Any]:
        """處理第三階段：行為掃描（策略執行）"""

        symbols_data = []
        for symbol_char in selections:
            symbol_data = self._find_symbol_by_char(symbol_char, "stage3")
            if symbol_data:
                symbols_data.append(symbol_data)

        if not symbols_data:
            return {
                "cost_factor": 2.5,  # 中間值
                "time_sensitivity": "medium",
                "action_type": "balanced",
                "agency_required": 0.5
            }

        # 計算行為特徵
        cost_factors = [s["vectors"]["cost_factor"] for s in symbols_data if "cost_factor" in s["vectors"]]
        agency_required = [s["vectors"]["agency_required"] for s in symbols_data if "agency_required" in s["vectors"]]

        avg_cost = sum(cost_factors) / len(cost_factors) if cost_factors else 2.5
        avg_agency = sum(agency_required) / len(agency_required) if agency_required else 0.5

        # 決定主要行為類型
        action_types = [s["vectors"]["action_type"] for s in symbols_data if "action_type" in s["vectors"]]
        main_action_type = max(set(action_types), key=action_types.count) if action_types else "balanced"

        return {
            "cost_factor": avg_cost,
            "agency_required": avg_agency,
            "action_type": main_action_type,
            "selected_symbols": [s["character_zh"] for s in symbols_data]
        }

    def _process_phaseB(self, phaseB_data: Dict) -> Dict[str, Any]:
        """處理六十四卦狀態盤"""

        primary_symbol = phaseB_data.get("primary", "")
        secondary_symbols = phaseB_data.get("secondary", [])
        direction = phaseB_data.get("direction", 0)  # -1 到 1
        role_tokens = phaseB_data.get("role_tokens", [])

        # 獲取符號數據
        primary_data = self._find_symbol_by_compound(primary_symbol, "phaseB")
        secondary_data = [self._find_symbol_by_compound(s, "phaseB") for s in secondary_symbols]
        secondary_data = [s for s in secondary_data if s]  # 過濾 None

        all_symbols = []
        if primary_data:
            all_symbols.append(primary_data)
        all_symbols.extend(secondary_data)

        if all_symbols:
            # 計算綜合指標
            severity = sum(s["vectors"]["severity"] for s in all_symbols) / len(all_symbols)

            # Attribution 考慮方向滑桿
            attribution_scores = {}
            for s in all_symbols:
                attr = s["vectors"]["attribution"]
                attribution_scores[attr] = attribution_scores.get(attr, 0) + 1

            # 方向調整：負值偏內部，正值偏外部
            internal_score = attribution_scores.get("internal", 0)
            external_score = attribution_scores.get("external", 0)

            adjusted_internal = internal_score + (direction * -1) * 2
            adjusted_external = external_score + direction * 2

            if adjusted_internal > adjusted_external:
                final_attr = "internal"
            elif adjusted_external > adjusted_internal:
                final_attr = "external"
            else:
                final_attr = "mixed"

            # Agency
            agency = sum(s["vectors"]["agency"] for s in all_symbols) / len(all_symbols)

        else:
            severity = 0.5
            final_attr = "mixed"
            agency = 0.5

        # 處理關係角色
        relation_mapping = {
            "長輩": {"父母": 0.8},
            "上司": {"官鬼": 0.8},
            "伴侶": {"妻財": 0.7},
            "平輩": {"兄弟": 0.6},
            "晚輩": {"子孫": 0.6}
        }

        relation_function = {}
        for role in role_tokens:
            if role in relation_mapping:
                relation_function.update(relation_mapping[role])

        return {
            "severity": severity,
            "attribution": final_attr,
            "agency": agency,
            "relation_function": relation_function,
            "primary_symbol": primary_symbol,
            "direction": direction
        }

    def _perform_gap_analysis(self, driver_status: Dict, environment: Dict, behavior: Dict) -> Dict[str, Any]:
        """執行GAP分析：比較內在能量 vs. 行為成本"""

        action_potential = driver_status["action_potential"]  # 內在能量 (-1 到 1)
        cost_factor = behavior["cost_factor"]  # 行為成本 (0-5)

        # 正規化比較（將兩者轉換到相同尺度）
        # action_potential: -1(極弱) 到 1(極強)
        # cost_factor: 0(無成本) 到 5(極高成本)
        normalized_energy = (action_potential + 1) / 2  # 轉換到 0-1 尺度
        normalized_cost = cost_factor / 5  # 轉換到 0-1 尺度

        gap_value = normalized_energy - normalized_cost

        # 判定協同狀態
        if gap_value > 0.3:
            synergy_state = "synergy"  # 能量足夠，策略對路
        elif gap_value > -0.3:
            synergy_state = "friction"  # 能量一般，策略需調整
        else:
            synergy_state = "collapse_risk"  # 能量不足，策略過於冒進

        # 考慮環境因素
        hardness_penalty = environment["hardness_sum"] / 15  # 0-1 尺度
        urgency_modifier = environment["urgency_sum"] / 15   # 0-1 尺度

        adjusted_gap = gap_value - (hardness_penalty * 0.3) - (urgency_modifier * 0.2)

        return {
            "gap_value": gap_value,
            "adjusted_gap": adjusted_gap,
            "synergy_state": synergy_state,
            "energy_normalized": normalized_energy,
            "cost_normalized": normalized_cost,
            "environmental_pressure": hardness_penalty + urgency_modifier
        }

    def _determine_yin_yang_direction(self, gap_analysis: Dict) -> Dict[str, Any]:
        """確定陰陽定錨方向"""

        synergy_state = gap_analysis["synergy_state"]
        gap_value = gap_analysis["gap_value"]

        if synergy_state == "synergy":
            direction = YinYangDirection.YANG
            diagnosis = "事情其實不難，是心態和方法都對了。"
            keywords = ["乘勝追擊", "把握時機", "大展身手"]
            solutions = ["繼續執行現有策略", "加大投入力度", "擴展戰果"]

        elif synergy_state == "friction":
            direction = YinYangDirection.YIN
            diagnosis = "事情有一定難度，需要調整節奏。"
            keywords = ["調整節奏", "釐清方向", "穩紮穩打"]
            solutions = ["暫時放緩步伐", "重新評估策略", "補充個人能量"]

        else:  # collapse_risk
            direction = YinYangDirection.YIN
            diagnosis = "形勢危急，需要立即調整以保全根本。"
            keywords = ["緊急煞車", "保命優先", "謹慎行事"]
            solutions = ["立即停止高風險行為", "尋求外部支援", "專注自我保護"]

        return {
            "direction": direction.value,
            "diagnosis": diagnosis,
            "keywords": keywords,
            "solutions": solutions,
            "confidence_level": min(abs(gap_value) * 2, 1.0)  # 0-1 信心度
        }

    def _generate_hexagram_comprehensive(self, battlefield_result: Dict, gap_analysis: Dict) -> Dict[str, Any]:
        """基於綜合分析生成卦象"""

        synergy_state = gap_analysis["synergy_state"]
        attribution = battlefield_result["attribution"]
        facet = battlefield_result["dominant_facet"]

        # 根據GAP狀態和屬性映射卦象
        hexagram_matrix = {
            ("synergy", "internal"): {"id": "地天泰", "name": "地天泰", "description": "通泰和順，天地交泰"},
            ("synergy", "external"): {"id": "雷天大壯", "name": "雷天大壯", "description": "大壯剛健，雷在天上"},
            ("synergy", "mixed"): {"id": "乾為天", "name": "乾為天", "description": "自強不息，天行健"},
            ("friction", "internal"): {"id": "山水蒙", "name": "山水蒙", "description": "蒙昧不明，坎水在上"},
            ("friction", "external"): {"id": "天風姤", "name": "天風姤", "description": "邂逅相遇，風吹天上"},
            ("friction", "mixed"): {"id": "坤為地", "name": "坤為地", "description": "柔順包容，厚德載物"},
            ("collapse_risk", "internal"): {"id": "澤風大過", "name": "澤風大過", "description": "非常之時，非常之策"},
            ("collapse_risk", "external"): {"id": "火地晉", "name": "火地晉", "description": "晉升進取，火燃於地"},
            ("collapse_risk", "mixed"): {"id": "地雷復", "name": "地雷復", "description": "復甦新生，雷動於地"},
        }

        return hexagram_matrix.get((synergy_state, attribution),
                                 {"id": "坤為地", "name": "坤為地", "description": "柔順包容，厚德載物"})

    def _generate_six_kin(self, hexagram: Dict) -> Dict[int, str]:
        """生成六親"""

        hexagram_name = hexagram.get("name", "")

        # 簡化的六親分配
        kin_mappings = {
            "山水蒙": {1: "父母", 2: "兄弟", 3: "官鬼", 4: "父母", 5: "妻財", 6: "兄弟"},
            "地雷復": {1: "子孫", 2: "妻財", 3: "官鬼", 4: "父母", 5: "兄弟", 6: "子孫"},
            "雷天大壯": {1: "父母", 2: "兄弟", 3: "官鬼", 4: "父母", 5: "妻財", 6: "兄弟"},
            "澤地萃": {1: "兄弟", 2: "子孫", 3: "妻財", 4: "官鬼", 5: "父母", 6: "兄弟"}
        }

        return kin_mappings.get(hexagram_name, {1: "父母", 2: "兄弟", 3: "官鬼", 4: "父母", 5: "妻財", 6: "兄弟"})

    def _select_yongshen(self, theme: str, six_kin: Dict[int, str]) -> str:
        """選取用神"""

        theme_mappings = {
            "career": "官鬼",
            "wealth": "妻財",
            "relationship": "妻財",
            "authority": "父母",
            "creativity": "子孫",
            "general": "官鬼"
        }

        target_kin = theme_mappings.get(theme, "官鬼")

        # 找到用神位置
        for position, kin in six_kin.items():
            if kin == target_kin:
                return f"{target_kin}（第{position}爻）"

        return f"{target_kin}（第3爻）"

    def _calculate_facet_scores(self, symbols: List[Dict]) -> Dict[str, float]:
        """計算 Facet 分數"""

        facet_scores = {}

        for symbol in symbols:
            candidate_facets = symbol.get("candidate_facets", [])
            weight = symbol["vectors"]["weight"]

            for facet in candidate_facets:
                if facet not in facet_scores:
                    facet_scores[facet] = 0
                facet_scores[facet] += weight

        return facet_scores

    def _analyze_pressure_sources(self, phaseA: Dict, phaseB: Dict) -> Dict[str, float]:
        """分析壓力來源"""

        # 簡化版：根據 attribution 和 relation_function 生成
        attribution = phaseB.get("attribution", "mixed")

        if attribution == "external":
            return {
                "external_authority": 0.6,
                "external_expectation": 0.4,
                "internal_standard": 0.2
            }
        elif attribution == "internal":
            return {
                "internal_standard": 0.7,
                "external_expectation": 0.2,
                "resource_lack": 0.3
            }
        else:
            return {
                "mixed_sources": 0.5,
                "external_expectation": 0.3,
                "internal_standard": 0.3
            }

    def _find_symbol_by_char(self, char: str, stage: str) -> Optional[Dict]:
        """根據字符查找符號（支援新階段系統）"""

        symbol_libraries = {
            "phaseA": self.phaseA_symbols,
            "stage2a": self.stage2a_symbols,
            "stage2b": self.stage2b_symbols,
            "stage3": self.stage3_symbols
        }

        symbols = symbol_libraries.get(stage, [])
        if not symbols:
            return None

        for symbol in symbols:
            if symbol.get("character_zh") == char:
                return symbol
        return None

    def _find_symbol_by_compound(self, compound: str, phase: str) -> Optional[Dict]:
        """根據組合查找符號（向後相容）"""
        # 保持原有邏輯以支援舊系統
        return None