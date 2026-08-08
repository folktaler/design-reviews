/* aikyamfellows.org — the page generator
 *
 * ⭐⭐ WHY THIS EXISTS, AND IT IS THE WHOLE POINT OF THE 8 Aug REBUILD.
 *
 * Until now every page carried its OWN copy of the CSS, inlined by hand. Eleven
 * copies of a design system is not a design system — it is eleven designs that
 * agree for as long as nobody edits one. And they had already stopped agreeing,
 * in three separate ways, each invisible from inside any single file:
 *
 *   · the five reading pages ran a DIFFERENT implementation entirely — their
 *     own class vocabulary (.site-header, .post, .t-title, .stack), unprefixed
 *     tokens (--paper, --ink), and catsofkochi's amber #ffa700. The system's
 *     `--af-*` values could not reach them at all: a central colour fix would
 *     have looked applied and changed nothing.
 *   · the five institutional pages ran the system's names against DIFFERENT
 *     VALUES — `--af-s5: 24px` where the system says `--af-space-5: 20px`.
 *   · all eleven inlined a dark-mode block that the system no longer uses.
 *
 * ⛔ THE RULE THIS FILE ENFORCES: THE CSS IS WRITTEN ONCE, IN `system/`, AND
 * INLINED MECHANICALLY. A page fragment may carry page-only LAYOUT, never a
 * token, never a colour, never a component. If a page needs a component, the
 * component belongs in `system/components/`.
 *
 * ⚠️ THE ROOT `.html` FILES ARE NOW BUILD OUTPUT. Editing one by hand works
 * until the next `node build.mjs` silently reverts it. Edit `pages/<name>.html`.
 *
 * ⭐ AND THEY STAY SELF-CONTAINED — one file, fonts and all, no `<link>`, no
 * relative asset. That is not laziness: `STATE.md` records that root-level
 * `.html` is what claude.ai/design shows as a *page*, and that a linked
 * stylesheet is exactly what the kit-checking harness rewrites nothing of.
 * A self-contained page is the artefact that gets reviewed AND the artefact
 * that ships.
 *
 * Usage:  node build.mjs            build all
 *         node build.mjs profile    build one
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';
import { cssOrder } from './system/css-order.mjs';

const ROOT = new URL('.', import.meta.url).pathname;
const P = (...a) => join(ROOT, ...a);

/* ⛔ THE ORDER IS THE CONTRACT, and it now lives in ONE place — see
 * `system/css-order.mjs`. It used to be declared here AND in verify.mjs, and on
 * the day actions.css was added to this list the verifier went on passing
 * without ever having loaded it. */
const CSS_ORDER = cssOrder('system/fonts-inline.css');

/* ⛔ NO THEME SCRIPT. Removed 8 Aug 2026 with the dark theme (owner decision —
 * see the long note in tokens/colors.css). What went with it: a blocking head
 * script, a `localStorage` read wrapped in a try/catch because Safari private
 * browsing THROWS on access, a `no-js` class on `<html>`, and the escaping of
 * `</script` in the inlined file.
 * ⭐ THE PAGES NOW SHIP ZERO JAVASCRIPT, which is what this system claimed
 * throughout and briefly stopped being true. */

const stripComments = (s) =>
  s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\n\s*\n+/g, '\n');

const css = () =>
  CSS_ORDER.map((f) => {
    const path = P(f);
    if (!existsSync(path)) throw new Error(`missing stylesheet: ${f}`);
    return `/* ${f} */\n${stripComments(readFileSync(path, 'utf8')).trim()}`;
  }).join('\n');

/* A fragment is: an @title line, an optional @nav marker, an optional page-only
 * <style>, and markup. `<!--@masthead-->` and `<!--@footer-->` expand to the
 * shared partials, so the chrome is written once for eleven pages. */
