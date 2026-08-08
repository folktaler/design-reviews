/* ⭐⭐ THE THIRD AUDIT, AND IT LOOKS AT WHAT THE OTHER TWO CANNOT.
 *
 * `system/verify.mjs` proves the CSS computes. `token-audit.mjs` proves the
 * tokens are coherent and their curves behave. BOTH READ VALUES. Neither can
 * see a page whose every value is correct and which is still unusable:
 *
 *   · a tab order that jumps around the screen
 *   · a focus ring that is painted and then clipped away by an ancestor
 *   · a skip link that moves the viewport but not the focus
 *   · two <h1>s, or a heading level skipped, so the outline lies
 *   · a link whose accessible name is "here"
 *   · an image with no alt, or alt that repeats the caption
 *   · a page that reflows at 320px but not at 400% zoom, which is the same
 *     requirement written the other way round and fails differently
 *   · a print stylesheet nobody has ever rendered, on the one page a funder
 *     will actually print
 *
 * ⛔ IT RUNS AGAINST THE PUBLISHED URL, NOT THE DISK. Every defect worth having
 * found in this repo was found in a browser, and twice a file on disk was
 * correct while the thing being served was not.
 */
import pw from '/Users/shemeerp/.npm-global/lib/node_modules/playwright/index.js';
const { chromium } = pw;

const BASE = 'https://folktaler.github.io/design-reviews/aikyamfellows/';
const PAGES = ['index', 'home', 'about', 'fellows', 'profile', 'topic', 'author',
  'impact', 'contact', 'support', 'proudly-not-for-profit',
  'foundation', 'profile-variants', 'action', 'actions', 'wordmark'];

const b = await chromium.launch();
const findings = [];
const add = (page, kind, detail) => findings.push({ page, kind, detail });

