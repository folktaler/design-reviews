/* ⛔⛔ THE LOAD ORDER, DECLARED ONCE, BECAUSE IT WAS DECLARED TWICE AND DRIFTED.
 *
 * `build.mjs` inlines these files into every page. `system/verify.mjs` loads the
 * same files into Chromium to check what the engine computed. Until 8 Aug 2026
 * each kept its own copy of the list — and on the day `actions.css` was added to
 * the build, the verifier went on reporting 326 rules and passing. A green run
 * that had never seen the new file.
 *
 * ⭐ THAT IS THE WORST SHAPE OF FAILURE THIS REPO KEEPS PRODUCING: not a broken
 * check, a check that PASSES while looking at the wrong artefact. Same family as
 * the five pages that reported fine because a grep matched the fallback
 * `@font-face` rather than the real one, and the measure that passed its
 * character gate only because the webfont had not loaded. It was caught here by
 * accident — the rule count did not move — and accident is not a method.
 *
 * ⛔ THE ORDER IS THE CONTRACT, NOT A CONVENIENCE. `theme.css` must come AFTER
 * `colors.css`: it references those swatches by name, and a `var()` pointing at
 * a not-yet-declared custom property is invalid at computed-value time, which
 * discards the DECLARATION and not the rule. That is the exact bug the semantic
 * layer was added to fix — `--af-brand` used 13 times, defined nowhere, and
 * `::selection` rendering paper-coloured text on paper.
 *
 * ⚠️ The two consumers differ in ONE entry and it is deliberate: the build
 * inlines `fonts-inline.css` (base64, self-contained pages) while the verifier
 * loads `fonts.css`. Everything after that must stay identical, which is why the
 * difference is a parameter rather than a second list.
 */
export const COMPONENTS = [
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
  /* Added 8 Aug 2026 with the ACTION page type. Last, because it reuses
     [data-portrait] from blocks.css and must be able to override it. */
  'system/components/actions.css',
];

/* `fonts` is the one entry that legitimately differs between consumers. */
export const cssOrder = (fonts) => [fonts, ...COMPONENTS];
