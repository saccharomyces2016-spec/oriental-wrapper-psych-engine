<template>
  <div class="dash-stage">
    <div class="veil-bg"></div>

    <section class="panel" v-if="data">
      <!-- Header -->
      <header class="header">
        <h2 class="title ink-font">{{ infoTitle }}</h2>
        <p class="subtitle">{{ infoSubtitle }}</p>
      </header>

      <!-- M-8.3/M-8.4: 錨點語句（第一屏） -->
      <section class="block anchor" v-if="primaryAnchor" ref="anchorSection">
        <div class="anchor-text">{{ primaryAnchorText }}</div>
        <div class="anchor-debug" v-if="DEBUG_NARRATIVE && anchorDebug">
          <small>Anchor ID: {{ anchorDebug.primaryId }} | Theme: {{ anchorDebug.primaryTheme }}</small>
        </div>
      </section>

      <!-- A. 一拳（命中感） -->
      <section class="block punch">
        <div class="punch-k ink-font">斷語</div>
        <div class="punch-v ink-font">{{ hookLine }}</div>
        <div class="punch-plain">{{ hookPlain }}</div>
      </section>

      <!-- ✅ NEW：母題命中 -->
      <section class="block" v-if="motherThemes.length">
        <div class="block-title ink-font">母題命中</div>
        <div class="viz-sub">這些不是表面問題，是你反覆卡住的「底層劇本」</div>

        <div class="mt">
          <div class="theme-grid">
            <div class="theme-card" v-for="(t,idx) in motherThemes" :key="t.id || t.key || t.label || idx">
              <div class="theme-k ink-font">{{ t.label || t.name || t.key || '未命名母題' }}</div>
              <div class="theme-v">
                <span class="pct" v-if="typeof t.score === 'number'">{{ Math.round(t.score * 100) }}%</span>
                <span class="pct" v-else-if="typeof t.score === 'string'">{{ t.score }}</span>
                <span class="pct" v-else>命中</span>
              </div>
              <div class="theme-desc" v-if="t.desc">{{ t.desc }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- B. 五行 / 氣機（更可讀） -->
      <section class="block">
        <div class="block-title ink-font">氣機分布</div>

        <div class="viz">
          <div>
            <div class="viz-title ink-font">五行鏡</div>
            <div class="viz-sub">此為你在 03 所選之象，累積成的「偏勢」</div>

            <div class="bars">
              <div class="bar-row" v-for="row in elementRows" :key="row.k">
                <div class="bar-label">
                  <span class="ink-font">{{ row.kLabel }}</span>
                  <span class="pct">{{ row.v }}%</span>
                </div>
                <div class="bar-bg">
                  <div class="bar-fill" :style="{ width: row.v + '%' }"></div>
                </div>
              </div>
            </div>

            <div class="mt">
              <div class="list subtle">
                <div>木：起念與開局</div>
                <div>火：行動與推進</div>
                <div>土：承載與穩定</div>
                <div>金：界線與控制</div>
                <div>水：不安與敏感</div>
              </div>
            </div>
          </div>

          <div>
            <div class="viz-title ink-font">暗線提示</div>
            <div class="viz-sub">把「玄」翻成你聽得懂的白話</div>

            <div class="mini">
              <div class="mini-row" v-for="a in axisRows" :key="a.k">
                <div class="mini-k ink-font">{{ a.kLabel }}</div>
                <div class="mini-v">{{ a.desc }}</div>
              </div>
            </div>

            <div class="mt">
              <div class="viz-title ink-font">路徑回聲</div>
              <div class="viz-sub">你剛剛做的選擇，系統沒有忘</div>

              <div class="path">
                <div class="pill" v-if="domainLabel">
                  <span class="ink-font">所問</span>
                  <span>{{ domainLabel }}</span>
                </div>

                <div class="pill" v-if="r2Label">
                  <span class="ink-font">矛盾</span>
                  <span>{{ r2Label }}</span>
                </div>

                <div class="pill" v-for="(x,i) in r3Labels" :key="i">
                  <span class="ink-font">細象</span>
                  <span>{{ x }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- C. 批命正文 -->
      <section class="block" v-if="insightsText">
        <div class="block-title ink-font">批命</div>
        <div class="ai-block">
          <div class="ai-text">{{ insightsText }}</div>
        </div>
      </section>

      <!-- D. 五條斷語 -->
      <section class="block" v-if="highlights.length">
        <div class="block-title ink-font">斷語要點</div>
        <ul class="list">
          <li v-for="(x,i) in highlights" :key="i">{{ x }}</li>
        </ul>
      </section>

      <!-- ✅ NEW：解決建議（L6） -->
      <section class="block" v-if="guidanceRecs.length">
        <div class="block-title ink-font">解決建議</div>

        <div class="theme-grid">
          <div class="theme-card" v-for="(r,i) in guidanceRecs" :key="r.id || i">
            <div class="theme-k ink-font">{{ r.title || '建議' }}</div>
            <div class="theme-desc" v-if="r.whatItMeans">{{ r.whatItMeans }}</div>

            <div class="mt" v-if="r.actions?.length">
              <div class="viz-sub">可執行動作</div>
              <ul class="list">
                <li v-for="(a,ai) in r.actions" :key="ai">{{ a }}</li>
              </ul>
            </div>

            <div class="mt" v-if="r.avoid?.length">
              <div class="viz-sub">避免</div>
              <ul class="list subtle">
                <li v-for="(x,xi) in r.avoid" :key="xi">{{ x }}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- ✅ NEW：連鎖預測（L6） -->
      <section class="block" v-if="guidanceChains.length">
        <div class="block-title ink-font">連鎖預測</div>

        <div class="chain-grid">
          <div class="chain-card" v-for="(c,i) in guidanceChains" :key="c.id || i">
            <div class="chain-head">
              <div class="ink-font">{{ c.title || '可能走向' }}</div>
              <div class="chain-tag" v-if="c.themeKey">{{ c.themeKey }}</div>
            </div>

            <div class="chain-sec" v-if="c.short?.length">
              <div class="chain-k ink-font">短期</div>
              <ul class="list"><li v-for="(x,xi) in c.short" :key="xi">{{ x }}</li></ul>
            </div>

            <div class="chain-sec" v-if="c.mid?.length">
              <div class="chain-k ink-font">中期</div>
              <ul class="list"><li v-for="(x,xi) in c.mid" :key="xi">{{ x }}</li></ul>
            </div>

            <div class="chain-sec" v-if="c.long?.length">
              <div class="chain-k ink-font">長期</div>
              <ul class="list"><li v-for="(x,xi) in c.long" :key="xi">{{ x }}</li></ul>
            </div>
          </div>
        </div>
      </section>

      <!-- E. 象圖（如果有） -->
      <section class="block" v-if="imageSrc || imagePrompt">
        <div class="block-title ink-font">象圖</div>

        <div v-if="imageSrc" class="img-frame">
          <img :src="imageSrc" alt="象圖" />
        </div>

        <div v-else class="img-placeholder">
          <div class="img-ph-title ink-font">尚未接圖像服務</div>
          <div class="img-ph-text">
            目前以「象圖提示詞」佔位：<span class="mono">{{ imagePrompt }}</span>
          </div>
        </div>
      </section>

      <!-- F. 敘事報告（M-3-E-1：本地生成/提示詞） -->
      <section class="block" v-if="narrativeDisplayText || narrativePrompt || isFallback">
        <div class="block-title ink-font">敘事報告</div>

        <!-- 主報告：直接顯示 text -->
        <div class="ai-block" v-if="narrativeDisplayText">
          <div class="ai-text">{{ narrativeDisplayText }}</div>

          <div class="prompt-actions">
            <button class="mini-btn" @click="copyReport">複製報告</button>
            <button class="mini-btn" v-if="narrativePrompt" @click="showPrompt = !showPrompt">
              {{ showPrompt ? '收起提示詞' : '顯示提示詞' }}
            </button>
          </div>
        </div>

        <!-- 沒 text 時：先顯示 prompt 佔位（避免空白） -->
        <div class="ai-block" v-else>
          <div class="ai-sub">
            尚未生成敘事報告文字；目前先顯示「提示詞」供測試。
          </div>
          <textarea class="prompt-box" :value="narrativePrompt" readonly></textarea>
          <div class="prompt-actions">
            <button class="mini-btn" @click="copyPrompt">複製提示詞</button>
          </div>
        </div>

        <!-- 折疊 Prompt -->
        <div class="mt" v-if="showPrompt && narrativePrompt">
          <div class="viz-sub">提示詞（debug 用）</div>
          <textarea class="prompt-box" :value="narrativePrompt" readonly></textarea>
          <div class="prompt-actions">
            <button class="mini-btn" @click="copyPrompt">複製提示詞</button>
          </div>
        </div>
      </section>

      <!-- ✅ 敘事報告（M-3-E-3：正式顯示 text；debug 才顯示 prompt/json/mode） -->
      <!-- ✅ 整體報告（M-3-E-4：結構化顯示） -->
      <section class="block" v-if="narrativeDisplayText || narrativeSections?.length || (showNarrativeDebug && narrativePrompt)">
        <div class="block-title ink-font">整體報告</div>

        <!-- 來源（debug 才顯示） -->
        <div class="viz-sub" v-if="showNarrativeDebug && narrativeMode">
          來源：<span class="mono">{{ narrativeMode }}</span>
        </div>

        <!-- ✅ A) 結構化 sections（優先顯示） -->
        <div class="ai-block" v-if="narrativeSections?.length">
          <div
            class="report-card"
            v-for="(sec, i) in narrativeSections"
            :key="sec.id || sec.key || i"
          >
            <div class="report-title ink-font">
              {{ sec.title || sec.k || `段落 ${i + 1}` }}
            </div>

            <div class="report-sub" v-if="sec.subtitle">{{ sec.subtitle }}</div>

            <!-- 文字段 -->
            <div class="report-text" v-if="sec.text">
              {{ sec.text }}
            </div>

            <!-- 條列 -->
            <ul class="list" v-if="Array.isArray(sec.bullets) && sec.bullets.length">
              <li v-for="(b, bi) in sec.bullets" :key="bi">{{ b }}</li>
            </ul>

            <!-- steps（若 schema 有） -->
            <div class="mt" v-if="Array.isArray(sec.steps) && sec.steps.length">
              <div class="viz-sub">步驟</div>
              <ol class="list">
                <li v-for="(s, si) in sec.steps" :key="si">{{ s }}</li>
              </ol>
            </div>

            <!-- warnings（若 schema 有） -->
            <div class="mt" v-if="Array.isArray(sec.warnings) && sec.warnings.length">
              <div class="viz-sub">警語</div>
              <ul class="list subtle">
                <li v-for="(w, wi) in sec.warnings" :key="wi">{{ w }}</li>
              </ul>
            </div>
          </div>

          <div class="prompt-actions">
            <button class="mini-btn" @click="copyReport">複製報告</button>

            <button
              v-if="showNarrativeDebug && narrativePrompt"
              class="mini-btn"
              @click="showPrompt = !showPrompt"
            >
              {{ showPrompt ? '收起提示詞' : '顯示提示詞' }}
            </button>

            <button
              v-if="showNarrativeDebug && narrativeJson"
              class="mini-btn"
              @click="showJson = !showJson"
            >
              {{ showJson ? '收起 JSON' : '顯示 JSON' }}
            </button>
          </div>
        </div>

        <!-- ✅ B) fallback：沒有 sections 就顯示 narrativeText -->
        <div class="ai-block" v-else-if="narrativeDisplayText">
          <div class="ai-text">{{ narrativeDisplayText }}</div>

          <div class="prompt-actions">
            <button class="mini-btn" @click="copyReport">複製報告</button>

            <button
              v-if="showNarrativeDebug && narrativePrompt"
              class="mini-btn"
              @click="showPrompt = !showPrompt"
            >
              {{ showPrompt ? '收起提示詞' : '顯示提示詞' }}
            </button>

            <button
              v-if="showNarrativeDebug && narrativeJson"
              class="mini-btn"
              @click="showJson = !showJson"
            >
              {{ showJson ? '收起 JSON' : '顯示 JSON' }}
            </button>
          </div>
        </div>

        <!-- ✅ C) debug：提示詞 / JSON -->
        <div class="mt" v-if="showNarrativeDebug">
          <div class="mt" v-if="showPrompt && narrativePrompt">
            <div class="viz-sub">提示詞（debug）</div>
            <textarea class="prompt-box" :value="narrativePrompt" readonly></textarea>
            <div class="prompt-actions">
              <button class="mini-btn" @click="copyPrompt">複製提示詞</button>
            </div>
          </div>

          <div class="mt" v-if="showJson && narrativeJson">
            <div class="viz-sub">JSON（debug）</div>
            <pre class="json-box">{{ JSON.stringify(narrativeJson, null, 2) }}</pre>
          </div>
        </div>
      </section>

      <div class="viz-sub" v-if="isFallback">
        {{ data.value?.narrative?.meta?.userMessage || '目前顯示的是保底結果（避免畫面中斷）。' }}
      </div>

      <section
        class="block"
        v-if="showNarrativeDebug && isFallback && debugError"
      >
        <div class="block-title ink-font">系統除錯資訊</div>
        <div class="viz-sub">
          來源：<span class="mono">{{ debugSource }}</span>
        </div>
        <pre class="json-box">{{ debugError }}</pre>
      </section>

      <div class="prompt-actions" v-if="isFallback || showNarrativeDebug">
        <button class="mini-btn" v-if="isFallback" @click="retryConsult">重試一次</button>
        <button class="mini-btn" v-if="showNarrativeDebug" @click="purgeCache">清除快取</button>
      </div>

      <!-- Reading Narrative (derived from readingResult) -->
      <section class="block">
        <div class="block-title ink-font">敘事卦象（debug）</div>
        <div v-if="readingResult && readingNarrative">
          <div class="ai-block">
            <div class="ai-text">{{ readingNarrative.whereLine }}</div>
            <div class="mt"><div class="viz-sub">為何卡住</div></div>
            <ul class="list">
              <li v-for="(w, wi) in readingNarrative.whyLines" :key="wi">{{ w }}</li>
            </ul>
            <div class="mt"><div class="viz-sub">下一步</div></div>
            <ul class="list">
              <li v-for="(n, ni) in readingNarrative.nextLines" :key="ni">{{ n }}</li>
            </ul>
          </div>
        </div>
        <div v-else>
          <div class="ai-sub">尚未取得卦象</div>
          <div class="mt" v-if="readingError">
            <div class="viz-sub">錯誤資訊</div>
            <pre class="json-box">{{ readingError?.message || readingError }}</pre>
          </div>
        </div>
      </section>

      <!-- Reading Engine Debug Panel -->
      <section class="block" v-if="readingResult || readingError">
        <div class="block-title ink-font">Reading Engine（Round1-4）</div>

        <div v-if="readingError">
          <div class="viz-sub">產出失敗，請檢查 selections（暫用樣本）</div>
          <pre class="json-box">{{ readingError?.message || readingError }}</pre>
          <div class="mt">
            <div class="viz-sub">Selections</div>
            <pre class="json-box">{{ JSON.stringify(selections, null, 2) }}</pre>
          </div>
        </div>

        <div v-else>
          <div class="mini">
            <div class="mini-row">
              <div class="mini-k ink-font">Selection Source</div>
              <div class="mini-v">
                <span class="pill">{{ selectionSource }}</span>
                <span class="pill" v-if="round3Fallback">round3_fallback=true</span>
              </div>
            </div>
            <div class="mini-row">
              <div class="mini-k ink-font">Top Themes</div>
              <div class="mini-v">
                <span v-for="t in readingTopThemes" :key="t.theme_id" class="pill">
                  {{ t.theme_id }} ({{ t.score?.toFixed(2) }})
                </span>
              </div>
            </div>
            <div class="mini-row">
              <div class="mini-k ink-font">Facets</div>
              <div class="mini-v">
                <span v-for="f in readingFacetTop" :key="f.facet" class="pill">
                  {{ f.facet }} ({{ f.score?.toFixed(2) }})
                </span>
              </div>
            </div>
            <div class="mini-row" v-if="readingSignals.length">
              <div class="mini-k ink-font">Round2 Signals</div>
              <div class="mini-v">
                <span v-for="s in readingSignals" :key="s.signal_key" class="pill">
                  {{ s.signal_key }} ({{ s.score }})
                </span>
              </div>
            </div>
            <div class="mini-row" v-if="readingAnchors.length">
              <div class="mini-k ink-font">Round4 Anchors</div>
              <div class="mini-v">
                <span v-for="a in readingAnchors" :key="a.anchor_key" class="pill">
                  {{ a.anchor_key }} ({{ a.weight }})
                </span>
              </div>
            </div>
          <div class="mini-row" v-if="!readingSignals.length">
            <div class="mini-k ink-font">Warning</div>
            <div class="mini-v">
              ⚠️ {{ round2SignalWarning }}
              <div class="mt-4">已解析 Round2 IDs：{{ round2ParsedIds.join(', ') }}</div>
              <div class="mt-4">Round2 payload (前 3 筆)：{{ JSON.stringify(round2PayloadPreview) }}</div>
            </div>
          </div>
          <div class="mini-row">
            <div class="mini-k ink-font">Engagement</div>
              <div class="mini-v">
                <span class="pill">active_ms: {{ engagementMetrics.active_ms }}</span>
                <span class="pill">idle_total_ms: {{ engagementMetrics.idle_gaps_total_ms }}</span>
                <span class="pill">idle_count: {{ engagementMetrics.idle_gaps_count }}</span>
                <span class="pill">scroll_max%: {{ engagementMetrics.scroll_depth_max }}</span>
                <span class="pill">revisit: {{ engagementMetrics.revisit_count }}</span>
                <span class="pill">share_click: {{ engagementMetrics.share_click }}</span>
              </div>
            </div>
          </div>

          <div class="mt" v-if="readingFacets.length > 3">
            <details>
              <summary class="viz-sub">全部 facet</summary>
              <ul class="list subtle">
                <li v-for="f in readingFacets" :key="f.facet">
                  {{ f.facet }}：{{ f.score?.toFixed(3) }}
                </li>
              </ul>
            </details>
          </div>

          <div class="mt">
            <details>
              <summary class="viz-sub">Debug JSON</summary>
              <pre class="json-box">{{ JSON.stringify(readingResult, null, 2) }}</pre>
              <div class="mt" v-if="readingOutputV2">
                <div class="viz-sub">Output V2</div>
                <pre class="json-box">{{ JSON.stringify(readingOutputV2, null, 2) }}</pre>
              </div>
            </details>
          </div>

          <div class="mt">
            <div class="viz-sub">Element Prior（五行向量）</div>
            <div class="mini">
              <div class="mini-row">
                <div class="mini-k ink-font">alpha</div>
                <div class="mini-v">
                  {{ readingResult?.metaphysics?.alpha ?? readingResult?.outputV2?.meta?.alpha ?? 'n/a' }}
                </div>
              </div>
              <div class="mini-row">
                <div class="mini-k ink-font">userElementVector</div>
                <div class="mini-v mono">{{ JSON.stringify(readingResult?.metaphysics?.userElementVector ?? null) }}</div>
              </div>
              <div class="mini-row">
                <div class="mini-k ink-font">priorElementVector</div>
                <div class="mini-v mono">
                  {{ JSON.stringify(readingResult?.metaphysics?.priorElementVector ?? readingResult?.metaphysics?.elementPrior?.distribution ?? null) }}
                </div>
              </div>
              <div class="mini-row">
                <div class="mini-k ink-font">finalElementVector</div>
                <div class="mini-v mono">
                  {{ JSON.stringify(readingResult?.metaphysics?.finalElementVector ?? readingResult?.outputV2?.meta?.final_element_vector ?? null) }}
                </div>
              </div>
              <div class="mini-row">
                <div class="mini-k ink-font">dominant / weakest</div>
                <div class="mini-v mono">
                  {{ readingResult?.metaphysics?.elementPrior?.dominant ?? 'n/a' }} /
                  {{ readingResult?.metaphysics?.elementPrior?.weakest ?? 'n/a' }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <footer class="foot">
        <div class="note">此為象法推演，旨在照見與整理；非醫療、法律或投資建議。</div>
      </footer>

      <!-- 右下角：另起一局 -->
      <ResetRitual @reset="emit('reset')" />
    </section>

    <!-- 無資料 -->
    <section class="panel" v-else>
      <header class="header">
        <h2 class="title ink-font">天機未成</h2>
        <p class="subtitle">請先完成前段推演</p>
      </header>
      <ResetRitual @reset="emit('reset')" />
    </section>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import ResetRitual from '../components/ResetRitual.vue'
import { clearOracleCache } from '../core/SoulArchitect.js'
import { capturePayEvent, captureEvent } from '../core/telemetry/telemetryClient.js'
import readingEngine from '../core/flow/readingEngine.v1.js'
import buildReadingNarrative from '../core/flow/readingNarrative.v1.js'
import EngagementTracker from '../core/flow/engagementTracker.v1.js'
import round4Anchors from '../core/ontology/round4Anchors.v1.json' with { type: 'json' }

const extractStateTags = () => []
const buildReadingOutputV2 = (readingResult, extra = {}) => ({
  ...(readingResult || {}),
  meta: { ...(readingResult?.meta || {}), ...extra, source: 'governance-stub' }
})

const emit = defineEmits(['reset'])

const props = defineProps({
  data: { type: Object, default: null },
  oracleStatus: { type: Object, default: null }
})

const showJson = ref(false)
const showPrompt = ref(false)
const showNarrativeDebug = computed(
  () => String(import.meta.env.VITE_DEBUG_NARRATIVE || '').toLowerCase() === 'true'
)
const PAYWALL_TELEMETRY_ENABLED =
  (import.meta.env.VITE_TELEMETRY_PAYWALL || '').toLowerCase() === 'true'
const PAYWALL_SOURCE_STAGE = 'dashboard'

/* =========================
  Reading Engine (Round1~4)
========================= */
const SAMPLE_SELECTIONS = {
  round1: { domain_key: 'career' },
  round2: {
    situation_answers: {
      r2_s02_money_pressure: 'B',
      r2_s05_work_stuck: 'C'
    }
  },
  round3: {
    theme_answers: [
      {
        theme_id: 'chronic_depletion',
        question_index: 0,
        choice: '覺得身體沉重，想躲回被窩'
      },
      {
        theme_id: 'loss_of_agency',
        question_index: 0,
        choice: '加倍兼職，試圖對抗命運'
      }
    ]
  },
  round4: {
    anchor_answers: [
      {
        question_id: 'r4_a01',
        choice: '先停一下，拆解回饋裡可行的部分再前進'
      }
    ]
  }
}

const selections = ref({ ...SAMPLE_SELECTIONS })
const selectionSource = ref('fallback-sample')
const round3Fallback = ref(false)

const readingResult = ref(null)
const readingError = ref(null)

const readingTopThemes = computed(() =>
  (readingResult.value?.top_themes || []).slice(0, 3)
)
const readingFacets = computed(() => {
  const fs = readingResult.value?.facet_scores || {}
  return Object.entries(fs)
    .map(([facet, score]) => ({ facet, score }))
    .sort((a, b) => (b.score || 0) - (a.score || 0))
})
const readingFacetTop = computed(() => readingFacets.value.slice(0, 3))
const readingSignals = computed(
  () => readingResult.value?.situation_profile?.top_signals || []
)
const readingAnchors = computed(() => readingResult.value?.anchors || [])
const round2ParsedIds = computed(() =>
  Object.keys(selections.value?.round2?.situation_answers || {}).slice(0, 12)
)
const round2PayloadPreview = computed(() => {
  const arr = selections.value?.round2?.situation_answers || {}
  return Object.entries(arr || {})
    .slice(0, 3)
    .map(([question_id, key]) => {
      const choiceText = R2_OPTION_MAP.get(question_id)?.get(key) || key
      return { question_id, choice: choiceText }
    })
})
const round2SignalWarning = computed(() => {
  if (readingSignals.value.length) return ''
  if (!R2_ID_SET.size) return 'governance ontology 缺少必要欄位，無法建立映射'
  if (!round2ParsedIds.value.length) return '沒有可用的 Round2 作答'
  return 'Round2 signals = 0，可能是 choice_text 對不上 ontology 或題目 id 無法在 engine 內匹配'
})
const readingNarrative = computed(() => {
  if (!readingResult.value) return null
  return buildReadingNarrative(readingResult.value)
})
const readingOutputV2 = computed(() => {
  if (!readingResult.value) return null
  return buildReadingOutputV2(readingResult.value, { seed: 1, variant_id: 'v2_scene_01' })
})

/* =========================
  Engagement tracker
========================= */
const engagementMetrics = ref({
  active_ms: 0,
  idle_gaps_total_ms: 0,
  idle_gaps_count: 0,
  scroll_depth_max: 0,
  revisit_count: 0,
  share_click: 0,
  ts: 0
})
let engagementTracker = null

function updateEngagementSnapshot(snap) {
  engagementMetrics.value = {
    active_ms: Math.round(snap.active_ms),
    idle_gaps_total_ms: Math.round(snap.idle_gaps_total_ms),
    idle_gaps_count: snap.idle_gaps_count,
    scroll_depth_max: Math.round(snap.scroll_depth_max),
    revisit_count: snap.revisit_count,
    share_click: snap.share_click,
    ts: snap.ts
  }
}

function setupEngagementTracker() {
  if (engagementTracker) return
  engagementTracker = new EngagementTracker({ onUpdate: updateEngagementSnapshot })

  const handleActivity = () => engagementTracker && engagementTracker.markActive()
  const handleScroll = () => {
    const doc = document.documentElement
    const scrollTop = window.scrollY || doc.scrollTop || 0
    const height = doc.scrollHeight - doc.clientHeight
    const depth = height > 0 ? ((scrollTop + doc.clientHeight) / doc.scrollHeight) * 100 : 100
    engagementTracker && engagementTracker.markScroll(depth)
  }

  const handleVisibility = () => {
    if (!engagementTracker) return
    if (document.visibilityState === 'hidden') engagementTracker.goIdle()
    else engagementTracker.markActive()
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('click', handleActivity)
  window.addEventListener('keydown', handleActivity)
  window.addEventListener('pointerdown', handleActivity)
  document.addEventListener('visibilitychange', handleVisibility)

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('click', handleActivity)
    window.removeEventListener('keydown', handleActivity)
    window.removeEventListener('pointerdown', handleActivity)
    document.removeEventListener('visibilitychange', handleVisibility)
    if (engagementTracker) {
      engagementTracker.stop()
      engagementTracker = null
    }
  })
}

