# Reuse-Before-Build — the gate, and what it decided

**Nine open design systems were researched on 5 August 2026** by fetching each
project's own documentation and repository, before anything in this system was
built. This file is that record, ported here on 8 August 2026 with the verdicts
re-checked against *this* site.

⚠️ **It did not travel when the system was rehomed, and the cost of that is
specific:** without it, the next person to ask "why Noticia and not a system
stack?" or "should we just use Pico?" re-runs a day of research that has already
been done, and may reach a different answer for no better reason than that they
did not know this existed. The `~/.claude/CLAUDE.md` guardrail requires a named
bake-off before any component is built; **this is the evidence that the gate was
run.**

---

## ⭐⭐ What changed about the premise — read this before the table

The evaluation below was run against **catsofkochi's** constraint:

> the reader is standing outside in Fort Kochi, on a phone, in bright sun, on
> mobile data. The site ships **no web fonts and near-zero JavaScript**, and
> that is its strongest technical asset.

**Three parts of that premise are no longer true here, and each one moves at
least one verdict:**

| Premise | Then | Now |
|---|---|---|
| The reader | Outdoors, phone, sun, mobile data | Indoors, laptop, long-form. ⚠️ Device split **unmeasured** — see `GUARDIAN-FAITHFUL.md` |
| Web fonts | **Zero** | ⛔ **61 KB of Noticia Text ships.** The strongest technical asset in the old premise has been spent, deliberately and with a written argument |
| The stack | Astro, a build step, `.astro` components | **Ghost + the Maali theme.** No build step of ours, no component runtime |
| The business | A commercial travel product selling itineraries | **A not-for-profit publishing profiles** |

⭐ **The fourth row reopens exactly one rejection.** See Wikimedia Codex below.

---

## The verdicts

| System | Licence | Verdict then | ⭐ Verdict now |
|---|---|---|---|
| **Guardian Source** | Apache-2.0 | Adopt — the ladders | ✅ **Unchanged.** Type ladder and breakpoint ladder both in use |
| **GOV.UK Design System** | code MIT; docs OGL v3.0 | Adopt — partially | ✅ **Unchanged, and used more.** Its error pattern is now the whole of `forms.css` |
| **BBC GEL** | guidelines public; code archived | Adopt — principle only | ✅ **Unchanged.** Group D still decides the type ceiling |
| **Utopia** | free method, no package | Adopt — the method | ✅ **Unchanged.** Every fluid step in `typography.css` is a `clamp()` |
| **Mozilla Protocol** | npm, MPL | Reject wholesale | ✅ Reject — argument strengthens |
| **Wikimedia Codex** | ⛔ GPL-2.0 | Reject — on licence | ⚠️ **REOPENED then re-rejected — on different grounds.** See below |
| **Every Layout** | ⛔ paid, $69 | Reject | ✅ Reject — fails open-source-first outright |
| **Pico.css** / classless | MIT | Reject — category | ✅ Reject — argument strengthens |
| **Lucide** (icons) | ISC, 1600+ | Adopt | ⛔ **PARKED. Not adopted here** — see below |

---

## The four adoptions, and what each one actually contributed

### Guardian Source — the ladders, not the library

Apache-2.0, verified 5 Aug 2026 in `guardian/csnx`.

**Type ladder taken whole:**

```
0.75 · 0.875 · 0.9375 · 1.0625 · 1.25 · 1.5 · 1.75 · 2.125 · 2.625 · 3.125 · 4 · 4.375 rem
  12 ·    14 ·     15 ·     17 ·   20 ·  24 ·   28 ·    34 ·    42 ·    50 · 64 ·    70 px
```

A newspaper has spent decades and real money on how tired people read quickly.
Reuse-before-build says take the scale rather than invent one, and this is the
clearest case of it in the whole evaluation.

**Breakpoint ladder taken, reduced to three.** `tokens/breakpoints.css` carries
the full eight-step source and the reasoning for cutting to three.

