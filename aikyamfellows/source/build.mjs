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

  let body = src
    .replace(/<!--\s*@title[\s\S]*?-->/, '')
    .replace(/<!--\s*@nav[\s\S]*?-->/, '')
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

  const out = `<!doctype html>
<html lang="en">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>

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