function loadJsonFromStorage(key) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

const R2_LIST = []
const R2_ID_SET = new Set()
const R2_OPTION_MAP = new Map()

const R4_LIST = Array.isArray(round4Anchors?.items) ? round4Anchors.items : []
const R4_ID_SET = new Set(R4_LIST.map(q => q?.id).filter(Boolean))
const R4_OPTION_MAP = new Map(
  R4_LIST.map(q => {
    const meta = Array.isArray(q?.choice_meta) ? q.choice_meta : []
    const map = new Map()
    meta.forEach((m, idx) => {
      const key = String.fromCharCode(65 + idx) // A/B/C/D by order
      map.set(key, String(m?.choice || key).trim())
    })
    return [q?.id, map]
  })
)

function resolveOptionKey(id, choiceVal, optionMap) {
  const val = String(choiceVal || '').trim()
  if (!val) return ''
  const upper = val.toUpperCase()
  if (['A', 'B', 'C', 'D'].includes(upper)) return upper
  const map = optionMap.get(id)
  if (map) {
    for (const [k, text] of map.entries()) {
      if (text === val) return k
    }
  }
  return ''
}

function normalizeRound2(candidate, notes = []) {
  const out = {}
  if (!candidate) return out
  const fromArray = Array.isArray(candidate?.situation_answers)
    ? candidate.situation_answers
    : Array.isArray(candidate)
      ? candidate
      : null
  const sourceObj =
    !fromArray && candidate?.situation_answers && typeof candidate.situation_answers === 'object'
      ? candidate.situation_answers
      : typeof candidate === 'object' && !Array.isArray(candidate)
        ? candidate
        : null

  if (fromArray) {
    fromArray.forEach(item => {
      const id = item?.question_id || item?.situation_id || item?.id
      const choice = item?.choice || item?.option || item?.choiceKey || item?.key
      if (!id || !R2_ID_SET.has(id)) {
        notes.push(`round2 id not found: ${id || 'unknown'}`)
        return
      }
      const key = resolveOptionKey(id, choice, R2_OPTION_MAP)
      if (!key) {
        notes.push(`round2 choice not mapped for ${id}`)
        return
      }
      out[id] = key
    })
  } else if (sourceObj) {
    Object.entries(sourceObj).forEach(([id, choice]) => {
      if (!R2_ID_SET.has(id)) {
        notes.push(`round2 id not found: ${id}`)
        return
      }
      const key = resolveOptionKey(id, choice, R2_OPTION_MAP)
      if (!key) {
        notes.push(`round2 choice not mapped for ${id}`)
        return
      }
      out[id] = key
    })
  }
  return out
}

