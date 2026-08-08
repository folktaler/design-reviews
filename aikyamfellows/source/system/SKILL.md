---
name: aikyamfellows-design
description: The aikyamfellows.org design system — tokens, components, chrome, forms and editorial rules for a Guardian-faithful reading site. Use whenever building, restyling or reviewing anything a reader of that site will see: a page type, a component, a form, an empty state, an error page, or the words on a button. Also read before adding a colour, a breakpoint, a heading level or a font family, and before copying any rule out of institutional/institutional.css.
---

# aikyamfellows.org design system

⚠️ **This file exists because the sibling system shipped one and this repo did
not.** `guardian-design-system-v1` was a loadable skill: any session picked up
its rules automatically. This system had a `README.md` that nobody was obliged to
read — and in the day between the rehoming and this file being written, a broken
brand token, a forked spacing scale and a missing base layer all shipped without
anyone noticing.

## Read these first, in this order

1. **`GUARDIAN-FAITHFUL.md`** — the governing principle. Guardian-faithful is
   the default; every departure needs a *named reader difference*. Four of the
   five inherited differences are gone, so the burden of proof is heavier here
   than it was there.
2. **`tokens/theme.css`** — the semantic names. ⛔ **Reference these, never the
   raw swatches in `colors.css`.**
3. **`LANDMARKS.md`** — the `data-*` contract, with canonical markup for every
   component including the page skeleton.
4. **`REMOVED.md`** — what was stripped from the inherited system, what was kept
   against appearances, and what still needs a person rather than a designer.

## The five things that decide almost everything

**1. Who the reader is.** Indoors, on a laptop, reading a 1,900-word profile of
a real, named, living person. Not standing in the sun deciding whether to walk
somewhere — that was the other site, and its reader is the one four of this
system's inherited assumptions were built for.
⚠️ **The device split is unmeasured.** analytics.aikyamhq.com would settle it.
Until someone reads it, *"our reader is on Android / on mobile data"* is not an
argument anyone may use.

**2. A link is ink, underlined in the brand.** The brand is 15.72:1 on this
paper and the ink is 17.15:1 — a link coloured with the brand is
indistinguishable from the sentence around it. ⛔ The brand is a fill, a border
and an underline. **Never a word of running text**, in either theme.

**3. Words encode. Colour does not, and neither does a glyph.** Seven topics,
seven words, no hues and no icons. A reader who cannot tell Aftercare from
Livelihood by colour is every reader, on their first visit.

**4. There are two weights and two text greys.** Noticia Text ships 400 and 700
and nothing between; `font-weight: 500` is a synthesised smear that is obvious on
screen and invisible in source. A third grey is always the one that fails — if
something must recede further, it needs fewer words or more space.

**5. A measure belongs to a face and a size, not to a page.** `--af-measure` is
592px because this site's own proper nouns — Thiruvananthapuram, Bhattacharyya,
Kalaripayattu — set five to eight characters shorter than generic English. The
instinct to narrow the column is right for English and backwards here.

## ⛔ Before you write any component

**Prove which face painted before you trust any measurement.** A column can pass
its character gate *only because the webfont had not loaded*, and turn red the
day somebody inlines the woff2 — after every review has passed it. That happened
here at 628px, which read as a comfortable 63 in the fallback and is a failing 68
in the face that ships. `getComputedStyle().fontFamily` reports the *declared*
stack and would say "Noticia Text" either way. Test three canvas widths.

**Verify a value in `getComputedStyle`, never by reading a token file.** A token
file is a proxy for the page. Editing one can feel like changing the design and
change nothing — eleven kits once rendered in Georgia for a whole night because
correct, committed CSS was loaded by nothing.

**A value sitting exactly on its gate is pending, not passing.** `min-height:
44px` produces a box of exactly 44, which measures 43 after subpixel rounding at
deviceScaleFactor 2. Build to `--af-tap-comfortable` (52px); assert against 44.

**Both tap axes, always.** Width is the one nobody measures. The word "Places"
measured 42.5px wide across eleven kits of the sibling system while the height
was correct and signed off.

## The load order, and it is not optional

```
fonts.css
tokens/colors.css → typography.css → spacing.css → breakpoints.css → motion.css
tokens/theme.css            ← must come AFTER colors.css
styles.css
components/components.css   ← editorial
components/chrome.css       ← masthead, nav, breadcrumb, pagination, footer
components/forms.css        ← fields, error summary, search
components/blocks.css       ← note, table, TOC, empty, error page, grid, figure
```

⛔ **`theme.css` after `colors.css`.** It references those swatches by name, and
a `var()` pointing at a not-yet-declared property is invalid at computed-value
time — the exact bug this layer was added to fix.

## ⛔ Traps that have already cost time in this repo

**An undefined `var()` does not fail quietly, and it does not render as a gap.**
It renders as a *plausible page*. `--af-brand` was used 13 times and defined
never; the `background` half of `::selection` was discarded while the `color`
half applied, so selecting any text made the words vanish. It needed a mouse drag
to appear.

**A token edit in one place can break a fix in another.** Changing `--af-gutter`
from 20px to 24px for consistency silently undid a measured masthead fix in a
different file and put the nav back onto two rows. Re-measure after *every* token
change, not only after the one you think is relevant.

**⛔ Do not copy a rule out of `institutional/institutional.css`.** It carries
its own `:root` with four spacing collisions — `--af-s5` is 24px where
`--af-space-5` is 20px — and a different type ladder under the same `--af-`
prefix. Porting a rule from it silently changes numbers and the page looks
*nearly* right. Build from `system/components/` instead. See the head of
`chrome.css`.

**A green suite is not proof of coverage.** Four of five institutional pages
carry no prose block long enough for the measure gate to look at, so they SKIP —
and a skip prints like agreement. The reading pages carry that gate for the whole
site.

## The words are part of the design

- Plain English. This audience reads English as a second language as often as a
  first.
- ⛔ **A refusal needs a sentence, and the sentence ends with what to do next.**
  "No results" is not a page. A 404 is not an apology.
- ⛔ **Never invent a fact to make a kit look finished.** There is no published
  email address for this site, so the contact page has five unfilled slots
  rendering as loud dashed boxes. Inventing “hello@” plus the domain would have
  shipped a fabricated address into production.
- Every string in the newsletter's four states is written out in
  `guidelines/voice.md`, because the live site currently shows its **success**
  message as the resting heading to a reader who has typed nothing.

## What this system deliberately does not have

No icon set · no shadow · no third grey · no colour per topic · no gradient ·
no error red, warning orange or success green · no hamburger menu · no modal ·
no carousel · no infinite scroll · no sticky masthead · no logo wall ·
no `.astro` components · no cookie banner.

⭐ **Each of those is a decision with a reason on a file, not an omission.**
`REMOVED.md` and the foot of each component file carry them. Before adding one
back, find the reason and say why it no longer holds.
