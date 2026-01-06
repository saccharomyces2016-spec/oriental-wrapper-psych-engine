# Global Path Canon（唯一真相路徑）

## Governance
- Canon: xuance-commander-core/docs/governance/
- 禁止：repo root 出現 ./docs/governance

## Evidence / GEM
- Canon: xuance-commander-core/docs/gem/
- Shadow (non-evidence): xuance-commander-core/prompts/gem/

## Output Artifacts
- Canon: xuance-commander-core/out/
- 規則：所有產物只允許寫入此處

## Temporary Files
- Canon: xuance-commander-core/tmp/
- 規則：不可被引用為證據；可隨時清除

## Logs
- Canon: xuance-commander-core/logs/
- 規則：僅供除錯，不可作為決策依據

## Sync / Packets
- ROLE_*_SYNC_PACKET：single source（由 registry 指定）
- CHAT_PACKET：single source（由 registry 指定）

## Legacy
- Canon: xuance-commander-core/docs/legacy/
- 規則：預設不可引用，需明確升級
