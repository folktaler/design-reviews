# aikyam fellows — how to build with this system

⛔ **There are no JavaScript components to import.** This is a CSS design system
with an HTML contract. There is no `_ds_bundle.js`, no `window.*` namespace and
no React package — deliberately, because the site is Ghost with no build step.
You style real HTML with the tokens and attributes below.

## The one rule that decides everything else

**Every component is a `data-*` attribute on ordinary HTML.** The attribute is
both the styling hook and the contract a check reads. Write
`<h1 data-headline>`, never `<h1 class="headline">` — a class of convenience
styles nothing, and renaming a landmark breaks the checks silently.

```html
<header data-masthead>
  <div data-masthead-inner class="wrap wrap--wide">
    <a data-wordmark href="/">aikyam fellows</a>
    <nav aria-label="Primary">
      <ul data-nav><li><a href="/fellows/" aria-current="page">Fellows</a></li></ul>
    </nav>
  </div>
</header>

<main id="main" class="wrap">
  <h1 data-headline>
    <span data-headline-name>Sentinaro Shiu</span>
    <span data-headline-phrase>A Heart that Listens</span>
  </h1>
  <p data-standfirst>One sentence that makes a stranger read 1,900 words.</p>
  <p data-byline>By <a data-byline-author href="/author/aparna/">Aparna R</a>
    · <time data-byline-date datetime="2026-08-03">3 August 2026</time></p>
  <div class="prose">
    <p>The article body. This is the only place the measure binds.</p>
  </div>
</main>
```

## The three classes that exist

There are **three**, and they are layout, not components:

| Class | Job |
|---|---|
| `.wrap` | The reading column — caps at `--af-measure` (592px) plus gutters. Article bodies. |
| `.wrap--wide` | The index column — caps at `--af-measure-wide`. Grids, chrome, footers. |
| `.prose` | The article body. Sets paragraph rhythm and binds the measure. |

Plus two utilities: `.list-bare` (a `<ul>` that is a layout, not a list) and
`.visually-hidden` (text for screen readers only).

⛔ **Do not invent classes.** If a thing needs styling and has no landmark, it is
either page-local layout — use an inline `style` for grid/flex only — or it is a
missing component and belongs in `system/components/`.

## Tokens — use these names, never a raw value

Read `styles.css` and its imports before styling anything. Every colour must be
a **semantic** name from `tokens/theme.css`, never a raw swatch:

| Family | Names |
|---|---|
| Surface | `--af-surface-page` · `--af-surface-sunk` · `--af-surface-inverse` |
| Text | `--af-text` · `--af-text-quiet` · `--af-text-link` · `--af-text-on-brand` · `--af-text-on-inverse` |
| Brand | `--af-brand` · `--af-brand-fill` |
| Band (dark chrome) | `--af-band` · `--af-band-text` · `--af-band-accent` · `--af-band-rule` · `--af-text-on-band-accent` |
| Lines | `--af-line` (hairline) · `--af-line-strong` (structural) · `--af-line-link` · `--af-line-control` |
| Type | `--af-type-micro/small/ui/body/standfirst/subheading/heading/display` |
| Family | `--af-font-text` (serif, READ) · `--af-font-ui` (sans, TOLD) |
| Space | `--af-space-1` … `--af-space-10` · `--af-gutter` · `--af-measure` |
| Shape | `--af-radius-none/control/pill/round` · `--af-tap` (44, assert) · `--af-tap-comfortable` (52, build) |

## Rules that are not negotiable

1. **A link is ink underlined in the brand.** The brand is 15.72:1 on this paper
   and ink is 17.15:1 — a brand-coloured link is invisible as text. Never set
   `color: var(--af-brand)` on running text.
2. **Two weights: 400 and 700.** Noticia ships no others. `font-weight: 500`
   renders a synthesised smear that looks fine in source and wrong on screen.
3. **Two text greys, never three.** If something must recede further it needs
   fewer words or more space.
4. **Words encode, colour does not.** Seven topics, seven words, no hues, no
   icons. There is no icon set and adding one needs a screen that requires it.
5. **Light only.** No dark theme, no toggle, no `prefers-color-scheme`.
6. **Both tap axes.** Build to `--af-tap-comfortable` (52px); a value sitting
   exactly on 44 is pending, not passing.
