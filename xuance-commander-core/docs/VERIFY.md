# P0-5.6 Verification Process

## 1. Install Dependencies
```bash
pip install -r requirements.txt
```

## 2. Run All Tests

Execute the following command to run unit, integration, and golden tests with coverage:

```bash
pytest --cov=engine --cov-report=term-missing
```

## 3. Acceptance Criteria

1. **Tests Passed**: All tests must pass (green).
2. **Coverage**: Engine coverage should be ≥ 80%.
3. **Files Exists**: Ensure all files in `REPO_TREE.md` are created.
4. **Audit**: Dual-compute consistency is verified in `test_integration_dual_compute.py`.