function normalizeRound4(candidate, notes = []) {
  const out = {}
  if (!candidate) return out
  const fromArray = Array.isArray(candidate?.anchor_answers)
    ? candidate.anchor_answers
    : Array.isArray(candidate)
      ? candidate
      : null
  const sourceObj =
    !fromArray && candidate?.anchor_answers && typeof candidate.anchor_answers === 'object'
      ? candidate.anchor_answers
      : typeof candidate === 'object' && !Array.isArray(candidate)
        ? candidate
        : null

  if (fromArray) {
    fromArray.forEach(item => {
      const id = item?.question_id || item?.anchor_id || item?.id
      const choice = item?.choice || item?.option || item?.choiceKey || item?.key
      if (!id || !R4_ID_SET.has(id)) {
        notes.push(`round4 id not found: ${id || 'unknown'}`)
        return
      }
      const key = resolveOptionKey(id, choice, R4_OPTION_MAP)
      if (!key) {
        notes.push(`round4 choice not mapped for ${id}`)
        return
      }
      out[id] = key
    })
  } else if (sourceObj) {
    Object.entries(sourceObj).forEach(([id, choice]) => {
      if (!R4_ID_SET.has(id)) {
        notes.push(`round4 id not found: ${id}`)
        return
      }
      const key = resolveOptionKey(id, choice, R4_OPTION_MAP)
      if (!key) {
        notes.push(`round4 choice not mapped for ${id}`)
        return
      }
      out[id] = key
    })
  }
  return out
}

