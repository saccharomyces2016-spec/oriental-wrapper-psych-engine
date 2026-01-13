#!/usr/bin/env python3
"""
Apply final L4 Safety fixes to P0-1 Facets
Based on the self-audit in p0-1追問.md
"""
import json
from pathlib import Path


def load_json(filepath):
    """Load JSON file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        return json.load(f)


def save_json(filepath, data):
    """Save JSON file"""
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def fix_trust_erosion():
    """Fix trust_erosion: 略感不安 → 提高警戒"""
    data = {
        "facetId": "trust_erosion",
        "version": "1.1",
        "questionSet": "OCTET_8",
        "questions": [
            {
                "question_id": "te_core_1",
                "text": {
                    "zh": "在人際關係中，您是否像是在佈滿裂痕的薄冰上行走，時刻擔心墜落？",
                    "en": "In relationships, do you feel like walking on cracked thin ice, constantly worried about falling through?"
                },
                "type": "core_state",
                "options": [
                    {"value": 0, "label": {"zh": "大地穩固", "en": "Solid ground"}},
                    {"value": 2, "label": {"zh": "步步為營", "en": "Step cautiously"}},
                    {"value": 4, "label": {"zh": "薄冰危行", "en": "Walking on thin ice"}}
                ],
                "scoring": {"direction": "higher_is_worse", "weight": 1.5}
            },
            {
                "question_id": "te_core_2",
                "text": {
                    "zh": "您是否在心中築起了一道高牆，任何人想要翻越都會觸發您的警報？",
                    "en": "Have you built a high wall in your heart, where anyone trying to cross triggers your alarm?"
                },
                "type": "core_state",
                "options": [
                    {"value": 0, "label": {"zh": "門戶敞開", "en": "Door open"}},
                    {"value": 2, "label": {"zh": "設有門禁", "en": "Access control"}},
                    {"value": 4, "label": {"zh": "銅牆鐵壁", "en": "Iron wall"}}
                ],
                "scoring": {"direction": "higher_is_worse", "weight": 1.5}
            },
            {
                "question_id": "te_core_3",
                "text": {
                    "zh": "當別人對您示好時，您的第一反應是否是猜測背後的動機？",
                    "en": "When others are nice to you, is your first reaction to guess the motive behind it?"
                },
                "type": "core_state",
                "options": [
                    {"value": 0, "label": {"zh": "欣然接受", "en": "Happily accept"}},
                    {"value": 2, "label": {"zh": "略帶保留", "en": "Slightly reserved"}},
                    {"value": 4, "label": {"zh": "滿腹狐疑", "en": "Full of suspicion"}}
                ],
                "scoring": {"direction": "higher_is_worse", "weight": 1.5}
            },
            {
                "question_id": "te_val_1",
                "text": {
                    "zh": "您是否經常會設下一些「小測試」來考驗身邊的人是否忠誠？",
                    "en": "Do you often set up 'little tests' to check if those around you are loyal?"
                },
                "type": "validation",
                "options": [
                    {"value": 0, "label": {"zh": "用人不疑", "en": "Trust completely"}},
                    {"value": 2, "label": {"zh": "偶爾試探", "en": "Occasional probe"}},
                    {"value": 4, "label": {"zh": "處處考驗", "en": "Testing everywhere"}}
                ],
                "scoring": {"direction": "higher_is_worse", "weight": 1.0, "exclude_from_volatility": True}
            },
            {
                "question_id": "te_val_2",
                "text": {
                    "zh": "只要對方有一點點「可疑」的跡象，您是否會傾向於立刻切斷信任，退回安全區？",
                    "en": "At the slightest sign of being 'suspicious', do you tend to immediately cut off trust and retreat to safety?"
                },
                "type": "validation",
                "options": [
                    {"value": 0, "label": {"zh": "願意溝通", "en": "Willing to talk"}},
                    {"value": 2, "label": {"zh": "提高警覺", "en": "Raise alert"}},
                    {"value": 4, "label": {"zh": "立即封鎖", "en": "Immediate block"}}
                ],
                "scoring": {"direction": "higher_is_worse", "weight": 1.0, "exclude_from_volatility": True}
            },
            {
                "question_id": "te_react_1",
                "text": {
                    "zh": "在人群中，您的目光是否總是游移不定，像是在掃描潛在的威脅？",
                    "en": "In a crowd, do your eyes wander constantly, as if scanning for potential threats?"
                },
                "type": "reaction",
                "options": [
                    {"value": 0, "label": {"zh": "目光柔和", "en": "Soft gaze"}},
                    {"value": 2, "label": {"zh": "提高警戒", "en": "Heightened vigilance"}},  # FIXED
                    {"value": 4, "label": {"zh": "草木皆兵", "en": "Paranoid scanning"}}
                ],
                "scoring": {"direction": "higher_is_worse", "weight": 1.2}
            },
            {
                "question_id": "te_react_2",
                "text": {
                    "zh": "長期的高度防備，是否讓您的精神能量處於耗竭邊緣，卻又不敢鬆懈？",
                    "en": "Has long-term high defense kept your mental energy on the verge of depletion, yet afraid to relax?"
                },
                "type": "reaction",
                "options": [
                    {"value": 0, "label": {"zh": "輕鬆自在", "en": "Relaxed"}},
                    {"value": 2, "label": {"zh": "偶感疲憊", "en": "Occasionally tired"}},
                    {"value": 4, "label": {"zh": "精疲力竭", "en": "Exhausted"}}
                ],
                "scoring": {"direction": "higher_is_worse", "weight": 1.2}
            },
            {
                "question_id": "te_res_1",
                "text": {
                    "zh": "如果有個人願意在牆外耐心等候，您是否能夠為他開一扇小窗？",
                    "en": "If someone is willing to wait patiently outside the wall, are you able to open a small window for them?"
                },
                "type": "resource",
                "options": [
                    {"value": 4, "label": {"zh": "絕不開窗", "en": "Never open"}},
                    {"value": 2, "label": {"zh": "小心窺視", "en": "Peek carefully"}},
                    {"value": 0, "label": {"zh": "嘗試開啟", "en": "Try to open"}}
                ],
                "scoring": {"direction": "lower_is_better", "weight": 1.0}
            }
        ]
    }
    return data


def fix_impostor_syndrome():
    """Fix impostor_syndrome: 惶恐中 → 彷彿...狀態裡"""
    data = {
        "facetId": "impostor_syndrome",
        "version": "1.1",
        "questionSet": "OCTET_8",
        "questions": [
            {
                "question_id": "is_core_1",
                "text": {
                    "zh": "您是否戴著一副不屬於您的面具，時刻擔心被人揭穿真面目？",
                    "en": "Do you wear a mask that doesn't belong to you, constantly worrying about being unmasked?"
                },
                "type": "core_state",
                "options": [
                    {"value": 0, "label": {"zh": "表裡如一", "en": "Inside out same"}},
                    {"value": 2, "label": {"zh": "偶爾心虛", "en": "Occasionally hollow"}},
                    {"value": 4, "label": {"zh": "隨時露餡", "en": "Any moment exposed"}}
                ],
                "scoring": {"direction": "higher_is_worse", "weight": 1.5}
            },
            {
                "question_id": "is_core_2",
                "text": {
                    "zh": "對於自己的成就，您是否總覺得是「運氣好」或「騙來的」？",
                    "en": "Regarding your achievements, do you always feel it was 'luck' or 'scammed'?"
                },
                "type": "core_state",
                "options": [
                    {"value": 0, "label": {"zh": "實至名歸", "en": "Well deserved"}},
                    {"value": 2, "label": {"zh": "運氣成分", "en": "Some luck"}},
                    {"value": 4, "label": {"zh": "全是僥倖", "en": "All luck"}}
                ],
                "scoring": {"direction": "higher_is_worse", "weight": 1.5}
            },
            {
                "question_id": "is_core_3",
                "text": {
                    "zh": "您是否活在一種彷彿「等待審判」的狀態裡，害怕有一天會跌落神壇？",  # FIXED
                    "en": "Do you live in a state as if 'awaiting judgment', afraid of falling from grace one day?"
                },
                "type": "core_state",
                "options": [
                    {"value": 0, "label": {"zh": "踏實安穩", "en": "Solid and safe"}},
                    {"value": 2, "label": {"zh": "偶有隱憂", "en": "Slight worry"}},
                    {"value": 4, "label": {"zh": "審判將至", "en": "Judgment coming"}}
                ],
                "scoring": {"direction": "higher_is_worse", "weight": 1.5}
            },
            {
                "question_id": "is_val_1",
                "text": {
                    "zh": "當別人稱讚您的能力時，您是否會在心裡默默說「如果你知道真相就不會這麼說了」？",
                    "en": "When others praise your ability, do you silently say 'if you knew the truth you wouldn't say that'?"
                },
                "type": "validation",
                "options": [
                    {"value": 0, "label": {"zh": "感謝肯定", "en": "Thank you"}},
                    {"value": 2, "label": {"zh": "有些尷尬", "en": "A bit awkward"}},
                    {"value": 4, "label": {"zh": "強烈否認", "en": "Strong denial"}}
                ],
                "scoring": {"direction": "higher_is_worse", "weight": 1.0, "exclude_from_volatility": True}
            },
            {
                "question_id": "is_val_2",
                "text": {
                    "zh": "為了維持這個「虛假」的形象，您是否付出了不成比例的努力？",
                    "en": "To maintain this 'fake' image, do you put in disproportionate effort?"
                },
                "type": "validation",
                "options": [
                    {"value": 0, "label": {"zh": "自然發揮", "en": "Natural effort"}},
                    {"value": 2, "label": {"zh": "稍微用力", "en": "Slightly forced"}},
                    {"value": 4, "label": {"zh": "過度代償", "en": "Overcompensating"}}
                ],
                "scoring": {"direction": "higher_is_worse", "weight": 1.0, "exclude_from_volatility": True}
            },
            {
                "question_id": "is_react_1",
                "text": {
                    "zh": "當面臨新的挑戰或評估時，您是否會因過度恐懼而傾向於逃避或過度準備？",
                    "en": "When facing new challenges or evaluations, do you tend to flee or over-prepare due to extreme fear?"
                },
                "type": "reaction",
                "options": [
                    {"value": 0, "label": {"zh": "興奮期待", "en": "Excited"}},
                    {"value": 2, "label": {"zh": "略微緊張", "en": "Slightly nervous"}},
                    {"value": 4, "label": {"zh": "驚恐逃避", "en": "Terrified flight"}}
                ],
                "scoring": {"direction": "higher_is_worse", "weight": 1.2}
            },
            {
                "question_id": "is_react_2",
                "text": {
                    "zh": "您是否經常感到虛脫，因為扮演「成功者」耗盡了您的元氣？",
                    "en": "Do you often feel collapsed because playing the 'winner' has drained your vitality?"
                },
                "type": "reaction",
                "options": [
                    {"value": 0, "label": {"zh": "精力充沛", "en": "Energetic"}},
                    {"value": 2, "label": {"zh": "偶感疲乏", "en": "Occasionally tired"}},
                    {"value": 4, "label": {"zh": "元氣大傷", "en": "Vitality drained"}}
                ],
                "scoring": {"direction": "higher_is_worse", "weight": 1.2}
            },
            {
                "question_id": "is_res_1",
                "text": {
                    "zh": "您是否能夠相信，您所站的位置，是您一步一腳印走出來的？",
                    "en": "Can you believe that where you stand is where you walked step by step?"
                },
                "type": "resource",
                "options": [
                    {"value": 4, "label": {"zh": "難以置信", "en": "Hard to believe"}},
                    {"value": 2, "label": {"zh": "半信半疑", "en": "Half believing"}},
                    {"value": 0, "label": {"zh": "深信不疑", "en": "Fully believe"}}
                ],
                "scoring": {"direction": "lower_is_better", "weight": 1.0}
            }
        ]
    }
    return data


def fix_sleep_rhythm_chaos():
    """Fix sleep_rhythm_chaos: 惶然計算 → 反覆計算, 有些焦躁 → 偶爾查看"""
    data = {
        "facetId": "sleep_rhythm_chaos",
        "version": "1.1",
        "questionSet": "OCTET_8",
        "questions": [
            {
                "question_id": "src_core_1",
                "text": {
                    "zh": "您的內在時鐘是否已經失靈，分不清晝夜的界線？",
                    "en": "Has your internal clock broken, unable to distinguish the line between day and night?"
                },
                "type": "core_state",
                "options": [
                    {"value": 0, "label": {"zh": "規律運轉", "en": "Running regularly"}},
                    {"value": 2, "label": {"zh": "偶有時差", "en": "Occasional jetlag"}},
                    {"value": 4, "label": {"zh": "徹底混亂", "en": "Total chaos"}}
                ],
                "scoring": {"direction": "higher_is_worse", "weight": 1.5}
            },
            {
                "question_id": "src_core_2",
                "text": {
                    "zh": "當夜幕低垂，您的意識是否反而變得異常清晰，難以沈潛？",
                    "en": "When night falls, does your consciousness become abnormally clear, unable to submerge?"
                },
                "type": "core_state",
                "options": [
                    {"value": 0, "label": {"zh": "自然困倦", "en": "Naturally sleepy"}},
                    {"value": 2, "label": {"zh": "偶爾興奮", "en": "Occasionally excited"}},
                    {"value": 4, "label": {"zh": "晝夜反轉", "en": "Day/night reversal"}}
                ],
                "scoring": {"direction": "higher_is_worse", "weight": 1.5}
            },
            {
                "question_id": "src_core_3",
                "text": {
                    "zh": "您是否感覺睡眠像是一個難以捉摸的訪客，總是遲到或缺席？",
                    "en": "Do you feel sleep is like an elusive visitor, always late or absent?"
                },
                "type": "core_state",
                "options": [
                    {"value": 0, "label": {"zh": "準時造訪", "en": "Visits on time"}},
                    {"value": 2, "label": {"zh": "姍姍來遲", "en": "Arrives late"}},
                    {"value": 4, "label": {"zh": "經常缺席", "en": "Often absent"}}
                ],
                "scoring": {"direction": "higher_is_worse", "weight": 1.5}
            },
            {
                "question_id": "src_val_1",
                "text": {
                    "zh": "您是否經常在不該醒著的時候清醒，在該清醒的時候昏沈？",
                    "en": "Are you often awake when you shouldn't be, and drowsy when you should be awake?"
                },
                "type": "validation",
                "options": [
                    {"value": 0, "label": {"zh": "作息同步", "en": "Synced schedule"}},
                    {"value": 2, "label": {"zh": "偶爾錯亂", "en": "Occasionally mixed"}},
                    {"value": 4, "label": {"zh": "時序錯置", "en": "Chronology misplaced"}}
                ],
                "scoring": {"direction": "higher_is_worse", "weight": 1.0, "exclude_from_volatility": True}
            },
            {
                "question_id": "src_val_2",
                "text": {
                    "zh": "為了入睡或提神，您是否必須依賴外在物質的強制介入？",
                    "en": "To sleep or stay awake, must you rely on the forced intervention of external substances?"
                },
                "type": "validation",
                "options": [
                    {"value": 0, "label": {"zh": "自然調節", "en": "Natural regulation"}},
                    {"value": 2, "label": {"zh": "偶爾輔助", "en": "Occasional aid"}},
                    {"value": 4, "label": {"zh": "高度依賴", "en": "Highly dependent"}}
                ],
                "scoring": {"direction": "higher_is_worse", "weight": 1.0, "exclude_from_volatility": True}
            },
            {
                "question_id": "src_react_1",
                "text": {
                    "zh": "當無法入睡時，您是否會反覆計算剩下的睡眠時間，不停查看時間？",  # FIXED
                    "en": "When unable to sleep, do you repeatedly calculate remaining sleep time, checking the clock constantly?"
                },
                "type": "reaction",
                "options": [
                    {"value": 0, "label": {"zh": "平靜等待", "en": "Wait calmly"}},
                    {"value": 2, "label": {"zh": "偶爾查看", "en": "Occasional checking"}},  # FIXED
                    {"value": 4, "label": {"zh": "反覆計算", "en": "Repetitive calculation"}}  # FIXED
                ],
                "scoring": {"direction": "higher_is_worse", "weight": 1.2}
            },
            {
                "question_id": "src_react_2",
                "text": {
                    "zh": "白天時，您的意識狀態是否經常如隔層紗，難以聚焦？",
                    "en": "During the day, is your state of consciousness often veiled, hard to focus?"
                },
                "type": "reaction",
                "options": [
                    {"value": 0, "label": {"zh": "清晰明亮", "en": "Clear and bright"}},
                    {"value": 2, "label": {"zh": "偶爾恍惚", "en": "Occasionally dazed"}},
                    {"value": 4, "label": {"zh": "持續游離", "en": "Constantly drifting"}}
                ],
                "scoring": {"direction": "higher_is_worse", "weight": 1.2}
            },
            {
                "question_id": "src_res_1",
                "text": {
                    "zh": "您是否還保留著某種放鬆儀式，能幫助您慢慢滑入夢鄉？",
                    "en": "Do you still keep a relaxation ritual that helps you slowly slide into dreamland?"
                },
                "type": "resource",
                "options": [
                    {"value": 4, "label": {"zh": "完全失效", "en": "Totally ineffective"}},
                    {"value": 2, "label": {"zh": "效果有限", "en": "Limited effect"}},
                    {"value": 0, "label": {"zh": "有效儀式", "en": "Effective ritual"}}
                ],
                "scoring": {"direction": "lower_is_better", "weight": 1.0}
            }
        ]
    }
    return data


def fix_purpose_drift():
    """Fix purpose_drift: 略感焦慮 → 略感迷惘"""
    data = {
        "facetId": "purpose_drift",
        "version": "1.1",
        "questionSet": "OCTET_8",
        "questions": [
            {
                "question_id": "pd_core_1",
                "text": {
                    "zh": "您是否感覺自己像一艘在濃霧中失去羅盤的船，不知駛向何方？",
                    "en": "Do you feel like a ship that has lost its compass in dense fog, not knowing where to sail?"
                },
                "type": "core_state",
                "options": [
                    {"value": 0, "label": {"zh": "航向清晰", "en": "Clear course"}},
                    {"value": 2, "label": {"zh": "偶爾迷航", "en": "Occasionally lost"}},
                    {"value": 4, "label": {"zh": "徹底迷失", "en": "Totally lost"}}
                ],
                "scoring": {"direction": "higher_is_worse", "weight": 1.5}
            },
            {
                "question_id": "pd_core_2",
                "text": {
                    "zh": "對於「未來」這個詞，您是否只看到一片空白，而非具體的畫面？",
                    "en": "Regarding the word 'future', do you only see a blank void rather than a concrete picture?"
                },
                "type": "core_state",
                "options": [
                    {"value": 0, "label": {"zh": "藍圖清晰", "en": "Clear blueprint"}},
                    {"value": 2, "label": {"zh": "輪廓模糊", "en": "Blurry outline"}},
                    {"value": 4, "label": {"zh": "一片空白", "en": "Blank void"}}
                ],
                "scoring": {"direction": "higher_is_worse", "weight": 1.5}
            },
            {
                "question_id": "pd_core_3",
                "text": {
                    "zh": "您是否常問自己「我到底在忙什麼」，卻聽不到心中的迴響？",
                    "en": "Do you often ask yourself 'what am I busy for', but hear no echo in your heart?"
                },
                "type": "core_state",
                "options": [
                    {"value": 0, "label": {"zh": "目標篤定", "en": "Certain goal"}},
                    {"value": 2, "label": {"zh": "偶有疑惑", "en": "Occasional doubt"}},
                    {"value": 4, "label": {"zh": "寂靜無聲", "en": "Dead silence"}}
                ],
                "scoring": {"direction": "higher_is_worse", "weight": 1.5}
            },
            {
                "question_id": "pd_val_1",
                "text": {
                    "zh": "您是否頻繁更換跑道或興趣，卻始終找不到「定錨」的感覺？",
                    "en": "Do you frequently change paths or interests, yet never find the feeling of 'anchoring'?"
                },
                "type": "validation",
                "options": [
                    {"value": 0, "label": {"zh": "深耕積累", "en": "Deep cultivation"}},
                    {"value": 2, "label": {"zh": "多方嘗試", "en": "Trying many things"}},
                    {"value": 4, "label": {"zh": "漂泊無定", "en": "Drifting endlessly"}}
                ],
                "scoring": {"direction": "higher_is_worse", "weight": 1.0, "exclude_from_volatility": True}
            },
            {
                "question_id": "pd_val_2",
                "text": {
                    "zh": "看著別人篤定前行，您是否會感到一種莫名的慌張與空虛？",
                    "en": "Watching others move forward with certainty, do you feel an inexplicable panic and emptiness?"
                },
                "type": "validation",
                "options": [
                    {"value": 0, "label": {"zh": "隨喜祝福", "en": "Happy for them"}},
                    {"value": 2, "label": {"zh": "略感迷惘", "en": "Slight confusion"}},  # FIXED
                    {"value": 4, "label": {"zh": "深刻空虛", "en": "Deep emptiness"}}
                ],
                "scoring": {"direction": "higher_is_worse", "weight": 1.0, "exclude_from_volatility": True}
            },
            {
                "question_id": "pd_react_1",
                "text": {
                    "zh": "當需要做生涯決策時，您是否會傾向於拖延，期待命運替您做決定？",
                    "en": "When needing to make career decisions, do you tend to procrastinate, expecting fate to decide for you?"
                },
                "type": "reaction",
                "options": [
                    {"value": 0, "label": {"zh": "果斷抉擇", "en": "Decisive"}},
                    {"value": 2, "label": {"zh": "猶豫不決", "en": "Hesitant"}},
                    {"value": 4, "label": {"zh": "交給天意", "en": "Leave to fate"}}
                ],
                "scoring": {"direction": "higher_is_worse", "weight": 1.2}
            },
            {
                "question_id": "pd_react_2",
                "text": {
                    "zh": "您是否會在半夜突然驚醒，感到自己正在無意義地漂流？",
                    "en": "Do you wake up suddenly in the middle of the night, feeling you're drifting meaninglessly?"
                },
                "type": "reaction",
                "options": [
                    {"value": 0, "label": {"zh": "篤定踏實", "en": "Firmly grounded"}},
                    {"value": 2, "label": {"zh": "偶有飄渺", "en": "Occasionally adrift"}},
                    {"value": 4, "label": {"zh": "徹底失落", "en": "Completely lost"}}
                ],
                "scoring": {"direction": "higher_is_worse", "weight": 1.2}
            },
            {
                "question_id": "pd_res_1",
                "text": {
                    "zh": "您是否還保留著某個「曾經熱愛的事物」的種子，可以重新點燃？",
                    "en": "Do you still keep a seed of 'something you once loved' that can be reignited?"
                },
                "type": "resource",
                "options": [
                    {"value": 4, "label": {"zh": "記憶全無", "en": "No memory"}},
                    {"value": 2, "label": {"zh": "隱約殘影", "en": "Faint trace"}},
                    {"value": 0, "label": {"zh": "種子尚存", "en": "Seed remains"}}
                ],
                "scoring": {"direction": "lower_is_better", "weight": 1.0}
            }
        ]
    }
    return data


if __name__ == "__main__":
    questions_dir = Path('domain/questions')
    
    print("\n=== Applying Final L4 Safety Fixes ===\n")
    
    facets = [
        ('trust_erosion', fix_trust_erosion()),
        ('impostor_syndrome', fix_impostor_syndrome()),
        ('sleep_rhythm_chaos', fix_sleep_rhythm_chaos()),
        ('purpose_drift', fix_purpose_drift())
    ]
    
    for facet_id, data in facets:
        filename = f"{facet_id}.questions.v1.0.json"
        filepath = questions_dir / filename
        save_json(filepath, data)
        print(f"  ✅ {filename}")
    
    print(f"\n✅ Total: {len(facets)} Facets fixed and written")
    print(f"✅ Output directory: {questions_dir}")
    print(f"\n🎊 P0-1 COMPLETE: All 14 Facets ready!")