⛔ **What cannot be taken: the typefaces.** Proprietary, licensed to the Guardian
alone. **A type scale is reusable; a licensed typeface is not.**

⭐ **RE-DECIDED HERE — the floor moved up, not down.** catsofkochi departed from
the Guardian's 12px floor by going to 13px, naming *sunlight*. This system floors
at **14px and nothing goes below it**, because the one place 13px appeared was a
photo credit — the text this site most needs people to actually read. *A size is
a judgement about a reader, not a constant,* and the reader changed.

### GOV.UK Design System — two tiers, and it now carries a whole file

The most-tested system in the world for *a stressed person needs one fact*.

**Taken then:** the 19px body-size evidence (GOV.UK does not shrink text on a
phone — a measured position held across the whole of UK government), and the
answer-first / one-thing-per-page patterns.

⭐ **Taken again, 8 Aug 2026, and it decided the hardest question in the
system:** the **error summary** pattern — a box at the top of a form, each item a
link to the field that failed, taking focus on submit. `forms.css` is built on
it. GOV.UK's own research is that **the summary does the work and the red is
convention layered on top of a structure that already carries the meaning**,
which is what let this palette keep its no-red rule without failing WCAG 1.4.1.

**Not taken:** the Sass, the components, the JavaScript enhancements, the crest,
the GDS Transport font files.

### BBC GEL — the right thinking, a dead code path

⛔ `bbc/psammead` was **archived by the BBC on 13 August 2023** — README reads
"🚨 NO LONGER MAINTAINED 🚨" — and the components moved into a `legacy` folder
inside Simorgh, a React SPA. Nothing installable and maintained remains, and what
does remain is React: a runtime this site does not have and should not gain.

⚠️ `bbc.co.uk/gel` itself could not be fetched (blocked), so its current terms of
use for the written guidelines are **unverified**. Treat GEL as a source of
principle, read and applied — not as a dependency.

⭐ **Group D is the least obvious finding in the whole evaluation.** GEL groups
type by device class rather than width, and its **desktop** type is *smaller*
than its **tablet** type (16/22 against 18/24). A touch device is held in the
hand; a monitor sits at arm's length behind a keyboard. **Screen width is a poor
proxy for how far away the reader's eye is.** That is why the ladder in
`typography.css` tops out at 20px rather than growing with the viewport — a wide
screen is a signal of a desk, not of a need for bigger text.

### Utopia — adopt, at zero bytes

A methodology, not a library: define a scale for small screens, one for large,
let the browser interpolate with `clamp()`. No package, no runtime, no build
step, nothing to install, nothing to keep updated.

⭐ **This is the tier the reuse rule actually wanted. The value was never in
somebody else's CSS file.** Every fluid step here is a `clamp()`, and the body
size is interpolated to land on exactly 20px at exactly the viewport where
`--af-measure` starts binding — a coupling the method makes possible and a
breakpoint switch does not.

---

## The rejections

### ⚠️ Wikimedia Codex — reopened, and re-rejected on better grounds

**The original rejection does not survive the move.** It read:

> it is GPL-2.0 … a copyleft licence on a design system **for a commercial
> travel business** … not a question worth carrying into a site that will sell
> itineraries.

⭐ **aikyamfellows.org is a not-for-profit that publishes profiles and sells
nothing.** The commercial-risk argument that decided it is simply gone, and the
honest thing is to say so rather than to inherit a verdict whose reasoning has
expired.

⛔ **It is still rejected, on the argument that always applied independently:**
it is a component library, and this site's problem is not that bare HTML is
unstyled. The problem was seven bespoke editorial components — a two-part
headline, an attributed pull-quote, a fellow card, a topic tag — and **Codex has
no concept for any of them.** Adopting it would ship a framework to replace a
working stylesheet and still leave every component to build. Its Vue dependency
is avoidable (it ships CSS-only components and standalone tokens); the category
argument is not.

