#!/usr/bin/env python3
"""
Gate 4 整合腳本

目的：
1. 雙向驗證 LEGACY 資料已全部提取
2. 整合 domain 資料到專案
3. 驗證整合結果
4. 記錄所有操作（可回滾）
"""

import json
import shutil
from pathlib import Path
from datetime import datetime

# 設定路徑
PROJECT_ROOT = Path(__file__).parent.parent.parent
DOMAIN_DIR = PROJECT_ROOT / "xuance-commander-core" / "domain"
LEGACY_DIR = PROJECT_ROOT / "xuance-commander-core" / "docs" / "legacy" / "115_1_3_my-first-app_failed"
EXTRACTION_DIR = PROJECT_ROOT / "xuance-commander-core" / "P0-12_SCIENTIFIC_ENGINE_COMPLETION" / "EXTRACTION_WORKSPACE"
FINAL_DELIVERY = Path("/tmp/gate4_final/domain/domain_output")
BACKUP_DIR = PROJECT_ROOT / "xuance-commander-core" / "P0-12_SCIENTIFIC_ENGINE_COMPLETION" / "GATE4_BACKUP"
LOG_DIR = PROJECT_ROOT / "xuance-commander-core" / "P0-12_SCIENTIFIC_ENGINE_COMPLETION"

