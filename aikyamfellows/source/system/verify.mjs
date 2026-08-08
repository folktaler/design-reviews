/* Verify the design system in a real browser.
 *
 * The system's own doctrine: "Verify a value in getComputedStyle, never by
 * reading this file." A token file is a proxy for the page. So this loads every
 * stylesheet in the documented order into Chromium and reads what the engine
 * actually computed.
 */
// Resolve playwright from wherever it is installed (this repo has no
// package.json). Globally: `npm i -g playwright`.
const pwPath = process.env.PLAYWRIGHT_PATH
  ?? '/Users/shemeerp/.npm-global/lib/node_modules/playwright/index.js';
const pw = (await import(pwPath)).default;
const { chromium } = pw;
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = '/Users/shemeerp/aikyamfellows-design';
const ORDER = [
  'system/fonts.css',
  'system/tokens/colors.css',
  'system/tokens/typography.css',
  'system/tokens/spacing.css',
  'system/tokens/breakpoints.css',
  'system/tokens/motion.css',
  'system/tokens/theme.css',
  'system/styles.css',
  'system/components/components.css',
  'system/components/chrome.css',
  'system/components/forms.css',
  'system/components/blocks.css',
];

const css = ORDER.map((f) => readFileSync(join(ROOT, f), 'utf8')).join('\n');

