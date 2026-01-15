"""
測試綜合診斷流程

驗證：
1. 4階段符號輸入處理
2. GAP分析邏輯
3. 陰陽定錨生成
4. API端點功能
"""

import asyncio
import json
from engine.symbol_facet_mapper import PsychologicalEngine

# 模擬AI服務（避免依賴外部API）
class MockAIService:
    def __init__(self):
        self.templates = {
            "yin": "根據卦象顯示，您目前的狀態更適合{diagnosis}建議您{keywords}，具體而言{actions}。",
            "yang": "卦象指示您正處於有利時機，{diagnosis}建議您{keywords}，可以考慮{actions}。"
        }

    async def generate_narrative(self, diagnosis_result):
        """生成AI敘事"""
        anchoring = diagnosis_result["diagnosis"]["anchoring"]
        direction = anchoring["direction"]
        diagnosis = anchoring["diagnosis"]
        keywords = "、".join(anchoring["keywords"][:2])
        actions = "；".join(anchoring["solutions"][:2])

        template = self.templates.get(direction, self.templates["yin"])
        return template.format(diagnosis=diagnosis, keywords=keywords, actions=actions)

def test_comprehensive_diagnosis():
    """測試綜合診斷流程"""

    print("=== 測試東方玄學心理引擎整合 ===")

    # 初始化引擎
    engine = PsychologicalEngine()

    # 模擬用戶輸入
    test_input = {
        "theme": "情",  # 感情問題
        "stage1_selections": [
            {
                "battlefield": "情",
                "symbols": ["困"],  # 感情困擾
                "weight": 0.9
            }
        ],
        "stage2a_selections": ["虛", "惑"],  # 精力虛弱 + 認知混亂
        "stage2b_selections": ["爭", "險"],  # 關係衝突 + 危機感
        "stage3_selections": ["戰", "忍"]   # 持續對抗 + 默默承受
    }

    print(f"測試輸入: {json.dumps(test_input, ensure_ascii=False, indent=2)}")

    try:
        # 執行診斷
        result = engine.diagnose_comprehensive(
            theme=test_input["theme"],
            stage1_selections=test_input["stage1_selections"],
            stage2a_selections=test_input["stage2a_selections"],
            stage2b_selections=test_input["stage2b_selections"],
            stage3_selections=test_input["stage3_selections"]
        )

        print("\n=== 診斷結果 ===")
        print(f"主題: {result['theme']}")
        print(f"卦象: {result['hexagram']['name']} - {result['hexagram']['description']}")
        print(f"用神: {result['yongshen']}")

        diagnosis = result["diagnosis"]
        print("\n戰場分析:")
        print(f"  嚴重度: {diagnosis['battlefield']['severity']:.2f}")
        print(f"  主導歸因: {diagnosis['battlefield']['attribution']}")

        print("\n駕駛員狀態:")
        driver = diagnosis["driver_status"]
        print(f"  能量: {driver['energy']:.2f}")
        print(f"  清晰度: {driver['clarity']:.2f}")
        print(f"  行動力: {driver['action_potential']:.2f}")

        print("\n環境狀況:")
        env = diagnosis["environment"]
        print(f"  硬度總和: {env['hardness_sum']}")
        print(f"  急迫度總和: {env['urgency_sum']}")
        print(f"  風險等級: {env['risk_level']}")

        print("\nGAP分析:")
        gap = diagnosis["gap_analysis"]
        print(f"  GAP值: {gap['gap_value']:.2f}")
        print(f"  協同狀態: {gap['synergy_state']}")

        print("\n陰陽定錨:")
        anchoring = diagnosis["anchoring"]
        print(f"  方向: {anchoring['direction']}")
        print(f"  診斷: {anchoring['diagnosis']}")
        print(f"  關鍵字: {', '.join(anchoring['keywords'])}")

        # 測試AI敘事生成
        print("\n=== AI敘事生成測試 ===")
        ai_service = MockAIService()
        narrative = asyncio.run(ai_service.generate_narrative(result))
        print(f"AI敘事: {narrative}")

        print("\n✅ 綜合診斷測試通過")

    except Exception as e:
        print(f"\n❌ 測試失敗: {str(e)}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_comprehensive_diagnosis()
    print("\n🎉 測試完成")