7. **`--af-band-accent` may only appear on the dark band.** It is 10.55:1 there
   and 1.49:1 on paper — off the band it reads as missing, not subtle.
8. **Zero JavaScript.** Nothing here needs it and nothing should gain it.

## Where the truth is

- `styles.css` — the import closure. Everything reachable from it is the system.
- `tokens/theme.css` — the semantic layer. Reference these, never `colors.css`.
- `components/<group>/<Name>/<Name>.prompt.md` — per-component markup and rules.
- The CSS files carry the reasoning: every measurement, every rejected
  alternative and every defect that cost a day is written where the rule is.
  If a rule looks arbitrary, the reason is in the comment above it.


---

## Component index

### Chrome

- **Masthead** — The dark band at the top of every page: wordmark, primary nav, topic strip. Exactly one per page.
- **TopBar** — The strip above the masthead. Carries ONLY routes that are not reading routes — Support, compliance. Nothing here may also be in the main nav.
- **Footer** — The end of every page. Repeats the primary nav, then ruled link columns, then the standing ask, then a legal strip.
- **Breadcrumb** — A page below the top level. The last crumb is the page you are on, so it is NOT a link.
- **Pagination** — A paginated index. Shows the count, because on a small archive "Page 1 of 6" is reassuring rather than daunting.

### Editorial

- **Headline** — The H1 of a profile. Every title on this site is `Name | Phrase`, and the pipe is a STRUCTURE, not a character.
- **Standfirst** — One sentence under the headline that makes a stranger read 1,900 words. At most one per page.
- **Byline** — Who wrote it and when. Required on every profile — this site publishes about real, named, living people.
- **PullQuote** — Words lifted out of the article and repeated to make a reader stop. Editorial, not structural.
- **TopicTag** — One of seven subjects. A navigational primitive, so it is built like a control — 52px on both axes.
- **Portrait** — A photograph of a person. The caption names them; a portrait with no caption on a site about people is the page failing at its own job.
- **ReadNext** — Three more fellows at the end of an article, with faces. The reader is deciding, and a face is what they decide about.
- **Correction** — We published something untrue about a named living person. Foot of the piece, in words, with a date.
- **Newsletter** — The signup. Not a commerce CTA — nothing is scarce and nothing happens if the reader says no.
- **Button** — One primary button per page. Brand fill, paper text.

### Index

- **Rail** — A section of an index: its name in a left column, the content grid beside it. The heading stays on screen for the whole list.
- **Card** — One entry in an index. The person\u2019s name leads, the story title follows, the face is on the right.
- **Highlights** — The light band under the top strip: two or three fellows with faces, above the fold on every page.
- **Opening** — The home page\u2019s first screen: the strapline on one side, a fellow\u2019s face and words on the other.
- **Kicker** — A small inverted label naming what KIND of thing follows. The publication speaking, rather than the writer.
- **Section** — A heavy 3px rule that turns one long scroll into a page with parts.
- **Figure** — A counted claim on an impact page. ⛔ The value is an `<a>` — a figure with no destination CANNOT be built.

### Blocks

- **Hero** — An inverted opening band. For pages that ASK for something, never for pages that are read.
- **Note** — The publisher speaking about the piece, rather than the author writing it.
- **EmptyState** — A zero-result list. On a small archive this is a normal page, not an edge case.
- **Table** — Any table. ⛔ Unwrapped, a four-column table pushes the whole document sideways on a phone.
- **Disclosure** — A stack of questions and answers that needs no JavaScript.
- **DocumentIndex** — A compliance page. The reader is working through a checklist, not browsing.
- **Partner** — A named funder, with its mark beside its sentence rather than instead of it.
- **Placeholder** — Something the owner has to supply, or an image that does not exist yet. Quiet, never an alarm.

### Forms

- **Field** — One input with its label and hint. The label is ABOVE the input and is never a placeholder.
- **FieldError** — A field that failed validation. This palette has NO red, and the pattern works without one.
- **ErrorSummary** — The component that does the real work on a no-red form: every failure listed at the top, each a link to its field.
- **Search** — A search field and its result count. On a small archive most searches return nothing, so build the empty state first.