// Every --af-* custom property referenced anywhere in the system.
const referenced = [...new Set([...css.matchAll(/var\(\s*(--af-[a-z0-9-]+)/g)].map((m) => m[1]))].sort();

const html = `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head>
<body>
<main class="wrap"><div class="prose">
  <h1>H1</h1><h2>H2</h2><h3>H3</h3><h4>H4</h4><h5>H5</h5><h6>H6</h6>
  <p>Body text with <a href="#x">a link</a> and <code>code</code>.</p>
  <ul><li>one</li><li>two</li></ul>
  <ol><li>one</li></ol>
  <dl><dt>Term</dt><dd>Definition</dd></dl>
  <blockquote><p>Quoted</p><cite>Someone</cite></blockquote>
  <div data-table role="region" tabindex="0"><table><caption>Cap</caption>
    <thead><tr><th>Year</th></tr></thead><tbody><tr><td>2026</td></tr></tbody></table></div>
  <figure><img alt=""><figcaption>Caption</figcaption></figure>
  <pre><code>pre</code></pre>
  <small>small</small> <sup><a href="#f">1</a></sup> <mark>mark</mark>
  <abbr title="x">ABBR</abbr>
  <details><summary>Summary</summary><div>body</div></details>
  <a data-topic href="#t">Design</a>
  <a data-button href="#b">Button</a>
  <blockquote data-pullquote><p>Q</p><cite data-pullquote-source>Src</cite></blockquote>
  <div data-note><span data-note-label>Note</span><p>x</p></div>
  <div data-empty><h2>Empty</h2><p>x</p></div>
  <ul data-figures class="list-bare"><li data-figure>
    <a data-figure-value href="#l">6</a><span data-figure-label>fellows</span>
    <time data-figure-asof datetime="2026-08-07">as of</time></li></ul>
  <div data-field><label for="e">Email</label><p data-field-hint>hint</p><input id="e" type="email"></div>
  <div data-field data-invalid><label for="e2">Email</label><p data-field-error id="er">Error</p>
    <input id="e2" type="email" aria-invalid="true" aria-describedby="er"></div>
  <div data-error-summary tabindex="-1"><h2>Problem</h2><ul><li><a href="#e2">msg</a></li></ul></div>
  <textarea></textarea><select><option>a</option></select>
</div></main>
<header data-masthead><div data-masthead-inner class="wrap wrap--wide">
  <a data-wordmark href="/">aikyam fellows</a>
  <nav data-nav aria-label="Primary"><a href="/a/">Fellows</a><a href="/b/" aria-current="page">About</a>
  <a href="/c/">Partners</a><a href="/d/">Contact</a></nav></div></header>
<nav data-breadcrumb><ol><li><a href="/">Home</a></li><li aria-current="page">Now</li></ol></nav>
<nav data-pagination><a href="/1">Prev</a><span aria-current="page">2</span>
  <span data-pagination-count>Page 2 of 7</span></nav>
<footer data-footer><div data-footer-cols class="wrap wrap--wide">
  <div><h2>Read</h2><ul><li><a href="/x">Link</a></li></ul></div></div>
  <div data-footer-legal class="wrap wrap--wide">legal</div></footer>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1024, height: 900 }, deviceScaleFactor: 2 });
await page.setContent(html, { waitUntil: 'load' });

const result = await page.evaluate((refs) => {
  const rs = getComputedStyle(document.documentElement);
  const out = { unresolved: [], resolved: 0 };
  for (const name of refs) {
    const v = rs.getPropertyValue(name).trim();
    if (v === '') out.unresolved.push(name);
    else out.resolved++;
  }

  // How many rules did the engine actually keep? A swallowed comment or a
  // malformed declaration silently drops everything after it.
  const sheet = document.styleSheets[0];
  out.ruleCount = sheet.cssRules.length;

  const g = (sel, prop, pseudo) => {
    const el = document.querySelector(sel);
    if (!el) return `NO ELEMENT ${sel}`;
    return getComputedStyle(el, pseudo || null).getPropertyValue(prop);
  };

  /* ⛔ The face check changed on 8 Aug when the webfont was cut. It used to
     assert "Noticia Text". A system stack cannot be asserted by NAME — the
     declared stack is what `font-family` reports whatever actually painted.
     So it is proven the same way the measure was: canvas width against a bogus
     family. Equal to bogus means nothing in the stack resolved. */
  out.paintedFace = (() => {
    const cv = document.createElement('canvas').getContext('2d');
    const probe = 'Thiruvananthapuram Bhattacharyya';
    const w = (f) => { cv.font = `20px ${f}`; return +cv.measureText(probe).width.toFixed(1); };
    const stack = w(getComputedStyle(document.body).fontFamily);
    return { stack, bogus: w('__nope__'), resolved: stack !== w('__nope__') };
  })();
  out.body = {
    fontFamily: g('body', 'font-family'),
    fontSize: g('body', 'font-size'),
    color: g('body', 'color'),
    background: g('body', 'background-color'),
  };
  out.checks = {
    h4Size: g('h4', 'font-size'),
    listIndent: g('.prose ul', 'padding-inline-start'),
    listMaxWidth: g('.prose ul', 'max-width'),
    tdNumeric: g('td', 'font-variant-numeric'),
    smallSize: g('small', 'font-size'),
    inputFontSize: g('input', 'font-size'),
    inputMinHeight: g('input', 'min-height'),
    textareaMinHeight: g('textarea', 'min-height'),
    selectFontSize: g('select', 'font-size'),
    topicColor: g('[data-topic]', 'color'),
    topicBorder: g('[data-topic]', 'border-top-color'),
    pullquoteRule: g('[data-pullquote]', 'border-inline-start-color'),
    linkUnderline: g('.prose a', 'text-decoration-color'),
    footerBg: g('[data-footer]', 'background-color'),
    footerColor: g('[data-footer]', 'color'),
    figureValueTag: document.querySelector('[data-figure-value]')?.tagName,
    errorRule: g('[data-field][data-invalid]', 'border-inline-start-width'),
    tableOverflow: g('[data-table]', 'overflow-x'),
    motionQuick: rs.getPropertyValue('--af-motion-quick').trim(),
    bpWide: rs.getPropertyValue('--af-bp-wide').trim(),
  };

  /* ⛔ THE GATE IS READ FROM THE TOKEN, NOT HARDCODED — changed 8 Aug after an
     audit pointed out that `--af-tap` was consumed by nothing. Its own comment
     says it is "what a check asserts"; the check was asserting a literal 44 and
     the token was decoration. A token that documents a rule nothing reads is
     the same class of lie as a comment that describes code it does not govern. */
  out.tapGate = parseFloat(rs.getPropertyValue('--af-tap')) || 44;

  // Tap targets, both axes, at this viewport.
  out.taps = [...document.querySelectorAll('[data-nav] a, [data-topic], [data-button], [data-footer] li a, [data-pagination] a')]
    .map((el) => {
      const r = el.getBoundingClientRect();
      return { text: el.textContent.trim().slice(0, 14), w: +r.width.toFixed(1), h: +r.height.toFixed(1) };
    });

  return out;
}, referenced);

// ::selection is not reachable via getComputedStyle in any engine; read the rule
// out of the parsed sheet instead, which still proves the declaration survived.
const selection = await page.evaluate(() => {
  const rules = [...document.styleSheets[0].cssRules];
  const r = rules.find((x) => x.selectorText === '::selection');
  return r ? r.style.cssText : 'RULE MISSING';
});

const nav375 = await page.evaluate(async () => null);
await page.setViewportSize({ width: 375, height: 667 });
const phone = await page.evaluate(() => {
  const masthead = document.querySelector('[data-masthead]').getBoundingClientRect();
  const navLinks = [...document.querySelectorAll('[data-nav] a')].map((a) => {
    const r = a.getBoundingClientRect();
    return { t: a.textContent.trim(), w: +r.width.toFixed(1), h: +r.height.toFixed(1), y: +r.top.toFixed(1) };
  });
  const rows = new Set(navLinks.map((l) => l.y)).size;
  return {
    mastheadHeight: +masthead.height.toFixed(1),
    navRows: rows,
    navLinks,
    docOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    bodyFontSize: getComputedStyle(document.body).fontSize,
  };
});

await page.setViewportSize({ width: 320, height: 640 });
const floor = await page.evaluate(() => ({
  docOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  navRows: new Set([...document.querySelectorAll('[data-nav] a')].map((a) => a.getBoundingClientRect().top)).size,
}));

await page.setViewportSize({ width: 624, height: 800 });
const coupling = await page.evaluate(() => getComputedStyle(document.body).fontSize);

await browser.close();

console.log(JSON.stringify({ ...result, selection, phone375: phone, floor320: floor, bodyAt640: coupling }, null, 2));