⚠️ **What would reopen it properly:** a decision to build an application rather
than a publication — a fellow application portal, an admin surface, a grant
dashboard. Codex is genuinely good at those and this system deliberately is not.
The GPL-2.0 question would then need answering on its merits, not dismissed.

### Mozilla Protocol — right purpose, wrong weight

The only candidate built for *content and marketing sites* rather than product
UI, which makes it the closest conceptual peer in the list. Rejected for the
category reason above: adopting it ships a whole framework to replace a
stylesheet that works, and leaves the bespoke components unbuilt.

### Every Layout — fails open-source-first

**$69, paid**, and its layout components are JS custom elements. Open-source wins
ties; this does not reach a tie. The published free rudiments are worth reading
and its algorithmic-layout thinking is sound — `[data-grid]` and
`[data-footer-cols]` in this system both use the `auto-fit`/`minmax` idea it
popularised — but **adopting a paid system when a free methodology covers the
same ground would be backwards.**

### Pico.css, Simple.css and the classless category

MIT, small, honestly built. Pico was evaluated directly; Simple.css is treated as
the same category rather than claiming research that was not done — **because the
category argument decides both, and it is not about kilobytes.**

A classless framework styles bare HTML beautifully. This site does not have bare
HTML. ⭐ **And the argument got stronger with the stack change:** it is now Ghost
running the Maali theme, so a classless framework would land *on top of* a theme
that already styles every element, and the two would fight in a cascade nobody
controls.

⚠️ **One honest concession:** `styles.css` grew a large base-element layer on
8 Aug 2026 — lists, tables, quotes, code, forms — which is precisely what a
classless framework provides for free. That is the closest this system has come
to reinventing one. It is still the right call, because **every block in that
file exists to enforce a decision this system made** (16px `<small>` floor, no
40px list indent inside a measured column, tabular figures only where numbers
stack, 17px form controls to stop iOS zoom). A generic framework would give the
elements a style and give none of them these.

### ⛔ Lucide — adopted there, PARKED here

ISC, 1600+ icons, plain SVG via `lucide-static`, no JS runtime. It was the right
adoption for catsofkochi, which needed eight conventional glyphs.

**This system ships no icon set at all, deliberately.** `REMOVED.md`: *an icon
set is a vocabulary of the nouns a product names; none of these nouns exist
here.* A reading site has no search-menu-close-chevron-alert vocabulary, and the
seven topics are encoded in **words**, never in symbols — because *colour does
not encode, and neither does a glyph, to a reader on their first visit*.

⭐ **The verdict is parked rather than reversed, and that distinction matters:**
when a screen finally needs an icon, the research is done and the answer is
Lucide (runner-up Tabler, MIT, 6,184 icons on a documented 24×24/2px grid). ⛔ It
is not an invitation to add one. Nothing in the eleven page types built so far
has needed a single glyph.

---

## What this means, in one line

**Nothing is installed.** Every adoption above is a pattern, a measurement or a
method. This system is a hand-written stylesheet that carries the Guardian's
ladders, GOV.UK's error structure and body-size evidence, GEL's Group D
principle, and Utopia's fluid method — **none of which cost the reader a byte.**

⛔ **The one thing that is not free is the webfont**, and it is the one place the
old premise was spent rather than kept: 61 KB of Noticia Text, argued in
`typography.css` on the grounds that *a face change is a measure change*. ⚠️ That
argument has a stated falsification test — if the analytics show a
majority-mobile, Indian-mobile-data audience after all, the 61 KB is being paid
by the reader least able to afford it, and the fix is `font-display: optional`,
a one-word change.

**The genuinely bespoke things are the two-part headline and the attributed
pull-quote**, and that is deliberate: they are where the differentiation is. No
open system has a concept for *"a person's name, a pipe, and an editorial
phrase"* or for *"this quote is someone else speaking about the subject."*
