"""
東方玄學心理引擎API - 支援4階段綜合診斷

提供前端介面用於：
1. 綜合心理診斷（4階段）
2. GAP分析與陰陽定錨
3. AI敘事生成
4. 結果整合輸出
"""

import json
import asyncio
from typing import Dict, List, Any, Optional
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from engine.symbol_facet_mapper import PsychologicalEngine

# 模擬AI服務（實際應整合OpenAI或其他服務）
class AIService:
    def __init__(self):
        self.templates = {
            "yin": "根據卦象顯示，您目前的狀態更適合{diagnosis}建議您{keywords}，具體而言{actions}。",
            "yang": "卦象指示您正處於有利時機，{diagnosis}建議您{keywords}，可以考慮{actions}。"
        }

    async def generate_narrative(self, diagnosis_result: Dict) -> str:
        """生成AI敘事"""
        anchoring = diagnosis_result["diagnosis"]["anchoring"]
        direction = anchoring["direction"]
        diagnosis = anchoring["diagnosis"]
        keywords = "、".join(anchoring["keywords"][:2])
        actions = "；".join(anchoring["solutions"][:2])

        template = self.templates.get(direction, self.templates["yin"])
        return template.format(diagnosis=diagnosis, keywords=keywords, actions=actions)

# API模型定義
class BattlefieldSelection(BaseModel):
    battlefield: str  # 財/情/業/家/人/身/學/運
    symbols: List[str]
    weight: float = 1.0

class ComprehensiveDiagnosisRequest(BaseModel):
    session_id: str
    theme: str  # 占問主題
    stage1_selections: List[BattlefieldSelection]  # 第一階段：鎖定戰場
    stage2a_selections: List[str]  # 第二階段A：駕駛員掃描（盛/虛/覺/惑/攻/守/通/滯）
    stage2b_selections: List[str]  # 第二階段B：路況掃描（匱/阻/爭/亂/險/孤/遲/剝）
    stage3_selections: List[str]  # 第三階段：行為掃描（戰/避/忍/謀/合/斷/隨/轉）

class ComprehensiveDiagnosisResponse(BaseModel):
    session_id: str
    diagnosis: Dict[str, Any]
    hexagram: Dict[str, Any]
    six_kin: Dict[int, str]
    yongshen: str
    ai_narrative: str
    recommendations: List[str]
    risk_warnings: List[str]
    processing_time_ms: int

# 初始化服務
app = FastAPI(title="東方玄學心理引擎API", version="2.0")
engine = PsychologicalEngine()
ai_service = AIService()

@app.post("/api/comprehensive/diagnose", response_model=ComprehensiveDiagnosisResponse)
async def diagnose_comprehensive(request: ComprehensiveDiagnosisRequest):
    """
    綜合心理診斷API

    處理4階段符號輸入，執行GAP分析，生成完整診斷結果
    """
    try:
        import time
        start_time = time.time()

        # 執行引擎診斷
        diagnosis_result = engine.diagnose_comprehensive(
            theme=request.theme,
            stage1_selections=[s.dict() for s in request.stage1_selections],
            stage2a_selections=request.stage2a_selections,
            stage2b_selections=request.stage2b_selections,
            stage3_selections=request.stage3_selections
        )

        # 生成AI敘事
        ai_narrative = await ai_service.generate_narrative(diagnosis_result)

        # 生成建議與風險提醒
        recommendations = diagnosis_result["diagnosis"]["anchoring"]["solutions"]
        risk_warnings = _generate_risk_warnings(diagnosis_result)

        processing_time = int((time.time() - start_time) * 1000)

        return ComprehensiveDiagnosisResponse(
            session_id=request.session_id,
            diagnosis=diagnosis_result["diagnosis"],
            hexagram=diagnosis_result["hexagram"],
            six_kin=diagnosis_result["six_kin"],
            yongshen=diagnosis_result["yongshen"],
            ai_narrative=ai_narrative,
            recommendations=recommendations,
            risk_warnings=risk_warnings,
            processing_time_ms=processing_time
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"診斷處理失敗: {str(e)}")

@app.get("/api/health")
async def health_check():
    """健康檢查"""
    return {"status": "healthy", "engine": "psychological", "version": "2.0"}

def _generate_risk_warnings(diagnosis_result: Dict) -> List[str]:
    """根據診斷結果生成風險提醒"""

    warnings = []
    gap_analysis = diagnosis_result["diagnosis"]["gap_analysis"]
    environment = diagnosis_result["diagnosis"]["environment"]
    behavior = diagnosis_result["diagnosis"]["behavior"]

    synergy_state = gap_analysis["synergy_state"]
    risk_level = environment["risk_level"]

    if synergy_state == "collapse_risk":
        warnings.append("當前策略可能超出個人承受能力，建議立即調整")

    if risk_level == "critical":
        warnings.append("外部環境壓力較大，需謹慎行事")

    if behavior["cost_factor"] > 4:
        warnings.append("所選策略成本較高，請確保能量充足以為支撐")

    if not warnings:
        warnings.append("整體狀態穩定，可按計劃執行")

    return warnings

@app.post("/api/comprehensive/validate_selections")
async def validate_selections(request: ComprehensiveDiagnosisRequest):
    """
    驗證符號選擇的有效性

    用於前端即時驗證用戶輸入
    """
    validation_results = {
        "stage1_valid": _validate_stage1(request.stage1_selections),
        "stage2a_valid": _validate_stage_symbols(request.stage2a_selections, ["盛", "虛", "覺", "惑", "攻", "守", "通", "滯"]),
        "stage2b_valid": _validate_stage_symbols(request.stage2b_selections, ["匱", "阻", "爭", "亂", "險", "孤", "遲", "剝"]),
        "stage3_valid": _validate_stage_symbols(request.stage3_selections, ["戰", "避", "忍", "謀", "合", "斷", "隨", "轉"])
    }

    all_valid = all(validation_results.values())

    return {
        "valid": all_valid,
        "validation_details": validation_results,
        "message": "所有選擇有效" if all_valid else "部分選擇無效，請檢查"
    }

def _validate_stage1(selections: List[BattlefieldSelection]) -> bool:
    """驗證第一階段選擇"""
    valid_battlefields = ["財", "情", "業", "家", "人", "身", "學", "運"]
    return all(s.battlefield in valid_battlefields for s in selections)

def _validate_stage_symbols(selections: List[str], valid_symbols: List[str]) -> bool:
    """驗證符號選擇"""
    return all(symbol in valid_symbols for symbol in selections)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)