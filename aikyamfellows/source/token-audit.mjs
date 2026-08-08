/* aikyamfellows.org — token drift audit
 *
 * ⛔ THIS EXISTS BECAUSE AN LLM CANNOT DO IT BY LOOKING. Asking a model to
 * "check the tokens on the live page" gets you a plausible essay. Asking a
 * BROWSER to extract every declaration, every consumer and every computed
 * value — and then asking a model to judge the table — gets you findings.
 *
 * The browser measures. The model judges. This is the measuring half.
 *
 * Usage:  node token-audit.mjs [baseURL]
 */
const pw = (await import('/Users/shemeerp/.npm-global/lib/node_modules/playwright/index.js')).default;
const { chromium } = pw;
import { writeFileSync } from 'node:fs';

const BASE = process.argv[2] || 'https://folktaler.github.io/design-reviews/aikyamfellows/';
const PAGES = ['home','profile','fellows','topic','author','profile-variants','about',
  'partners','impact','contact','support','proudly-not-for-profit','foundation'];

/* ⭐⭐ SAMPLE THE FLUID CURVES — the defect this method was blind to, named by
 * an outside reviewer and the most valuable thing it said.
 *
 * Seven typography tokens are `clamp()` — mathematical curves, not values. A
 * snapshot at one viewport records a point on the curve and treats it as the
 * token. It cannot see whether the curve breaks its own floor at 320px, exceeds
 * its ceiling at 1920px, or crosses another token it is supposed to stay below.
 *
 * ⛔ AND ONE FAILURE MODE IS INVISIBLE ANY OTHER WAY: two steps of a ladder can
 * be correctly ordered at both ends and INVERT somewhere in the middle, because
 * they interpolate at different rates. Nothing renders wrong at the widths
 * anyone tests. */
const CURVE_WIDTHS = [320, 375, 414, 576, 624, 768, 1024, 1280, 1440, 1920];
const LADDER = ['--af-type-micro','--af-type-small','--af-type-ui','--af-type-body',
  '--af-type-standfirst','--af-type-subheading','--af-type-heading','--af-type-quote','--af-type-display'];

const b = await chromium.launch();
const perPage = {};
const curves = {};
{
  const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
  await p.goto(BASE + 'profile.html', { waitUntil: 'load' });
  for (const w of CURVE_WIDTHS) {
    await p.setViewportSize({ width: w, height: 800 });
    await p.waitForTimeout(60);
    curves[w] = await p.evaluate((L) => {
      const rs = getComputedStyle(document.documentElement);
      const px = (t) => {
        const el = document.createElement('div');
        el.style.cssText = `position:absolute;visibility:hidden;font-size:var(${t})`;
        document.body.appendChild(el);
        const v = parseFloat(getComputedStyle(el).fontSize);
        el.remove(); return +v.toFixed(2);
      };
      const out = { body: parseFloat(getComputedStyle(document.body).fontSize) };
      for (const t of L) out[t] = px(t);
      const p0 = document.querySelector('.prose p');
      out.column = p0 ? +p0.getBoundingClientRect().width.toFixed(1) : null;
      return out;
    }, LADDER);
  }
  await p.close();
}

