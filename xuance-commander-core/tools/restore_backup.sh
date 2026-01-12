#!/usr/bin/env bash
# restore_backup.sh
# 恢復備份檔案的腳本

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKUP_DIR="${ROOT_DIR}/docs/ops/backup"

if [[ $# -lt 1 ]]; then
  echo "用法: bash tools/restore_backup.sh <備份日期時間> [檔案路徑]"
  echo ""
  echo "範例:"
  echo "  bash tools/restore_backup.sh 20260112_1430"
  echo "  bash tools/restore_backup.sh 20260112_1430 docs/ops/analysis/file.md"
  echo ""
  echo "可用的備份："
  ls -1 "${BACKUP_DIR}" 2>/dev/null | grep -E '^[0-9]{8}_[0-9]{4}$' || echo "  無"
  exit 1
fi

BACKUP_TIMESTAMP="$1"
BACKUP_PATH="${BACKUP_DIR}/${BACKUP_TIMESTAMP}"

if [[ ! -d "${BACKUP_PATH}" ]]; then
  echo "錯誤：找不到備份目錄 ${BACKUP_PATH}"
  exit 1
fi

if [[ $# -eq 2 ]]; then
  # 恢復單一檔案
  FILE_PATH="$2"
  BACKUP_FILE="${BACKUP_PATH}/${FILE_PATH}"
  
  if [[ ! -f "${BACKUP_FILE}" ]]; then
    echo "錯誤：找不到備份檔案 ${BACKUP_FILE}"
    exit 1
  fi
  
  # 建立目標目錄
  mkdir -p "$(dirname "${ROOT_DIR}/${FILE_PATH}")"
  
  # 恢復檔案
  cp "${BACKUP_FILE}" "${ROOT_DIR}/${FILE_PATH}"
  echo "✅ 已恢復：${FILE_PATH}"
else
  # 恢復整個備份
  echo "恢復備份：${BACKUP_TIMESTAMP}"
  echo ""
  
  # 列出所有備份檔案
  find "${BACKUP_PATH}" -type f | while read -r backup_file; do
    # 計算相對路徑
    rel_path="${backup_file#${BACKUP_PATH}/}"
    target_file="${ROOT_DIR}/${rel_path}"
    
    # 建立目標目錄
    mkdir -p "$(dirname "${target_file}")"
    
    # 恢復檔案
    cp "${backup_file}" "${target_file}"
    echo "✅ 已恢復：${rel_path}"
  done
  
  echo ""
  echo "✅ 備份恢復完成"
fi
