/**
 * Prototype UI
 * - user-facing: pure esoteric output (no psych terms)
 * - internal: loads compiled facet json and uses its structures
 *
 * Notes:
 * - We try to be tolerant to schema differences by probing common keys.
 * - If compiled format changes, adjust mapping logic here.
 */

const DEFAULT_COMPILED_PATH = window.__COMPILED_FACET__ || "domain/compiled/stress_recovery.compiled.v1.0.json";

const els = {
  badgeFacet: document.getElementById("badgeFacet"),
  badgeVersion: document.getElementById("badgeVersion"),
  badgeSource: document.getElementById("badgeSource"),
  statusText: document.getElementById("statusText"),
  loadError: document.getElementById("loadError"),
  questions: document.getElementById("questions"),
  btnSubmit: document.getElementById("btn-submit"),
  btnReset: document.getElementById("btn-reset"),
  result: document.getElementById("result"),
  detail: document.getElementById("detail"),
  lang: document.getElementById("lang"),
};

const state = {
  compiled: null,
  answers: new Map(),
  renderedLang: "zh",
};

function showError(msg) {
  els.loadError.style.display = "block";
  els.loadError.textContent = msg;
  els.statusText.textContent = "載入失敗";
}

function setMeta(compiled, sourcePath) {
  const facetId =
    compiled?.facetId || compiled?.facet_id || compiled?.id || compiled?.name || "unknown";
  const version =
    compiled?.domainVersion || compiled?.version || compiled?.schemaVersion || "unknown";

  els.badgeFacet.textContent = `facet: ${facetId}`;
  els.badgeVersion.textContent = `version: ${version}`;
  els.badgeSource.textContent = `source: ${sourcePath}`;
}

function t(obj, lang) {
  if (obj == null) return "";
  if (typeof obj === "string") return obj;
  if (typeof obj !== "object") return String(obj);
  const candidates = lang === "en"
    ? ["en", "en-US", "en_GB", "english"]
    : ["zh", "zh-Hant", "zh-TW", "zh_Hant", "chinese"];
  for (const k of candidates) {
    if (obj[k]) return obj[k];
  }
  for (const k of Object.keys(obj)) {
    if (typeof obj[k] === "string") return obj[k];
  }
  return "";
}

function pickQuestions(compiled) {
  const q =
    compiled?.questions ||
    compiled?.domain?.questions ||
    compiled?.content?.questions ||
    compiled?.questions?.items ||
    null;
  if (Array.isArray(q)) return q;
  if (q && Array.isArray(q.items)) return q.items;
  return [];
}

function normalizeQuestion(q) {
  const id = q.id || q.qid || q.key || q.code || "";
  const prompt = q.prompt || q.text || q.title || q.question || q.label || "";
  const options = q.options || q.choices || q.answers || q.items || [];
  return { id, prompt, options };
}

function normalizeOption(opt) {
  const value =
    opt.value ?? opt.id ?? opt.key ?? opt.code ?? opt.label ?? opt.text ?? "";
  const label =
    opt.label ?? opt.text ?? opt.title ?? opt.name ?? String(value);
  const score =
    opt.score ?? opt.weight ?? opt.points ?? opt.valueScore ?? null;
  return { value, label, score };
}