function normalizeRound3(candidate) {
  let fallback = false
  if (!candidate) return { theme_answers: SAMPLE_SELECTIONS.round3.theme_answers, fallback: true }

  const fromArray = Array.isArray(candidate?.theme_answers)
    ? candidate.theme_answers
    : Array.isArray(candidate)
      ? candidate
      : null

  if (fromArray) {
    const mapped = fromArray
      .map(item => {
        const theme_id = item?.theme_id || item?.themeId || item?.id
        const question_index =
          typeof item?.question_index === 'number'
            ? item.question_index
            : typeof item?.questionIndex === 'number'
              ? item.questionIndex
              : typeof item?.idx === 'number'
                ? item.idx
                : null
        const choice = item?.choice || item?.choiceText || item?.answer || item?.choiceKey
        if (!theme_id || question_index === null || question_index === undefined || !choice) return null
        return { theme_id, question_index, choice }
      })
      .filter(Boolean)
    if (mapped.length) return { theme_answers: mapped, fallback }
  }

  fallback = true
  return { theme_answers: SAMPLE_SELECTIONS.round3.theme_answers, fallback }
}

function normalizeSelections(src, domainOverride, notes = []) {
  const base = src ? JSON.parse(JSON.stringify(src)) : {}
  const domain_key = domainOverride || base?.round1?.domain_key || base?.domain_key || base?.domain || ''
  const round1 = { domain_key: domain_key || SAMPLE_SELECTIONS.round1.domain_key }

  const r2Normalized = normalizeRound2(base?.round2 || base?.situation_answers || base?.round2Answers, notes)
  const r4Normalized = normalizeRound4(base?.round4 || base?.anchor_answers || base?.round4Answers, notes)
  const r3Normalized = normalizeRound3(base?.round3 || base?.theme_answers || base?.round3Answers)

  const round2 = Object.keys(r2Normalized).length ? { situation_answers: r2Normalized } : SAMPLE_SELECTIONS.round2
  const round4 = Object.keys(r4Normalized).length ? { anchor_answers: r4Normalized } : SAMPLE_SELECTIONS.round4

  if (Object.keys(r2Normalized).length === 0) notes.push('round2 fallback to sample')
  if (Object.keys(r4Normalized).length === 0) notes.push('round4 fallback to sample')

  return { round1, round2, round3: { theme_answers: r3Normalized.theme_answers }, round4, round3Fallback: r3Normalized.fallback }
}