function build(name) {
  const src = readFileSync(P('pages', `${name}.html`), 'utf8');

  const title = (src.match(/<!--\s*@title\s+([^>]*?)\s*-->/) || [])[1];
  if (!title) throw new Error(`${name}: no <!-- @title … --> line`);
  const nav = (src.match(/<!--\s*@nav\s+(\S+)\s*-->/) || [])[1] || '';

  /* ⭐⭐ SEO METADATA — owner, 8 Aug 2026: *"metadata for SEO bits - same as any
   * post"*. Until now every page in this system emitted a <title> and nothing
   * else: no description, no canonical, no Open Graph. Shared to WhatsApp or
   * Slack — which is how a fellowship's stories actually travel — each one
   * previewed as a bare URL with no headline and no picture.
   *
   * ⛔ "SAME AS ANY POST" IS WHY THIS IS IN THE GENERATOR AND NOT IN THE ACTION
   * PAGE. It is not an actions feature. Every page gets it, from one place, so
   * no page can be built without it and no page can drift from the others.
   *
   * ⚠️ @description IS REQUIRED AND THE BUILD FAILS WITHOUT IT. That is
   * deliberate and it is the only hard failure in this file besides a missing
   * title. A meta description that is absent gets written by a search engine out
   * of whatever text is nearest the top of the page — which on this site is a
   * skip link, a standing ask, and three fellows' names. Making it optional
   * means it is omitted once and nobody sees the result for months. */
  const description = (src.match(/<!--\s*@description\s+([\s\S]*?)\s*-->/) || [])[1];
  if (!description) throw new Error(`${name}: no <!-- @description … --> line`);
  const published = (src.match(/<!--\s*@published\s+(\S+)\s*-->/) || [])[1] || '';
  const image = (src.match(/<!--\s*@image\s+(\S+)\s*-->/) || [])[1] || '';

  let body = src
    .replace(/<!--\s*@title[\s\S]*?-->/, '')
    .replace(/<!--\s*@nav[\s\S]*?-->/, '')
    .replace(/<!--\s*@description[\s\S]*?-->/, '')
    .replace(/<!--\s*@published[\s\S]*?-->/, '')
    .replace(/<!--\s*@image[\s\S]*?-->/, '')
    .trim();

  const masthead = readFileSync(P('pages', '_masthead.html'), 'utf8').trim();
  const footer = readFileSync(P('pages', '_footer.html'), 'utf8').trim();

  /* ⭐ `aria-current="page"` is set HERE, from the @nav marker, rather than
     hand-written into eleven copies of the masthead. It is both the
     accessibility contract and the styling hook — one attribute, so they can
     never disagree, and no page can forget it. */
  /* ⭐ THE NAV ITEM MARKS A SECTION, NOT A FILE. `@nav fellows` is already set
     on topic.html, author.html, profile.html and profile-variants.html — all
     four are inside the reading section, none of them IS fellows.html.
     ⛔ So the attribute is `aria-current="true"`, not `"page"`, on any page that
     is not the target itself: `page` asserts *you are on this exact page*, and
     a screen reader announcing "current page: Fellows" while the reader is on a
     profile is a lie in the accessibility tree that nothing on screen
     contradicts. `true` means "current within this set", which is what is
     meant. Both are styled identically. */
  const markedMasthead = nav
    ? masthead.replace(
        new RegExp(`(<a[^>]*href="${nav}\\.html")`),
        `$1 aria-current="${nav === name ? 'page' : 'true'}"`
      )
    : masthead;

  body = body
    .replace('<!--@masthead-->', markedMasthead)
    .replace('<!--@footer-->', footer);

  if (body.includes('<!--@masthead-->') || body.includes('<!--@footer-->')) {
    throw new Error(`${name}: a partial placeholder survived substitution`);
  }

  /* ⛔ ESCAPE BEFORE INTERPOLATING INTO AN ATTRIBUTE. A description containing a
     straight double quote would otherwise close the attribute early and put the
     rest of the sentence into the markup as attributes — which renders as a page
     that looks fine and whose <head> is silently malformed. */
  const attr = (s) =>
    String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

  const SITE = 'https://aikyamfellows.org/';
  const canonical = `${SITE}${name === 'home' ? '' : name + '/'}`;

  /* ⭐ JSON-LD LAST, AND KEPT MINIMAL. Only what is true of every page here:
     what it is, its name, its description and its canonical URL. ⛔ No invented
     `author`, no `publisher.logo`, no `datePublished` on a page that has no
     date. Structured data asserting something false is worse than none — a
     search engine believes it, and nobody on the site ever sees what it said. */
  const ld = {
    '@context': 'https://schema.org',
    '@type': published ? 'Article' : 'WebPage',
    headline: title.split(' — ')[0],
    description,
    url: canonical,
    ...(published ? { datePublished: published } : {}),
    ...(image ? { image: SITE + image } : {}),
  };

  const out = `<!doctype html>
<html lang="en">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${attr(description)}">
<link rel="canonical" href="${canonical}">

<!-- Open Graph / Twitter — how this page looks when it is shared, which for a
     fellowship's stories is how most people meet them. -->
<meta property="og:type" content="${published ? 'article' : 'website'}">
<meta property="og:title" content="${attr(title)}">
<meta property="og:description" content="${attr(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:site_name" content="aikyam fellows">
<meta property="og:locale" content="en_IN">${
    image ? `\n<meta property="og:image" content="${SITE}${attr(image)}">` : ''
  }${published ? `\n<meta property="article:published_time" content="${attr(published)}">` : ''}
<!-- ⛔ summary_large_image ONLY WHEN THERE IS AN IMAGE. Declaring it without one
     produces a card with a large empty frame where the picture should be. -->
<meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}">
<meta name="twitter:title" content="${attr(title)}">
<meta name="twitter:description" content="${attr(description)}">

<script type="application/ld+json">
${JSON.stringify(ld, null, 1)}
</script>

<!-- ⛔ GENERATED BY build.mjs FROM pages/${name}.html — DO NOT EDIT THIS FILE.
     Edit the fragment; run \`node build.mjs\`. The CSS below is inlined
     verbatim from system/ and is the same bytes on every page. -->

<style>
${css()}
</style>

${body}
`;

  writeFileSync(P(`${name}.html`), out);
  return { name, bytes: out.length };
}

const args = process.argv.slice(2);
const names = args.length
  ? args
  : readdirSync(P('pages'))
      .filter((f) => f.endsWith('.html') && !f.startsWith('_'))
      .map((f) => basename(f, '.html'))
      .sort();

let failed = 0;
for (const n of names) {
  try {
    const r = build(n);
    console.log(`  ok  ${r.name.padEnd(18)} ${(r.bytes / 1024).toFixed(0)} KB`);
  } catch (e) {
    failed++;
    console.error(`  ⛔  ${n}: ${e.message}`);
  }
}
console.log(`\n${names.length - failed}/${names.length} pages built`);
process.exit(failed ? 1 : 0);
