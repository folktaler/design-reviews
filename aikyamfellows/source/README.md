# aikyamfellows.org — the design system

The Guardian-faithful system built for catsofkochi.com, stripped of that
product's editorial contract and re-decided for this reader. `HANDOVER.md` is the
original brief and is read-only.

⭐ **Start at `system/SKILL.md`.** It is the loadable entry point and it names the
five things that decide almost everything.

## What is here

| | |
|---|---|
| `system/SKILL.md` | ⭐ **the entry point** — load this before touching anything |
| `system/GUARDIAN-FAITHFUL.md` | ⭐ the governing principle: departures need a *named reader difference* |
| `system/REUSE-BEFORE-BUILD.md` | the nine design systems evaluated before anything was built, re-checked for this site |
| `system/tokens/` | `colors.css`, `typography.css`, `spacing.css`, `breakpoints.css`, `motion.css`, **`theme.css`** |
| `system/fonts.css` | the three Noticia faces + the metric-matched fallback, **and the measured charset** |
| `system/styles.css` | the base layer — elements, `.wrap`, `.prose`, links, lists, tables, forms |
| `system/components/components.css` | editorial: headline, standfirst, byline, portrait, pull-quote, fellow card, newsletter, button, read-next, correction |
| `system/components/chrome.css` | masthead, wordmark, nav, breadcrumb, pagination, footer |
| `system/components/forms.css` | field, error summary, the four form states, search |
| `system/components/blocks.css` | note, table wrapper, contents, empty state, error page, embed, grid, figure, disclosure, banner, and the four institutional blocks |
| `system/LANDMARKS.md` | the `data-*` contract, with canonical markup for every component **and the page skeleton** |
| `system/guidelines/` | `photographs.md` (people, not places), `voice.md` (every string) |
| `system/REMOVED.md` | what was stripped, what was kept against appearances, what needs an editor |
| `foundation.html` | one portable file: the ladder, the palette, the components in their states |
| `PREDICTION.md` | ⛔ `check-kits.mjs` was **not run**. What it is expected to say, and how failure reads |

## ⛔ Load order — not optional

```
fonts.css
tokens/colors.css → typography.css → spacing.css → breakpoints.css → motion.css
tokens/theme.css            ← must come AFTER colors.css
styles.css
components/components.css → chrome.css → forms.css → blocks.css
```

`theme.css` references the swatches in `colors.css` by name. A `var()` pointing
at a not-yet-declared property is invalid at computed-value time — which is the
exact bug the semantic layer was added to fix.

## Token contract

Every token is `--af-*` at `:root`. ⛔ **Components reference the SEMANTIC names
in `tokens/theme.css` — `--af-text`, `--af-surface-page`, `--af-brand`,
`--af-line` — and never the raw swatches in `colors.css`.**

Page kits should keep a fallback on every `var()` so they render if the token
layer fails to load: `var(--af-ink, #1a1726)`.

⭐ **`--af-brand` is `#24164f`** — read as a *computed* value off the live Ghost
site, not found in the stylesheet source, where it does not appear as a literal.

⛔ **`check-kits.mjs` gates the MEDIAN characters per line, not the worst line**
(line 959; `p.max` appears in no gate in the file). Anyone re-deriving a column
from a worst-line reading will narrow it for no reason — and narrowing hurts this
site specifically, because its long proper nouns already shorten the lines.

---

## ⭐ State — verified in Chromium, 8 August 2026

**The system was loaded into a real browser in the documented order and read with
`getComputedStyle`,** which is what every file in it insists on. Rendered against
a fixture exercising every component.

| Check | Result |
|---|---|
| Custom properties referenced / resolving | **77 / 77** — zero unresolved |
| CSS rules parsed by the engine | 219 — no swallowed comment, no dropped block |
| Face actually painted | `Noticia Text` |
| Body size at a 640px viewport | **exactly 20px** — the documented measure/type coupling holds |
| Text column at 1024px | 592px |
| Tap targets under 44px on either axis | **none** |
| Masthead at 375px | 137px, nav on one row |
| Nav at **320px** (the floor) | **one row**, 0 horizontal overflow |
| Horizontal overflow at 320px and 375px | 0 |

### ⛔ Four defects this found, all now fixed

1. **`--af-brand` was used 13 times and defined never.** An undefined `var()` is
   invalid at computed-value time, so the declaration is discarded. In
   `::selection` and `[data-topic]:hover` the `background` half was thrown away
   and the `color: paper` half applied — **paper-coloured text on paper.**
   Selecting any text on any page made the words vanish. Fixed by the semantic
   layer, `tokens/theme.css`.
2. **`.prose a { min-height: 0 }` was eating the tap floor of standalone
   controls.** At specificity (0,1,1) it beat `[data-topic]` at (0,1,0), so a
   topic tag or button inside `.prose` rendered **24.1px tall**. Now
   `:where(.prose) a`, which contributes zero specificity.
3. **The masthead nav fix worked at 375px and failed at 320px** — 2 rows and a
   191px masthead, 34% of a 568px screen. It had never been measured at the
   floor. 4px padding gets one row with 7px spare.
4. **Footer links were 29.8px wide** with a correct 52px height — the width axis,
   forgotten for the third time across two projects.

### ⚠️ What is still not done

- ⛔ **Nothing has been opened in a browser as a PAGE.** The verification above
  renders a component fixture, not a designed page. It proves the CSS computes;
  it does not prove anything looks right. A tester verdict must come before the
  owner is told anything is ready.
- ⛔ **`check-kits.mjs` has not been run.** Its `FAMILY_DEFAULT` is still
  `'Figtree'` from the Airbnb era, so it cannot judge these kits until that is
  updated. See `PREDICTION.md`.
- ⚠️ **`institutional/institutional.css` is superseded but not deleted.** The
  five institutional page kits still load it and still render. It carries its own
  `:root` with **four spacing collisions** — `--af-s5` is 24px where
  `--af-space-5` is 20px — and a different type ladder under the same prefix.
  ⛔ **Do not copy a rule out of it into a new page.** See the head of
  `system/components/chrome.css`.
- ⚠️ **The stale green `#14594a` survives as a `var()` fallback** in
  `institutional.css` and the five institutional page kits. It only fires if the
  token layer fails to load — which is precisely the scenario fallbacks exist
  for, so the safety value is the wrong colour.
- ⛔ **No remote for this repo.** It exists on one machine.

### What still needs the owner, not a designer

An **email address** (5 slots on contact) · **three sentences** on what
partnership includes (3 slots on partners) · **one slot on about**, and two
mission paragraphs that are design's wording · verification of **"6 fellows" and
"13 stories"** against the organisation's own records · ⛔ **one slug per topic
in the CMS** — `/tag/arts-culture/` and `/tag/art-and-culture/` are both live.

⚠️ **And one question this system raises for the first time:** forms now have
error states, and this palette has no red. The pattern used is GOV.UK's with the
red removed — an error summary that links to the failed field, a 4px rule, and
the word "Error:" in the text. It is WCAG-conformant. The open question is
whether a reader can *find* the failed field at a glance without one. See the
STATE section of `system/components/forms.css`.

## Reading order for whoever picks this up

`system/SKILL.md` → `system/GUARDIAN-FAITHFUL.md` → `system/REMOVED.md` →
`system/tokens/theme.css` → `system/LANDMARKS.md` → `PREDICTION.md`.