function round2ToEngineArray(r2Map) {
  return Object.entries(r2Map || {}).map(([question_id, key]) => {
    const choiceText = R2_OPTION_MAP.get(question_id)?.get(key) || key
    return { question_id, choice: choiceText }
  })
}

function round4ToEngineArray(r4Map) {
  return Object.entries(r4Map || {}).map(([question_id, key]) => {
    const choiceText = R4_OPTION_MAP.get(question_id)?.get(key) || key
    return { question_id, choice: choiceText }
  })
}

function isValidSelections(sel) {
  if (!sel) return false
  const r2Ok = sel?.round2?.situation_answers && Object.keys(sel.round2.situation_answers).length > 0
  const r3Ok = Array.isArray(sel?.round3?.theme_answers) && sel.round3.theme_answers.length > 0
  const r4Ok = sel?.round4?.anchor_answers && Object.keys(sel.round4.anchor_answers).length > 0
  return r2Ok && r3Ok && r4Ok
}

function buildSelections() {
  const domainFromProps = resonance.value?.domain || ''
  const draft = loadJsonFromStorage('soul_r3_draft_v1')
  const domainFromDraft = draft?.selectedDomain || ''
  const domainOverride = domainFromProps || domainFromDraft || ''

  const candidates = [
    { src: data.value?.readingSelections, label: 'props.readingSelections' },
    { src: data.value?.resonance?.readingSelections, label: 'props.resonance.readingSelections' },
    { src: loadJsonFromStorage('readingSelections'), label: 'localStorage:readingSelections' },
    { src: loadJsonFromStorage('reading_selections'), label: 'localStorage:reading_selections' },
    { src: loadJsonFromStorage('reading_selections_v1'), label: 'localStorage:reading_selections_v1' }
  ]

  for (const c of candidates) {
    if (!c?.src) continue
    const notes = []
    const normalized = normalizeSelections(c.src, domainOverride, notes)
    if (isValidSelections(normalized)) {
      if (notes.length) console.warn('[reading adapter] notes:', notes)
      selectionSource.value = c.label
      round3Fallback.value = normalized.round3Fallback
      return normalized
    }
  }

  // fallback sample，但帶入 domain（若有）
  const notes = []
  const fallback = normalizeSelections(SAMPLE_SELECTIONS, domainOverride, notes)
  selectionSource.value = 'fallback-sample'
  round3Fallback.value = fallback.round3Fallback
  return fallback
}

async function runReadingEngine() {
  try {
    readingError.value = null
    const normalized = buildSelections()
    selections.value = normalized
    const payload = {
      round1: normalized.round1,
      round2: { situation_answers: round2ToEngineArray(normalized.round2.situation_answers) },
      round3: normalized.round3,
      round4: { anchor_answers: round4ToEngineArray(normalized.round4.anchor_answers) }
    }
    readingResult.value = await readingEngine(payload)
    if (engagementTracker) {
      const readingId =
        readingResult.value?.domain_key ||
        readingResult.value?.top_themes?.[0]?.theme_id ||
        'reading'
      engagementTracker.setReadingId(readingId)
      engagementTracker.markActive()
    }
  } catch (err) {
    console.error('[05] readingEngine failed', err)
    readingResult.value = null
    readingError.value = err
  }
}

/* =========================
  基本資料
========================= */
const data = computed(() => props.data || null)
const resonance = computed(() => data.value?.resonance || {})
const info = computed(() => data.value?.info || {})
const insights = computed(() => data.value?.insights || {})
const psych = computed(() => data.value?.psych || {})
const guidance = computed(() => data.value?.guidance || {})
const narrative = computed(() => data.value?.narrative || {})