def log(message, log_file):
    """記錄訊息"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_message = f"[{timestamp}] {message}\n"
    print(message)
    log_file.write(log_message)

def verify_extraction():
    """雙向驗證：確認 LEGACY 資料已全部提取"""
    print("\n=== 步驟 1：雙向驗證提取狀態 ===\n")
    
    log_file = open(LOG_DIR / "GATE4_EXECUTION_LOG.md", "w", encoding="utf-8")
    log_file.write("# Gate 4 執行記錄\n\n")
    log_file.write(f"開始時間：{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
    
    # 關鍵檔案清單
    key_files = [
        "anchor_statements.v1.json",
        "consequence_chain_library.v1.json",
        "p1_question_blueprint_v1.json",
        "questionBank.v1.json",
        "buildGuidance.js"
    ]
    
    log("## 1.1 檢查 LEGACY 資料夾中的關鍵檔案", log_file)
    all_extracted = True
    
    for file in key_files:
        # 在 LEGACY 資料夾中尋找
        legacy_files = list(LEGACY_DIR.rglob(file))
        if legacy_files:
            log(f"   ✅ {file} - 在 LEGACY 中找到", log_file)
        else:
            log(f"   ⚠️ {file} - 在 LEGACY 中未找到（可能已提取）", log_file)
    
    log("\n## 1.2 檢查 EXTRACTION_WORKSPACE 中的備份", log_file)
    raw_dir = EXTRACTION_DIR / "raw"
    if raw_dir.exists():
        for file in key_files:
            raw_path = raw_dir / file
            if raw_path.exists():
                log(f"   ✅ {file} - 已備份到 EXTRACTION_WORKSPACE/raw/", log_file)
            else:
                log(f"   ⚠️ {file} - 未在 EXTRACTION_WORKSPACE/raw/ 中找到", log_file)
                all_extracted = False
    
    log("\n## 1.3 檢查轉化後的資料", log_file)
    if FINAL_DELIVERY.exists():
        manifests = list(FINAL_DELIVERY.glob("manifests/*.json"))
        questions = list(FINAL_DELIVERY.glob("questions/*.json"))
        narratives = list(FINAL_DELIVERY.glob("narratives/*.json"))
        recommendations = list(FINAL_DELIVERY.glob("recommendations/*.json"))
        riskchains = list(FINAL_DELIVERY.glob("riskchains/*.json"))
        
        log(f"   ✅ Manifests: {len(manifests)} 個", log_file)
        log(f"   ✅ Questions: {len(questions)} 個", log_file)
        log(f"   ✅ Narratives: {len(narratives)} 個", log_file)
        log(f"   ✅ Recommendations: {len(recommendations)} 個", log_file)
        log(f"   ✅ Riskchains: {len(riskchains)} 個", log_file)
        log(f"   ✅ 總計: {len(manifests) + len(questions) + len(narratives) + len(recommendations) + len(riskchains)} 個檔案", log_file)
        
        if len(manifests) == 13 and len(questions) == 13 and len(narratives) == 13 and len(recommendations) == 13 and len(riskchains) == 13:
            log("\n   ✅ 所有 13 個主題的資料都已轉化完成", log_file)
        else:
            log("\n   ⚠️ 部分主題資料不完整", log_file)
            all_extracted = False
    
    log_file.close()
    
    if all_extracted:
        print("\n✅ 驗證通過：資料已全部提取")
    else:
        print("\n⚠️ 驗證發現問題：部分資料可能未完全提取")
    
    return all_extracted

def backup_domain():
    """備份現有 domain 資料"""
    print("\n=== 步驟 2：備份現有 domain 資料 ===\n")
    
    log_file = open(LOG_DIR / "GATE4_EXECUTION_LOG.md", "a", encoding="utf-8")
    
    if not DOMAIN_DIR.exists():
        log("   ℹ️ domain 目錄不存在，無需備份", log_file)
        log_file.close()
        return True
    
    BACKUP_DIR.mkdir(parents=True, exist_ok=True)
    backup_timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_path = BACKUP_DIR / f"domain_backup_{backup_timestamp}"
    
    if backup_path.exists():
        log(f"   ✅ 備份已存在: {backup_path}", log_file)
    else:
        shutil.copytree(DOMAIN_DIR, backup_path)
        log(f"   ✅ 已備份到: {backup_path}", log_file)
    
    log_file.close()
    return True

def integrate_domain():
    """整合 domain 資料"""
    print("\n=== 步驟 3：整合 domain 資料 ===\n")
    
    log_file = open(LOG_DIR / "GATE4_EXECUTION_LOG.md", "a", encoding="utf-8")
    log("\n## 3.1 建立目錄結構", log_file)
    
    # 建立目錄
    for subdir in ["manifests", "questions", "narratives", "recommendations", "riskchains"]:
        target_dir = DOMAIN_DIR / subdir
        target_dir.mkdir(parents=True, exist_ok=True)
        log(f"   ✅ 已建立/確認目錄: {target_dir}", log_file)
    
    log("\n## 3.2 複製檔案", log_file)
    copied_files = []
    
    for subdir in ["manifests", "questions", "narratives", "recommendations", "riskchains"]:
        source_dir = FINAL_DELIVERY / subdir
        target_dir = DOMAIN_DIR / subdir
        
        if source_dir.exists():
            for file in source_dir.glob("*.json"):
                target_file = target_dir / file.name
                shutil.copy2(file, target_file)
                copied_files.append(f"{subdir}/{file.name}")
                log(f"   ✅ 已複製: {subdir}/{file.name}", log_file)
    
    log(f"\n   ✅ 總共複製 {len(copied_files)} 個檔案", log_file)
    log_file.close()
    
    return len(copied_files) > 0

def verify_integration():
    """驗證整合結果"""
    print("\n=== 步驟 4：驗證整合結果 ===\n")
    
    log_file = open(LOG_DIR / "GATE4_EXECUTION_LOG.md", "a", encoding="utf-8")
    log("\n## 4.1 檢查檔案數量", log_file)
    
    manifests = list(DOMAIN_DIR.glob("manifests/*.json"))
    questions = list(DOMAIN_DIR.glob("questions/*.json"))
    narratives = list(DOMAIN_DIR.glob("narratives/*.json"))
    recommendations = list(DOMAIN_DIR.glob("recommendations/*.json"))
    riskchains = list(DOMAIN_DIR.glob("riskchains/*.json"))
    
    log(f"   Manifests: {len(manifests)} 個", log_file)
    log(f"   Questions: {len(questions)} 個", log_file)
    log(f"   Narratives: {len(narratives)} 個", log_file)
    log(f"   Recommendations: {len(recommendations)} 個", log_file)
    log(f"   Riskchains: {len(riskchains)} 個", log_file)
    
    log("\n## 4.2 驗證 manifest 路徑", log_file)
    all_valid = True
    
    for manifest_file in manifests:
        try:
            with open(manifest_file, 'r', encoding='utf-8') as f:
                manifest = json.load(f)
            
            sources = manifest.get("sources", {})
            for source_type, source_path in sources.items():
                # 檢查路徑是否正確
                if source_path.startswith("domain/"):
                    relative_path = source_path.replace("domain/", "")
                    full_path = DOMAIN_DIR / relative_path
                    if full_path.exists():
                        log(f"   ✅ {manifest_file.name} - {source_type}: 路徑正確", log_file)
                    else:
                        log(f"   ⚠️ {manifest_file.name} - {source_type}: 路徑不存在 ({source_path})", log_file)
                        all_valid = False
        except Exception as e:
            log(f"   ❌ {manifest_file.name} - 讀取錯誤: {e}", log_file)
            all_valid = False
    
    log_file.close()
    
    if all_valid:
        print("\n✅ 驗證通過：整合成功")
    else:
        print("\n⚠️ 驗證發現問題：部分路徑可能不正確")
    
    return all_valid

def main():
    """主執行函數"""
    print("=" * 80)
    print("Gate 4：最終交付與整合")
    print("=" * 80)
    
    # 步驟 1：雙向驗證
    if not verify_extraction():
        print("\n⚠️ 驗證未完全通過，建議檢查後再繼續")
        return False
    
    # 步驟 2：備份
    if not backup_domain():
        print("\n❌ 備份失敗，停止整合")
        return False
    
    # 步驟 3：整合
    if not integrate_domain():
        print("\n❌ 整合失敗")
        return False
    
    # 步驟 4：驗證
    if not verify_integration():
        print("\n⚠️ 驗證發現問題，但整合已完成")
    
    print("\n" + "=" * 80)
    print("✅ Gate 4 整合完成")
    print("=" * 80)
    print(f"\n備份位置: {BACKUP_DIR}")
    print(f"執行記錄: {LOG_DIR / 'GATE4_EXECUTION_LOG.md'}")
    
    return True

if __name__ == "__main__":
    main()
