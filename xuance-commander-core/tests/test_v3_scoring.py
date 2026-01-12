import json
from pathlib import Path
from engine.score_facet import run_vector_state_v3

def test_v3_scoring_exclusion_and_meta():
    scoring = json.loads(Path("domain/facets/burnout_syndrome.scoring.v1.0.json").read_text(encoding="utf-8"))
    answers = {f"Q{i}": 3 for i in range(1,9)}
    priors = {"source":"P0-4.5","attribution_profile":{"locus":"EXTERNAL","subtype":"CONTEXT","agency_level":"MEDIUM"}}
    res = run_vector_state_v3(scoring, answers, priors=priors)
    assert "score" in res and "_meta" in res
    assert res["_meta"]["priors"]["present"] is True
    # Q4/Q5/Q8 excluded from volatility => vol_values length should be 5
    assert len(res["_meta"]["intermediate"]["vol_values"]) == 5