const guidanceRecs = computed(() => {
  const recommendations = guidance.value?.recommendations
  const interventions = guidance.value?.interventions
  if (Array.isArray(recommendations) && recommendations.length) return recommendations
  if (Array.isArray(interventions) && interventions.length) return interventions
  return []
})
const guidanceChains = computed(() => (Array.isArray(guidance.value?.chains) ? guidance.value.chains : []))
const infoTitle = computed(() => info.value?.title || info.value?.label || '命盤回響')
const infoSubtitle = computed(() => (info.value?.label ? `卦象：${info.value.label}` : '象起於心，合參成局'))

const insightsText = computed(() => String(insights.value?.text || '').trim())
const highlights = computed(() => Array.isArray(insights.value?.highlights) ? insights.value.highlights : [])

const imagePrompt = computed(() => String(insights.value?.imagePrompt || '').trim())

/* ✅ 母題命中：直接吃 psych.motherThemes */
const motherThemes = computed(() => {
  const themes = psych.value?.motherThemes
  const candidate = [themes?.top, themes?.hits, Array.isArray(themes) ? themes : null].find(
    arr => Array.isArray(arr) && arr.length
  )
  return candidate ? candidate.slice(0, 6) : []
})

/* M-8.3: 錨點語句 */
const anchors = computed(() => data.value?.anchors || {})
const primaryAnchor = computed(() => anchors.value?.primary || null)
const primaryAnchorText = computed(() => {
  const text = primaryAnchor.value?.text || ''
  if (!text) return ''
  // 可選：加上 hedge 語氣，但不過量
  return text
})
const anchorDebug = computed(() => {
  if (!DEBUG_NARRATIVE) return null
  const debug = anchors.value?.debug || {}
  return {
    primaryId: primaryAnchor.value?.id || 'none',
    primaryTheme: debug.primaryTheme || 'unknown',
    totalAnchors: debug.totalAnchors || 0
  }
})

// M-8.4 Fix: Anchor telemetry tracking with variantKey and improved dwell tracking
const anchorSection = ref(null)
let anchorShownAt = null
let anchorDwellTimers = []
let anchorLeftAt = null

function trackAnchorShown() {
  if (!primaryAnchor.value) return
  anchorShownAt = Date.now()
  anchorLeftAt = null
  const stateTags = extractStateTags({ psych: psych.value, resonance: resonance.value, guidance: guidance.value })
  const variantKey = anchors.value?.primary?.variantKey || 'default'
  
  captureEvent('anchor_shown', {
    anchor_id: primaryAnchor.value.id || 'unknown',
    mother_theme: anchorDebug.value?.primaryTheme || 'unknown',
    tags_count: stateTags.length,
    variant_key: variantKey
  })
  
  // M-8.4 Fix: Track dwell at 2s, 5s, 10s milestones
  const milestones = [2000, 5000, 10000]
  anchorDwellTimers = milestones.map(ms => {
    return setTimeout(() => {
      const dwellMs = Date.now() - anchorShownAt
      captureEvent('anchor_dwell_ms', {
        anchor_id: primaryAnchor.value.id || 'unknown',
        dwell_ms: dwellMs,
        milestone: ms
      })
    }, ms)
  })
}

function trackAnchorLeft() {
  if (!primaryAnchor.value || !anchorShownAt) return
  if (anchorLeftAt) return // Already tracked
  
  anchorLeftAt = Date.now()
  const dwellMs = anchorLeftAt - anchorShownAt
  
  // Clear pending timers
  anchorDwellTimers.forEach(timer => clearTimeout(timer))
  anchorDwellTimers = []
  
  captureEvent('anchor_dwell_ms', {
    anchor_id: primaryAnchor.value.id || 'unknown',
    dwell_ms: dwellMs,
    milestone: 'left'
  })
}

watch(primaryAnchor, (newVal, oldVal) => {
  if (oldVal && !newVal) {
    // Anchor was removed, track leave
    trackAnchorLeft()
  } else if (newVal) {
    nextTick(() => {
      trackAnchorShown()
    })
  }
}, { immediate: true })

// M-8.4 Fix: Track when user leaves the page
const handleBeforeUnload = () => {
  trackAnchorLeft()
}

onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload)
})

onUnmounted(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
  trackAnchorLeft()
  anchorDwellTimers.forEach(timer => clearTimeout(timer))
})

/* 支援 imageUrl / imageBase64（若未接後端，通常沒有） */
const imageSrc = computed(() => {
  const url = insights.value?.imageUrl
  if (url) return url
  const b64 = insights.value?.imageBase64
  if (b64 && String(b64).startsWith('data:image')) return b64
  if (b64) return `data:image/png;base64,${b64}`
  return ''
})

const narrativeSections = computed(() => {
  const json = narrative.value?.json
  const secs = json?.sections || json?.report?.sections || []
  return Array.isArray(secs) ? secs : []
})

const narrativeJson = computed(() => narrative.value?.json || null)
const narrativePrompt = computed(() => String(narrative.value?.prompt || '').trim())
const narrativeText = computed(() => String(narrative.value?.text || '').trim())
const narrativeMode = computed(() => String(narrative.value?.mode || '').trim())
const debugError = computed(() => data.value?.narrative?.meta?.error || '')
const debugSource = computed(() => data.value?.narrative?.meta?.source || '')
const isFallback = computed(() => data.value?.narrative?.mode === 'fallback')
const narrativeDisplayText = computed(() => {
  if (narrativeText.value) return narrativeText.value
  if (isFallback.value) return '目前為保底報告，內容生成中或暫時不可用，請稍後重試。'
  return ''
})

const basePaywallPayload = computed(() => {
  const planId = String(info.value?.planId || 'unknown')
  const priceTier = String(info.value?.priceTier || 'unknown')
  const currency = String(info.value?.currency || '').slice(0, 12)
  const experiment = String(import.meta.env.VITE_EXPERIMENT_KEY || '').slice(0, 60)
  return {
    planId,
    priceTier,
    currency,
    sourceStage: PAYWALL_SOURCE_STAGE,
    experiment
  }
})

function trackPayEvent(type, extra = {}) {
  if (!PAYWALL_TELEMETRY_ENABLED) return
  const payload = { ...basePaywallPayload.value, ...extra }
  capturePayEvent(type, payload)
}

function trackPaywallView() {
  trackPayEvent('view')
}

// 留作未來付費 CTA 按鈕使用，避免改 UI 也先備妥埋點
function trackPaywallClick(meta = {}) {
  trackPayEvent('click', meta)
}

function trackCheckoutStart(meta = {}) {
  trackPayEvent('checkout_start', meta)
}

function trackPurchaseSuccess(meta = {}) {
  trackPayEvent('purchase_success', meta)
}

onMounted(() => {
  trackPaywallView()
  runReadingEngine()
  setupEngagementTracker()
})

watch(
  () => props.data,
  () => {
    runReadingEngine()
  }
)

async function copyText(text, successMessage) {
  if (!text) return
  try {
    await navigator.clipboard.writeText(text)
    alert(successMessage)
  } catch (error) {
    console.error(error)
    alert('複製失敗：瀏覽器權限或非 HTTPS 環境可能會擋。')
  }
}
const copyReport = () => copyText(narrativeDisplayText.value, '已複製報告 ✅')
const copyPrompt = () => copyText(narrativePrompt.value, '已複製提示詞 ✅')
const retryConsult = () => emit('reset')
const purgeCache = () => {
  try {
    clearOracleCache()
    console.log('[05] oracle cache cleared by user')
  } catch (error) {
    console.error('[05] failed to clear oracle cache', error)
  }
}