for (const name of PAGES) {
  const p = await b.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 });
  await p.goto(BASE + name + '.html', { waitUntil: 'load' });
  perPage[name] = await p.evaluate(() => {
    const css = [...document.styleSheets].flatMap(s => {
      try { return [...s.cssRules].map(r => r.cssText); } catch { return []; }
    }).join('\n');

    const rs = getComputedStyle(document.documentElement);
    /* ⛔ RECORD THE DECLARED SOURCE, NOT ONLY THE COMPUTED VALUE — added 8 Aug
       after a reviewer working from this file reported that `--af-band-rule`
       used a raw hex instead of its own token. It does not; it reads
       `color-mix(in srgb, var(--af-paper) 30%, transparent)`. The audit had
       reported only the RESOLVED value, in which the var() is already gone, so
       the reviewer could not have known. An audit that hides the source invites
       exactly that error. */
    const declared = {}, source = {}, layer = {};
    for (const m of css.matchAll(/(--af-[a-z0-9-]+)\s*:\s*([^;}]+)/g)) {
      declared[m[1]] = rs.getPropertyValue(m[1]).trim();
      source[m[1]] = m[2].trim();
      /* ⭐ AND RECORD WHICH LAYER IT BELONGS TO. The same reviewer read
         `--af-paper-sunk` and `--af-surface-sunk` sharing a value as "two
         parallel naming conventions". They are the two halves of a deliberate
         split: colors.css holds physical swatches, theme.css holds semantic
         roles, and components may only reference the second. Flattening both
         into one list made an architecture look like drift. */
      layer[m[1]] = /^(#|rgb|hsl|[0-9.]+(px|rem|em|ms|s)?$)/.test(m[2].trim()) ? 'raw' : 'semantic';
    }
    const referenced = [...new Set([...css.matchAll(/var\(\s*(--af-[a-z0-9-]+)/g)].map(m => m[1]))];

    /* contrast of every text node against its EFFECTIVE background — walking up
       until an opaque ancestor is found, because `transparent` is the default
       and a naive read reports every element as failing. */
    const lum = (rgb) => {
      const c = rgb.match(/\d+(\.\d+)?/g).slice(0,3).map(v => {
        let s = +v / 255; return s <= 0.03928 ? s/12.92 : Math.pow((s+0.055)/1.055, 2.4);
      });
      return 0.2126*c[0] + 0.7152*c[1] + 0.0722*c[2];
    };
    /* ⛔ COMPOSITE THE ALPHA — added 8 Aug. The first version walked up to the
       first background that was not fully transparent and used it AS IF OPAQUE.
       On this system that is wrong in a specific, checkable place: several
       surfaces are `color-mix(… transparent)` — a 30%-opaque rule over a band.
       Reading that colour at face value tests a colour NO READER EVER SEES, and
       the number it produces is not conservative in a known direction: it can
       report a pass that fails, or a fail that passes. */
    const parse = (c) => {
      const n = (c.match(/[\d.]+/g) || []).map(Number);
      return { r: n[0]||0, g: n[1]||0, b: n[2]||0, a: n.length > 3 ? n[3] : 1 };
    };
    const over = (fg, bg) => ({                   // source-over compositing
      r: fg.r*fg.a + bg.r*(1-fg.a),
      g: fg.g*fg.a + bg.g*(1-fg.a),
      b: fg.b*fg.a + bg.b*(1-fg.a), a: 1 });
    const effectiveBg = (el) => {
      const stack = [];
      for (let e = el; e; e = e.parentElement) {
        const c = parse(getComputedStyle(e).backgroundColor);
        if (c.a === 0) continue;
        stack.push(c);
        if (c.a === 1) break;                     // everything below is hidden
      }
      let base = stack.length && stack[stack.length-1].a === 1
        ? stack.pop() : { r:255, g:255, b:255, a:1 };   // canvas
      while (stack.length) base = over(stack.pop(), base);
      return base;
    };
    const pairs = {};
    for (const el of document.querySelectorAll('body *')) {
      const hasText = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 2);
      if (!hasText) continue;
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none') continue;
      const bg = effectiveBg(el);
      /* text can be translucent too — composite it over what it sits on */
      const fgRaw = parse(cs.color);
      const fg = fgRaw.a < 1 ? over(fgRaw, bg) : fgRaw;
      const size = parseFloat(cs.fontSize), bold = +cs.fontWeight >= 700;
      const large = size >= 24 || (size >= 18.66 && bold);
      const rgb = (c) => `rgb(${c.r.toFixed(0)}, ${c.g.toFixed(0)}, ${c.b.toFixed(0)})`;
      const l1 = lum(rgb(fg)), l2 = lum(rgb(bg));
      const ratio = +(((Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05))).toFixed(2);
      const need = large ? 3 : 4.5;
      const key = `${rgb(fg)} on ${rgb(bg)} @${size}px${bold?' bold':''}`
        + (fgRaw.a < 1 ? ` (text alpha ${fgRaw.a})` : '');
      if (!pairs[key]) pairs[key] = { ratio, need, pass: ratio >= need, size, count: 0,
        sample: el.textContent.trim().slice(0,40), tag: el.tagName.toLowerCase() };
      pairs[key].count++;
    }

    /* ⛔ ONLY HEXES OUTSIDE A TOKEN DECLARATION COUNT — corrected 8 Aug. The
       first version counted every hex in the file, which necessarily includes
       each token's own definition, so it reported "every base colour is
       hardcoded once" — true, meaningless, and a reviewer duly reported it as a
       finding. A metric that cannot distinguish a definition from a violation
       manufactures violations. */
    const literals = {};
    for (const m of css.matchAll(/([-a-z]+)\s*:\s*([^;}]*#[0-9a-f]{3,8}[^;}]*)/gi)) {
      if (m[1].startsWith('--af-')) continue;              // a token definition
      for (const h of m[2].match(/#[0-9a-f]{3,8}/gi) || []) {
        const k = h.toLowerCase();
        literals[k] = (literals[k] || 0) + 1;
      }
    }

    return { declared, source, layer, referenced, pairs, literals,
      bodyFontSize: getComputedStyle(document.body).fontSize,
      measure: getComputedStyle(document.querySelector('.prose p, p') || document.body).maxWidth };
  });
  await p.close();
}
await b.close();

/* ── judge ───────────────────────────────────────────────────────────────── */
const first = perPage[PAGES[0]];
const allDeclared = Object.keys(first.declared);
const allReferenced = new Set(Object.values(perPage).flatMap(p => p.referenced));

const findings = {
  undefinedTokens: [...allReferenced].filter(t => !(t in first.declared)),
  unusedTokens: allDeclared.filter(t => !allReferenced.has(t)),
  duplicateValues: Object.entries(
    allDeclared.reduce((a,t) => { const v = first.declared[t]; if(v) (a[v] ||= []).push(t); return a; }, {})
  ).filter(([,ts]) => ts.length > 1).map(([v,ts]) => ({ value: v, tokens: ts })),
  driftBetweenPages: allDeclared.filter(t => {
    const vals = new Set(PAGES.map(p => perPage[p].declared[t]));
    return vals.size > 1;
  }).map(t => ({ token: t, values: Object.fromEntries(PAGES.map(p => [p, perPage[p].declared[t]])) })),
  contrastFailures: Object.entries(
    Object.assign({}, ...PAGES.map(p => perPage[p].pairs))
  ).filter(([,v]) => !v.pass).map(([k,v]) => ({ pair: k, ...v })),
  hardcodedHexes: Object.entries(first.literals).sort((a,b)=>b[1]-a[1]),
};

/* fluid-curve findings: floor/ceiling breaches and ladder inversions */
const curveFindings = [];
for (const t of LADDER) {
  const vals = CURVE_WIDTHS.map(w => curves[w][t]);
  const lo = Math.min(...vals), hi = Math.max(...vals);
  if (t === '--af-type-body' && lo < 19) curveFindings.push(`${t} falls to ${lo}px — below its stated 19px floor`);
  curveFindings.push(`${t}: ${lo}→${hi}px across ${CURVE_WIDTHS[0]}–${CURVE_WIDTHS.at(-1)}px`);
}
const inversions = [], subPixel = [];
for (const w of CURVE_WIDTHS) {
  for (let i = 0; i < LADDER.length - 1; i++) {
    const a = LADDER[i], bb = LADDER[i + 1];
    // standfirst/subheading are documented as deliberately near-equal
    if (a === '--af-type-standfirst' || bb === '--af-type-standfirst') continue;
    const d = curves[w][a] - curves[w][bb];
    /* ⚠️ SPLIT SUB-PIXEL FROM VISIBLE. Two curves that leave a shared clamp
       floor at slightly different widths cross by hundredths of a pixel for a
       few pixels of viewport. That is arithmetic, not a defect — and reporting
       it beside a real inversion is how an audit teaches a reader to ignore it. */
    if (d > 0.5) inversions.push(`@${w}px ${a} (${curves[w][a]}) > ${bb} (${curves[w][bb]})`);
    else if (d > 0) subPixel.push(`@${w}px ${a} exceeds ${bb} by ${d.toFixed(3)}px — invisible`);
  }
}
findings.fluidCurves = curveFindings;
findings.ladderInversions = inversions;
findings.ladderSubPixelCrossings = subPixel;
findings.curveSamples = curves;

writeFileSync('token-audit.json', JSON.stringify({ base: BASE, pages: PAGES, findings, raw: perPage }, null, 1));

console.log(`TOKEN AUDIT — ${PAGES.length} live pages, ${allDeclared.length} tokens declared\n`);
const line = (label, arr, fmt = x => JSON.stringify(x)) => {
  console.log(`${arr.length ? '⛔' : '✅'} ${label}: ${arr.length}`);
  arr.slice(0, 8).forEach(x => console.log('     ' + fmt(x)));
  if (arr.length > 8) console.log(`     …and ${arr.length - 8} more`);
};
line('tokens used but never declared', findings.undefinedTokens, t => t);
line('tokens declared but never used', findings.unusedTokens, t => `${t} = ${first.declared[t]}`);
line('same value under more than one name', findings.duplicateValues, d => `${d.value} → ${d.tokens.join(', ')}`);
line('tokens whose value differs BETWEEN pages', findings.driftBetweenPages, d => d.token);
line('rendered text/background pairs below WCAG AA', findings.contrastFailures,
  f => `${f.ratio}:1 (needs ${f.need}) ${f.tag} "${f.sample}" — ${f.pair}`);
console.log('\n── FLUID CURVES (sampled at 10 viewports, not snapshotted at one) ──');
findings.fluidCurves.filter(f => f.includes('below')).forEach(f => console.log('  ⛔ ' + f));
console.log(`  ${inversions.length ? '⛔' : '✅'} type-ladder inversions across the range: ${inversions.length}`);
inversions.slice(0, 5).forEach(i => console.log('     ' + i));
console.log(`  ⚠️ sub-pixel crossings (arithmetic, not visible): ${subPixel.length}`);
subPixel.slice(0, 3).forEach(i => console.log('     ' + i));
console.log('  body size:  ' + CURVE_WIDTHS.map(w => `${w}:${curves[w].body}`).join('  '));
console.log('  column:     ' + CURVE_WIDTHS.map(w => `${w}:${curves[w].column}`).join('  '));

console.log(`\nhardcoded hex literals OUTSIDE token definitions: ${findings.hardcodedHexes.length} distinct`);
findings.hardcodedHexes.slice(0,6).forEach(([h,n]) => console.log(`     ${h} ×${n}`));
console.log('\n→ token-audit.json written (full data, for handing to a model)');