function renderQuestions(compiled) {
  els.questions.innerHTML = "";
  state.answers.clear();

  const list = pickQuestions(compiled).map(normalizeQuestion).filter(q => q.id && (q.prompt || q.options?.length));

  if (!list.length) {
    showError("找不到題目資料。請確認 compiled facet 的 questions 結構。");
    return;
  }

  list.forEach((q, idx) => {
    const card = document.createElement("div");
    card.className = "q";

    const head = document.createElement("div");
    head.className = "qtitle";
    const h3 = document.createElement("h3");
    h3.textContent = `${idx + 1}. ${t(q.prompt, state.renderedLang) || String(q.prompt)}`;
    const qid = document.createElement("div");
    qid.className = "qid";
    qid.textContent = q.id;

    head.appendChild(h3);
    head.appendChild(qid);

    const opts = document.createElement("div");
    opts.className = "opts";

    const optionList = Array.isArray(q.options) ? q.options : [];
    optionList.map(normalizeOption).forEach((o) => {
      const row = document.createElement("label");
      row.className = "opt";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q_${q.id}`;
      input.value = String(o.value);

      input.addEventListener("change", () => {
        state.answers.set(q.id, { value: o.value, score: o.score, label: o.label, raw: o });
        updateButtonsEnabled(list.length);
      });

      const text = document.createElement("div");
      text.innerHTML = `<div>${t(o.label, state.renderedLang) || String(o.label)}</div>`;

      row.appendChild(input);
      row.appendChild(text);
      opts.appendChild(row);
    });

    card.appendChild(head);
    card.appendChild(opts);
    els.questions.appendChild(card);
  });

  els.statusText.textContent = `已載入 ${list.length} 題`;
  updateButtonsEnabled(list.length);
}

function updateButtonsEnabled(total) {
  const answered = state.answers.size;
  els.btnReset.disabled = answered === 0;
  els.btnSubmit.disabled = answered !== total;
}

function sumScore(compiled) {
  const hasExplicit = compiled?.scoring || compiled?.scoreRules || compiled?.rules?.scoring;
  if (hasExplicit) {
    // TODO: map explicit scoring rules if needed; for MVP, use option scores.
  }
  let total = 0;
  for (const [, a] of state.answers) {
    if (typeof a.score === "number") total += a.score;
    else {
      const n = Number(a.value);
      if (!Number.isNaN(n)) total += n;
    }
  }
  return total;
}

function pickBands(compiled) {
  const bands =
    compiled?.bands ||
    compiled?.levels ||
    compiled?.results ||
    compiled?.scoring?.bands ||
    compiled?.outcomes ||
    null;
  if (Array.isArray(bands)) return bands;
  return [];
}

function chooseOutcome(compiled, score) {
  const bands = pickBands(compiled);
  if (!bands.length) return null;

  const norm = bands.map(b => ({
    id: b.id || b.key || b.code || "",
    min: (typeof b.min === "number") ? b.min : (typeof b.low === "number") ? b.low : null,
    max: (typeof b.max === "number") ? b.max : (typeof b.high === "number") ? b.high : null,
    threshold: (typeof b.threshold === "number") ? b.threshold : null,
    raw: b
  }));

  for (const b of norm) {
    if (b.min != null && b.max != null && score >= b.min && score <= b.max) return b.raw;
  }

  const withTh = norm.filter(b => b.threshold != null).sort((a,b) => a.threshold - b.threshold);
  if (withTh.length) {
    let chosen = withTh[0].raw;
    for (const b of withTh) {
      if (score >= b.threshold) chosen = b.raw;
    }
    return chosen;
  }

  return norm[0].raw;
}

function safeBlock(title, body) {
  const row = document.createElement("div");
  row.className = "row";
  const k = document.createElement("div");
  k.className = "k";
  k.textContent = title;
  const v = document.createElement("div");
  v.className = "v";
  v.textContent = body || "-";
  row.appendChild(k);
  row.appendChild(v);
  return row;
}

function renderResult(compiled) {
  const score = sumScore(compiled);
  const outcome = chooseOutcome(compiled, score);

  const title =
    t(outcome?.title, state.renderedLang) ||
    t(outcome?.name, state.renderedLang) ||
    outcome?.label ||
    "卦象已成";

  const narrative =
    t(outcome?.narrative, state.renderedLang) ||
    t(outcome?.desc, state.renderedLang) ||
    t(outcome?.description, state.renderedLang) ||
    "";

  const reco =
    t(outcome?.recommendation, state.renderedLang) ||
    t(outcome?.reco, state.renderedLang) ||
    t(outcome?.advice, state.renderedLang) ||
    "";

  const risk =
    t(outcome?.risk, state.renderedLang) ||
    t(outcome?.riskchain, state.renderedLang) ||
    t(outcome?.warning, state.renderedLang) ||
    "";

  const headline = `【${title}】`;
  const text = [headline, narrative, reco, risk].filter(Boolean).join("\n\n");

  els.result.textContent = text || "已出卦，但結果文案為空。";

  els.detail.innerHTML = "";
  els.detail.appendChild(safeBlock("本次卦象強度（內部）", String(score)));
  els.detail.appendChild(safeBlock("關鍵提示", reco || "—"));
  els.detail.appendChild(safeBlock("需留意", risk || "—"));
}

async function loadCompiled(path) {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status} while fetching ${path}`);
  return await res.json();
}

async function init() {
  state.renderedLang = els.lang.value;

  try {
    els.statusText.textContent = "載入 compiled facet…";
    const compiled = await loadCompiled(DEFAULT_COMPILED_PATH);
    state.compiled = compiled;
    setMeta(compiled, DEFAULT_COMPILED_PATH);
    renderQuestions(compiled);
    els.btnReset.disabled = true;

    els.btnSubmit.addEventListener("click", () => {
      renderResult(compiled);
    });

    els.btnReset.addEventListener("click", () => {
      document.querySelectorAll('input[type="radio"]').forEach(i => { i.checked = false; });
      state.answers.clear();
      updateButtonsEnabled(pickQuestions(compiled).length);
      els.result.textContent = "尚未出卦。";
      els.detail.innerHTML = "";
    });

    els.lang.addEventListener("change", () => {
      state.renderedLang = els.lang.value;
      renderQuestions(compiled);
      els.result.textContent = "尚未出卦。";
      els.detail.innerHTML = "";
    });

    els.statusText.textContent = "就緒";
  } catch (e) {
    console.error(e);
    showError(
      "載入 compiled facet 失敗。\n" +
      "請確認你是用 http server / npm dev 方式開啟，而不是 file://。\n" +
      "錯誤：" + (e?.message || String(e))
    );
  }
}

init();