/* =========================
  03 路徑（Round2 / Round3）
========================= */
const userChoices = computed(() => resonance.value?.userChoices || [])
const domain = computed(() => resonance.value?.domain || '')
const domainLabel = computed(() => resonance.value?.domainLabel || '')

const r2 = computed(() => userChoices.value?.[1] || null)
const r3 = computed(() => userChoices.value?.slice(2) || [])
const r2Label = computed(() => String(r2.value?.label || '').trim())
const r3Labels = computed(() =>
  r3.value.map(x => String(x?.label || '').trim()).filter(Boolean).slice(0, 3)
)

/* =========================
  一拳：斷語 / 白話
========================= */
const allSentences = computed(() => {
  const t = insightsText.value
  if (!t) return []
  return t.replace(/\r/g, '').split(/[。！？\n]/).map(x => x.trim()).filter(Boolean)
})

const hookLine = computed(() => {
  const d = domain.value
  const r2L = r2Label.value
  const tags = r3Labels.value

  if (d === 'money') {
    if (r2L.includes('等') || r2L.includes('守') || r2L.includes('不敢') || r2L.includes('觀望')) {
      return '你不是缺財路，是把「不犯錯」當成唯一的出路。'
    }
    if (r2L.includes('焦') || r2L.includes('慌') || r2L.includes('怕') || r2L.includes('失')) {
      return '你不是在算錢，你是在算：失敗會不會把你整個人一起帶走。'
    }
    if (tags.some(t => /欠|卡|壓|洞|債|周轉|窟窿/.test(t))) {
      return '你現在的財局，不是窮，是「被一筆看不見的帳追著跑」。'
    }
    return '你一直想變好，但你更怕：一旦選錯，就得為它負責。'
  }

  if (d === 'relationship') {
    if (r2L.includes('拉') || r2L.includes('扯') || r2L.includes('進退') || r2L.includes('兩難')) {
      return '你不是不愛，是你不敢把「需要」交到別人手上。'
    }
    if (tags.some(t => /冷|距|界|退|疏|淡/.test(t))) {
      return '你把距離當安全感，但代價是：你也把溫度一起隔開了。'
    }
    return '你想要靠近，但你更怕：靠近後才發現自己不被珍惜。'
  }

  const s = allSentences.value
  if (s.length === 0) return '你不是缺什麼，而是一直在等一個不必承擔代價的答案。'
  if ((s[0] || '').length >= 10) return s[0]
  if (s[1]) return `${s[0]}，${s[1]}`
  return s[0]
})

const hookPlain = computed(() => {
  const d = domain.value
  const r2L = r2Label.value
  const tags = r3Labels.value

  if (d === 'money') {
    const extra = tags.length ? `你剛剛點的「${tags.join('、')}」就是那個扳機。` : ''
    return `翻成白話：你不是不會賺，而是你把每一步都當成「不能輸」的賭局，所以你會拖、會反覆驗算、會更累。${extra}`
  }

  if (d === 'relationship') {
    const extra = tags.length ? `你剛剛點的「${tags.join('、')}」就是你最敏感的點。` : ''
    return `翻成白話：你不是不想好好愛，而是你很怕在關係裡失去主動權，所以你會先收、先退、先裝沒事。${extra}`
  }

  if (r2L) return `翻成白話：你現在卡住的核心，和你選的「${r2L}」一致——你在保護自己，但也把自己困住了。`
  return '把它翻成白話：你不是不努力，而是每一步都在替「失敗後的自己」預先收拾。'
})

/* =========================
  五行：把 elements 正規化成 0~100
========================= */
function toNum(x) {
  const n = Number(x)
  return Number.isFinite(n) ? n : 0
}
function normalizeTo100(obj) {
  const wood = toNum(obj.wood)
  const fire = toNum(obj.fire)
  const earth = toNum(obj.earth)
  const metal = toNum(obj.metal)
  const water = toNum(obj.water)
  const sum = wood + fire + earth + metal + water
  if (sum <= 0) return { wood: 20, fire: 20, earth: 20, metal: 20, water: 20 }
  return {
    wood: Math.round((wood / sum) * 100),
    fire: Math.round((fire / sum) * 100),
    earth: Math.round((earth / sum) * 100),
    metal: Math.round((metal / sum) * 100),
    water: Math.round((water / sum) * 100)
  }
}

const elementsPct = computed(() => normalizeTo100(resonance.value?.elements || {}))

const elementRows = computed(() => [
  { k: 'wood', kLabel: '木', v: elementsPct.value.wood },
  { k: 'fire', kLabel: '火', v: elementsPct.value.fire },
  { k: 'earth', kLabel: '土', v: elementsPct.value.earth },
  { k: 'metal', kLabel: '金', v: elementsPct.value.metal },
  { k: 'water', kLabel: '水', v: elementsPct.value.water }
])

/* =========================
  軸向：可讀提示
========================= */
const axes = computed(() => resonance.value?.axes || {})
const axisRows = computed(() => {
  const ax = axes.value || {}
  const move = toNum(ax.move)
  const inward = toNum(ax.inward)
  const heat = toNum(ax.heat)
  const damp = toNum(ax.damp)
  const boundary = toNum(ax.boundary)

  return [
    { k: 'move', kLabel: '動', desc: move >= inward ? '你會想推進，但推進前會先把路算乾淨。' : '你更傾向先收、先穩，再決定要不要動。' },
    { k: 'inward', kLabel: '守', desc: inward > move ? '你擅長忍耐與蓄勢，但也容易把焦慮悶在心裡。' : '你不太能久等，容易被時間與壓力推著走。' },
    { k: 'heat', kLabel: '火意', desc: heat > damp ? '情緒來得快，決斷也快；但快的代價是後悔也更刺。' : '你不輕易爆，但一旦累積太久會突然崩。' },
    { k: 'damp', kLabel: '濕意', desc: damp > heat ? '你對風險很敏感，直覺常先看到「會失去什麼」。' : '你比較能把情緒放旁邊，先做再說。' },
    { k: 'boundary', kLabel: '界', desc: boundary >= 1 ? '你需要界線，界線一亂就會失去安全感。' : '你更看重關係流動，願意為人留一步。' }
  ]
})
</script>

<style scoped>

.report-card{
  border:1px solid rgba(255,220,170,0.12);
  border-radius:16px;
  padding:14px 14px;
  background: rgba(0,0,0,0.18);
}

.report-card + .report-card{
  margin-top:12px;
}

.report-title{
  color: rgba(255,235,205,0.90);
  letter-spacing:4px;
  font-size:1.05rem;
}

.report-sub{
  margin-top:6px;
  color: rgba(210,200,180,0.62);
  letter-spacing:0.8px;
  font-size:0.92rem;
}

.report-text{
  margin-top:10px;
  color: rgba(210,200,180,0.80);
  line-height:1.85;
  letter-spacing:0.4px;
  white-space: pre-wrap;
}

.json-box{
  width:100%;
  margin-top:10px;
  padding:12px 12px;
  border-radius:14px;
  border:1px solid rgba(255,220,170,0.14);
  background: rgba(0,0,0,0.16);
  color: rgba(210,200,180,0.72);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  line-height:1.7;
  letter-spacing:0.4px;
  overflow:auto;
  max-height:360px;
}

.ai-sub{
  color: rgba(210,200,180,0.62);
  font-size:0.92rem;
  line-height:1.65;
  letter-spacing:0.6px;
}