for (const name of PAGES) {
  const p = await b.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 });
  const url = BASE + name + '.html';
  const resp = await p.goto(url, { waitUntil: 'load' });
  if (!resp || !resp.ok()) { add(name, 'http', `${resp && resp.status()}`); await p.close(); continue; }

  /* ── structure, names, alternatives ──────────────────────────────────── */
  const structural = await p.evaluate(() => {
    const out = { issues: [] };
    const h1s = [...document.querySelectorAll('h1')];
    if (h1s.length !== 1) out.issues.push(`${h1s.length} <h1> on the page (want exactly 1)`);

    /* heading outline: a level may not be skipped going down */
    const hs = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')]
      .filter(h => h.offsetParent !== null || getComputedStyle(h).position === 'fixed');
    let prev = 0;
    for (const h of hs) {
      const lvl = +h.tagName[1];
      if (prev && lvl > prev + 1) out.issues.push(`heading jumps h${prev} → h${lvl}: "${h.textContent.trim().slice(0,40)}"`);
      prev = lvl;
    }

    /* ⛔ TWO HEADINGS WITH THE SAME TEXT AT THE SAME LEVEL. Added 8 Aug after
       about.html was found carrying "Open positions" TWICE — two wordings of one
       invitation, one above the funding block and one at the foot. A screen-
       reader user navigating by heading gets two destinations that turn out to
       be the same place. ⭐ It was found by hand while merging another page in,
       NOT by this script: the h1 count passed and the level-skip check passed,
       because a repeated h2 is neither. */
    /* ⛔ h1 AND h2 ONLY, AND THE FIRST VERSION OF THIS CHECK GOT IT WRONG THE
       RUN AFTER IT WAS WRITTEN. Counting every level reported three "defects",
       all correct behaviour: support.html has three <h3>Amount</h3> because it
       offers three giving tiers, and the two variants pages render the SAME card
       five times, which is the entire purpose of a variants page. An <h3> inside
       a repeated component is supposed to repeat.
       ⭐ A section heading is different: it names a place in the document, and
       two places with one name is the defect actually found on about.html.
       This is the fifth time in this repo a check's own method produced the
       finding. Restricting the check is the fix; deleting it is not, because the
       real defect was invisible to everything else. */
    const byText = {};
    for (const h of hs) {
      if (!/^H[12]$/.test(h.tagName)) continue;
      const k = h.tagName + '|' + h.textContent.replace(/\s+/g, ' ').trim().toLowerCase();
      byText[k] = (byText[k] || 0) + 1;
    }
    for (const [k, n] of Object.entries(byText)) {
      if (n > 1) out.issues.push(`${n} × <${k.split('|')[0].toLowerCase()}> with identical text "${k.split('|')[1].slice(0,45)}"`);
    }

    /* landmarks */
    if (!document.querySelector('main')) out.issues.push('no <main>');
    if (document.querySelectorAll('main').length > 1) out.issues.push('more than one <main>');
    const main = document.querySelector('main');
    if (main && !main.hasAttribute('tabindex')) out.issues.push('<main> has no tabindex="-1" — a skip link cannot move focus to it');

    /* accessible names. A control whose name is its own punctuation is unusable
       by voice and meaningless out of context in a screen-reader link list. */
    const vague = /^(here|click here|read more|more|link|this|learn more|→|›|»)$/i;
    for (const a of document.querySelectorAll('a[href], button')) {
      if (a.offsetParent === null) continue;                    // genuinely hidden
      const name = (a.getAttribute('aria-label') || a.textContent || '').replace(/\s+/g,' ').trim();
      if (!name) out.issues.push(`${a.tagName.toLowerCase()} with NO accessible name → ${a.getAttribute('href') || ''}`);
      else if (vague.test(name)) out.issues.push(`${a.tagName.toLowerCase()} named "${name}" — meaningless in a link list`);
    }

    /* images */
    for (const img of document.querySelectorAll('img')) {
      if (!img.hasAttribute('alt')) out.issues.push(`<img> with no alt attribute: ${img.getAttribute('src')||''}`);
    }

    /* a form control must have a label */
    for (const f of document.querySelectorAll('input, textarea, select')) {
      if (f.type === 'hidden') continue;
      const id = f.id;
      const labelled = (id && document.querySelector(`label[for="${CSS.escape(id)}"]`))
        || f.closest('label') || f.getAttribute('aria-label') || f.getAttribute('aria-labelledby');
      if (!labelled) out.issues.push(`form control with no label: ${f.tagName.toLowerCase()}#${id || '(no id)'}`);
    }

    /* duplicate ids break every aria reference that points at one */
    const seen = new Set();
    for (const el of document.querySelectorAll('[id]')) {
      if (seen.has(el.id)) out.issues.push(`duplicate id "${el.id}" — aria references to it are ambiguous`);
      seen.add(el.id);
    }

    /* an aria-describedby / labelledby pointing at nothing is silently dropped */
    for (const el of document.querySelectorAll('[aria-describedby],[aria-labelledby]')) {
      for (const attr of ['aria-describedby','aria-labelledby']) {
        const v = el.getAttribute(attr); if (!v) continue;
        for (const ref of v.split(/\s+/)) {
          if (!document.getElementById(ref)) out.issues.push(`${attr}="${ref}" points at no element`);
        }
      }
    }
    return out;
  });
  structural.issues.forEach(i => add(name, 'structure', i));

  /* ── the skip link must move FOCUS, not only the viewport ────────────── */
  await p.keyboard.press('Tab');
  const skip = await p.evaluate(() => {
    const el = document.activeElement;
    return { tag: el.tagName.toLowerCase(), text: (el.textContent||'').trim().slice(0,30), href: el.getAttribute && el.getAttribute('href') };
  });
  if (!/skip/i.test(skip.text)) add(name, 'keyboard', `first Tab lands on "${skip.text}" (${skip.tag}), not a skip link`);
  else {
    await p.keyboard.press('Enter');
    await p.waitForTimeout(120);
    const landed = await p.evaluate(() => {
      const el = document.activeElement;
      return { id: el.id, tag: el.tagName.toLowerCase() };
    });
    if (landed.tag === 'body') add(name, 'keyboard', 'skip link moved the viewport but NOT focus — the next Tab returns to the masthead');
  }

  /* ── every focusable must show a visible ring, and not be clipped ─────
   *
   * ⛔ TRAVERSED WITH THE REAL TAB KEY, NOT `element.focus()`. The first
   * version of this check looped over every focusable calling .focus() and
   * read the computed outline — and reported 98 missing focus rings across 14
   * pages. Every one was false. Chromium's `:focus-visible` heuristic depends
   * on HOW focus arrived, so a synchronous programmatic sweep can leave the
   * pseudo-class unmatched on elements that ring correctly for a real keyboard
   * user. Verified by tabbing to the same links by hand: solid 3px indigo at a
   * 2px offset, exactly as specified.
   *
   * ⭐ This is the fourth time in this repo a MEASUREMENT was the defect rather
   * than the thing measured. A check that cannot tell a broken page from its
   * own methodology is worse than no check, because it spends the reviewer's
   * attention and teaches them to discount the next report. */
  const focus = [];
  {
    const seenEls = new Set();
    for (let i = 0; i < 150; i++) {
      await p.keyboard.press('Tab');
      const r = await p.evaluate(() => {
        const e = document.activeElement;
        if (!e || e === document.body || e === document.documentElement) return null;
        const cs = getComputedStyle(e);
        const w = parseFloat(cs.outlineWidth) || 0;
        const key = e.tagName + '|' + (e.textContent||'').trim().slice(0,25) + '|' + (e.getAttribute('href')||'');
        let clipped = null;
        for (let a = e.parentElement; a; a = a.parentElement) {
          const acs = getComputedStyle(a);
          if (/hidden|clip/.test(acs.overflow)) {
            const er = e.getBoundingClientRect(), ar = a.getBoundingClientRect();
            if (w > 0 && (er.left - w < ar.left - 0.5 || er.right + w > ar.right + 0.5)) clipped = acs.overflow;
            break;
          }
        }
        return {
          key, tag: e.tagName.toLowerCase(),
          text: (e.textContent||'').trim().slice(0,25),
          ring: (cs.outlineStyle !== 'none' && w > 0) || cs.boxShadow !== 'none',
          width: w, clipped,
          offscreen: e.getBoundingClientRect().width === 0,
        };
      });
      if (!r) break;                       // focus left the document
      if (seenEls.has(r.key)) continue;    // wrapped around
      seenEls.add(r.key);
      if (!r.ring && !r.offscreen) focus.push(`no focus ring: ${r.tag} "${r.text}"`);
      if (r.clipped) focus.push(`focus ring clipped by an overflow:${r.clipped} ancestor: "${r.text}"`);
    }
  }
  [...new Set(focus)].forEach(f => add(name, 'focus', f));

  /* ── reflow: at the documented floor, and at 400% zoom, which is the same
        WCAG requirement written the other way and fails differently ─────── */
  for (const [label, vp] of [['floor 320px', { width: 320, height: 640 }],
                             ['400% zoom (1280 CSS px at 4x)', { width: 320, height: 512 }]]) {
    await p.setViewportSize(vp);
    await p.waitForTimeout(80);
    const over = await p.evaluate(() => {
      const de = document.documentElement;
      const widest = [...document.querySelectorAll('body *')]
        .map(e => ({ e, r: e.getBoundingClientRect() }))
        .filter(({ r }) => r.width > 0 && r.right > de.clientWidth + 1)
        .sort((a, b) => b.r.right - a.r.right)[0];
      return {
        overflow: +(de.scrollWidth - de.clientWidth).toFixed(1),
        culprit: widest ? `${widest.e.tagName.toLowerCase()}${widest.e.className ? '.'+String(widest.e.className).split(' ')[0] : ''} "${(widest.e.textContent||'').trim().slice(0,30)}"` : null,
      };
    });
    if (over.overflow > 1) add(name, 'reflow', `${label}: ${over.overflow}px horizontal overflow — widest: ${over.culprit}`);
  }
  await p.setViewportSize({ width: 1280, height: 900 });

  /* ── reduced motion must actually stop motion, not merely be declared ── */
  const rmCtx = await b.newContext({ reducedMotion: 'reduce', viewport: { width: 1280, height: 900 } });
  const rm = await rmCtx.newPage();
  await rm.goto(url, { waitUntil: 'load' });
  const moving = await rm.evaluate(() => {
    const bad = [];
    for (const e of document.querySelectorAll('body *')) {
      const cs = getComputedStyle(e);
      const dur = (s) => s.split(',').map(v => parseFloat(v) || 0).reduce((a, b) => Math.max(a, b), 0);
      if (dur(cs.animationDuration) > 0.05) bad.push(`animation still runs: ${e.tagName.toLowerCase()}`);
      if (dur(cs.transitionDuration) > 0.05) bad.push(`transition still runs: ${e.tagName.toLowerCase()}`);
    }
    return [...new Set(bad)];
  });
  moving.forEach(m => add(name, 'reduced-motion', m));
  await rm.close(); await rmCtx.close();

  /* ── print. The compliance page is a document a funder will print, and a
        print stylesheet that has never been rendered is a guess. ────────── */
  await p.emulateMedia({ media: 'print' });
  await p.waitForTimeout(80);
  const print = await p.evaluate(() => {
    const out = [];
    const de = document.documentElement;
    if (de.scrollWidth - de.clientWidth > 1) out.push(`${de.scrollWidth - de.clientWidth}px wider than the page in print`);
    /* ⛔ ABSOLUTE LINKS ONLY, AND THE FIRST VERSION OF THIS CHECK DID NOT KNOW
       THAT. It sampled the first link in <main> — usually an internal one — saw
       no printed URL, and reported all 14 pages as failing. The system prints a
       destination after absolute links and deliberately NOT after internal ones,
       with the reason written above the rule: "printing (profile.html) after
       every internal link makes the prose unreadable for no gain." The check was
       testing a decision it had not read. Verified on the compliance page: 35 of
       35 absolute links print their destination, the one internal link does not. */
    const abs = [...document.querySelectorAll('a[href^="http"]')];
    const silent = abs.filter(a => {
      const c = getComputedStyle(a, '::after').content;
      return !c || c === 'none' || !c.includes('http');
    });
    if (silent.length) out.push(`${silent.length} of ${abs.length} absolute links print no destination — a reader on paper cannot follow them`);
    return out;
  });
  print.forEach(x => add(name, 'print', x));
  await p.emulateMedia({ media: 'screen' });

  await p.close();
  process.stdout.write(`  ${name} `);
}
await b.close();
console.log('\n');

/* ── report ─────────────────────────────────────────────────────────────── */
const byKind = {};
for (const f of findings) (byKind[f.kind] ||= []).push(f);
if (!findings.length) console.log('✅ nothing found across all pages');
for (const [kind, list] of Object.entries(byKind).sort((a, b) => b[1].length - a[1].length)) {
  console.log(`⛔ ${kind}: ${list.length}`);
  const seen = new Set();
  for (const f of list) {
    const k = f.detail;
    if (seen.has(k)) continue;
    seen.add(k);
    const pages = list.filter(x => x.detail === k).map(x => x.page);
    console.log(`   ${f.detail}`);
    console.log(`      on: ${pages.length > 6 ? pages.length + ' pages' : pages.join(', ')}`);
  }
}
console.log(`\ntotal: ${findings.length} across ${PAGES.length} live pages`);