.prompt-box{
  width:100%;
  min-height:220px;
  margin-top:10px;
  padding:12px 12px;
  border-radius:14px;
  border:1px solid rgba(255,220,170,0.14);
  background: rgba(0,0,0,0.18);
  color: rgba(210,200,180,0.82);
  line-height:1.7;
  letter-spacing:0.4px;
  resize: vertical;
  outline:none;
}

.prompt-actions{
  margin-top:10px;
  display:flex;
  justify-content:flex-end;
}

.mini-btn{
  padding:10px 14px;
  border-radius:12px;
  background: rgba(0,0,0,0.28);
  border:1px solid rgba(255,220,170,0.16);
  color: rgba(255,235,205,0.9);
  letter-spacing:2px;
  cursor:pointer;
}
.mini-btn:hover{
  background: rgba(212,175,55,0.12);
}

.chain-grid{
  margin-top:12px;
  display:grid;
  grid-template-columns: repeat(2, 1fr);
  gap:12px;
}
@media (max-width: 920px){
  .chain-grid{ grid-template-columns: 1fr; }
}
.chain-card{
  border:1px solid rgba(255,220,170,0.12);
  border-radius:16px;
  padding:12px 14px;
  background: rgba(0,0,0,0.18);
}
.chain-head{
  display:flex;
  justify-content:space-between;
  align-items:baseline;
  color: rgba(255,235,205,0.86);
  letter-spacing:2px;
}
.chain-tag{
  color: rgba(210,200,180,0.65);
  font-size:0.9rem;
}
.chain-sec{ margin-top:10px; }
.chain-k{
  color: rgba(255,235,205,0.82);
  letter-spacing:4px;
  font-size:0.95rem;
}

.dash-stage{
  min-height:100vh;
  background:#000;
  position:relative;
  display:flex;
  justify-content:center;
  align-items:flex-start;
  padding:80px 16px;
}

.veil-bg{
  position:absolute;
  inset:0;
  background: radial-gradient(circle at 50% 20%, #1c2228 0%, #000 75%);
  pointer-events:none;
}

.panel{
  position:relative;
  z-index:2;
  max-width:980px;
  width:100%;
  background: rgba(0,0,0,0.35);
  border:1px solid rgba(255,220,170,0.14);
  border-radius:22px;
  padding:34px 28px 38px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.55);
}

.header{ text-align:center; padding-bottom:10px; }
.title{ font-size:2.2rem; letter-spacing:6px; color:rgba(255,235,205,0.92); margin:0; }
.subtitle{ margin-top:10px; color:rgba(210,200,180,0.65); letter-spacing:2px; }

.block{ margin-top:26px; padding-top:6px; }
.block-title{ font-size:1.05rem; letter-spacing:5px; color:rgba(255,235,205,0.88); margin-bottom:10px; }

.punch{
  border:1px solid rgba(255,220,170,0.12);
  border-radius:18px;
  padding:18px 16px;
  background: rgba(0,0,0,0.22);
}
.punch-k{ color: rgba(210,200,180,0.66); letter-spacing:6px; font-size:0.92rem; }
.punch-v{ margin-top:10px; color: rgba(255,235,205,0.95); letter-spacing:2px; font-size:1.25rem; line-height:1.6; }
.punch-plain{ margin-top:10px; color: rgba(210,200,180,0.78); line-height:1.85; letter-spacing:0.4px; }

.viz{
  display:grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap:16px;
  margin-top:12px;
}
@media (max-width: 920px){
  .viz{ grid-template-columns: 1fr; }
}

.viz-title{ color: rgba(255,235,205,0.90); letter-spacing:5px; font-size:1.02rem; }
.viz-sub{ margin-top:6px; color: rgba(210,200,180,0.60); letter-spacing:1px; font-size:0.92rem; }

.bars{ margin-top:12px; display:flex; flex-direction:column; gap:10px; }
.bar-row{ display:flex; flex-direction:column; gap:6px; }
.bar-label{ display:flex; justify-content:space-between; align-items:baseline; color: rgba(255,235,205,0.84); letter-spacing:2px; }
.pct{ color: rgba(210,200,180,0.62); font-size:0.9rem; }
.bar-bg{ height:6px; border-radius:999px; background: rgba(255,255,255,0.08); overflow:hidden; }
.bar-fill{ height:100%; background: rgba(212,175,55,0.68); box-shadow: 0 0 18px rgba(212,175,55,0.12); transition: width 0.45s ease; }

.mini{ margin-top:12px; display:grid; grid-template-columns: repeat(2, 1fr); gap:10px; }
@media (max-width: 520px){
  .mini{ grid-template-columns: 1fr; }
}
.mini-row{
  border:1px solid rgba(255,220,170,0.12);
  border-radius:14px;
  padding:10px 12px;
  background: rgba(0,0,0,0.18);
}
.mini-k{ color: rgba(255,235,205,0.84); letter-spacing:4px; }
.mini-v{ margin-top:6px; color: rgba(210,200,180,0.70); font-size:0.92rem; line-height:1.65; }

.path{ margin-top:10px; display:flex; flex-wrap:wrap; gap:10px; }
.pill{
  border:1px solid rgba(255,220,170,0.14);
  border-radius:999px;
  padding:10px 12px;
  background: rgba(0,0,0,0.18);
  display:flex;
  gap:10px;
  align-items:baseline;
  color: rgba(210,200,180,0.80);
}
.pill span:first-child{ color: rgba(255,235,205,0.88); letter-spacing:3px; }

.ai-block{ display:flex; flex-direction:column; gap:10px; }
.ai-text{
  color: rgba(210,200,180,0.80);
  line-height:1.9;
  letter-spacing:0.5px;
  white-space: pre-wrap;
}

.list{ margin:0; padding-left:18px; color: rgba(255,235,205,0.82); line-height:1.85; letter-spacing:0.6px; }
.list.subtle{ color: rgba(210,200,180,0.72); }

.img-frame{ margin-top:10px; border:1px solid rgba(255,220,170,0.14); border-radius:16px; overflow:hidden; background: rgba(0,0,0,0.18); }
.img-frame img{ width:100%; display:block; }

.img-placeholder{ margin-top:10px; border:1px dashed rgba(255,220,170,0.18); border-radius:16px; padding:14px 14px; background: rgba(0,0,0,0.18); }
.img-ph-title{ color: rgba(255,235,205,0.86); letter-spacing:4px; }
.img-ph-text{ margin-top:8px; color: rgba(210,200,180,0.72); line-height:1.7; }
.mono{ font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; color: rgba(255,235,205,0.80); }

.foot{ margin-top:18px; padding:10px 4px; }
.note{ color: rgba(210,200,180,0.55); font-size:0.85rem; letter-spacing:1px; }
.mt{ margin-top:14px; }

.ink-font{ font-family:'Noto Serif TC', serif; }

/* ✅ NEW：母題卡片 */
.theme-grid{
  display:grid;
  grid-template-columns: repeat(2, 1fr);
  gap:10px;
  margin-top:10px;
}
@media (max-width: 720px){
  .theme-grid{ grid-template-columns: 1fr; }
}
.theme-card{
  border:1px solid rgba(255,220,170,0.12);
  border-radius:14px;
  padding:12px 12px;
  background: rgba(0,0,0,0.18);
}
.theme-k{ color: rgba(255,235,205,0.88); letter-spacing:3px; }
.theme-v{ margin-top:6px; }
.theme-desc{ margin-top:8px; color: rgba(210,200,180,0.70); line-height:1.65; font-size:0.92rem; }
</style>
