# Landmarks — the contract between a page and a check

A landmark is a `data-*` attribute that declares *what a piece of markup is*. It is not
decoration and it is not a styling hook of convenience: it is the only thing that lets a
check find a component in a **rendered page** without depending on class names a page kit
is free to rename.

> ⭐ **The rule that makes landmarks worth having: a check must never measure a position
> without first gating existence.** "Every portrait has a credit" passes trivially on a page
> with no portraits — zero iterations, zero failures. So each landmark below has a stated
> *existence* half and a *property* half, and a page with none of a thing is **skipped with
> a reason**, never passed.

---

## ⛔ Why there are no `.astro` files here

The system this inherits shipped `.astro` components, because catsofkochi is an Astro site.
**aikyamfellows.org is Ghost, running the Maali theme.** Shipping `.astro` would import a
stack decision that has not been made, and a builder would either port them by hand or,
worse, treat their existence as the decision.

So the contract is **HTML + the landmark + `components.css`**. That is portable into a Ghost
handlebars template, an Astro component, or a static page, and it is what the checks read.

---

## The registry

| Landmark | Exists on | The property that is gated |
|---|---|---|
| `data-topic` | every topic tag | ≥ 44px on **both** axes; `href` resolves to a real tag page |
| `data-headline` | the `h1` of a profile | contains a `data-headline-name` |
| `data-headline-name` | the person's name | non-empty |
| `data-headline-phrase` | the editorial phrase | may be empty; hidden when empty |
| `data-standfirst` | at most one per page | not identical to the site tagline |
| `data-byline` | every profile | contains an author **and** a date |
| `data-byline-author` | the author's name | is a link to `/author/…` |
| `data-byline-date` | the date | is a `<time>` with a valid `datetime` |
| `data-portrait` | every photograph of a person | has a `figcaption`; ⚠️ a credit is **recommended, not required** — measured 8 Aug, no photograph in the live archive carries one |
| `data-portrait-credit` | the credit line | non-empty; same size as the caption |
| `data-pullquote` | every pull-quote | ⚠️ a source is **recommended, not required** — measured 8 Aug across 5 live profiles, up to 5 quotes each and none formally attributed |
| `data-pullquote-source` | who said it | non-empty |
| `data-fellow-card` | a card in a list | the whole card is the tap target |
| `data-newsletter` | the signup | has a `<label>`, and a privacy line |
| `data-button` | a button | ≥ 44px on both axes |
| `data-read-next` | end of a profile | each row ≥ 44px tall |
| `data-correction` | a correction | carries a date |
| `data-divider` | a rule | — |

### Chrome — every page type has these (`components/chrome.css`)

| Landmark | Exists on | The property that is gated |
|---|---|---|
| `data-masthead` | every page | exactly one; ⭐ **total chrome ≤ 250px at 375px, ≤ 320px at 320px** |
| `data-masthead-inner` | inside the masthead | — |
| `data-wordmark` | the site name | is a link to `/`; ≥ 44px tall |
| `data-nav` | the primary nav | ≤ 2 rows at 320px; every link ≥ 44px on both axes; serif at heading size |
| `data-breadcrumb` | a page below the top level | last item is **not** a link and carries `aria-current="page"` |
| `data-pagination` | a paginated index | every target ≥ 44px on both axes; no disabled control present |
| `data-pagination-count` | the "Page 2 of 7" line | non-empty when pagination exists |
| `data-footer` | every page | exactly one; every link ≥ 44px tall |
| `data-footer-cols` | the footer's columns | — |
| `data-footer-legal` | the legal strip | — |

### Forms (`components/forms.css`)

| Landmark | Exists on | The property that is gated |
|---|---|---|
| `data-field` | every input group | has a visible `<label>` whose `for` resolves |
| `data-field-hint` | an optional hint | sits **above** the input in the DOM |
| `data-field-optional` | an optional field's marker | the word, never an asterisk |
| `data-field-error` | an invalid field's message | sits **above** the input; begins "Error:"; `id` is in the input's `aria-describedby` |
| `data-invalid` | on `[data-field]` when failed | the input carries `aria-invalid="true"` |
| `data-error-summary` | a failed form | first element in the form; `tabindex="-1"`; every item links to a real field `id`; item order matches field order |
| `data-form-success` | a submitted form | carries `role="status"` |
| `data-form` + `data-pending` | a submitting form | `aria-busy="true"`; button is `aria-disabled`, **not** `disabled` |
| `data-search` | a search field | has a visible or visually-hidden `<label>` |
| `data-search-count` | the result count | is a live region; echoes the query term |

### The Guardian header stack (`components/chrome.css`)

| Landmark | Exists on | The property that is gated |
|---|---|---|
| `data-topbar` | every page | at most one; the skip link precedes it in the DOM |
| `data-topbar-ask` | the standing ask | hidden below 40rem — the CTA is not |
| `data-topbar-links` | utility links | hairline between items, never after the last |
| `data-subnav` | the seven topics | one scrolling row below 40rem, never wrapped |
| `data-footer-nav` | the footer's nav repeat | same four routes as the masthead |
| `data-footer-col` | each footer column | vertical hairline between columns above 48rem |
| `data-footer-ask` | the standing ask | leading rule at every width; ⛔ not a payment ask |
| `data-footer-top` | back to top | is an `<a href="#main">`, **never** a scripted scroll |

### Index structure (`components/blocks.css`)

| Landmark | Exists on | The property that is gated |
|---|---|---|
| `data-rail` | an index section | 2px ink rule above; 13.75rem label column above 48rem |
| `data-rail-label` | the section's name | sticky above 48rem, static below |
| `data-cards` | the ruled grid | rules drawn by `gap: 1px` over the container background |
| `data-card` | one cell | ⛔ **must not have its own background** — it would cover its own rules |
| `data-card-name` | the kicker above the title | ⛔ omitted entirely when there is no separate title, never repeated |
| `data-card-title` | the title | 20px/400 — not the bold of an in-page heading |
| `data-card-face` | a portrait | circular; the only circle in the system |
| `data-kicker` | a section label | is a `<p>`/`<span>`, **never** a heading |
| `data-section` | a page section | 3px ink rule above |
| `data-highlights` | the strip below the top bar | at most three cards; ⛔ never a carousel |
| `data-placeholder-media` | a missing image | carries the aspect ratio the real image will have |

### Blocks (`components/blocks.css`)

| Landmark | Exists on | The property that is gated |
|---|---|---|
| `data-note` | a publisher's aside | has a `data-note-label` |
| `data-table` | **every** `<table>`'s wrapper | `role="region"` + `tabindex="0"` + `aria-labelledby` → the caption |
| `data-toc` | a contents list on a long page | every entry's `href` resolves to an `id` on the page |
| `data-empty` | a zero-result list | offers a route onward — a topic list or a link, never a count alone |
| `data-error-page` | 404 / 500 | carries the masthead and footer like any other page |
| `data-error-code` | the status label | not set at display size |
| `data-embed` | a third-party iframe | wrapper has `aspect-ratio`; the iframe has **no** fixed height |
| `data-grid` | an index list | is a `<ul>`; caps at `--af-measure-wide`, never `--af-measure` |
| `data-figures` / `data-figure` | a counted claim | ⛔ `data-figure-value` **is an `<a>`** |
| `data-figure-value` | the number | is a link whose `href` resolves to the list it counts |
| `data-figure-label` | what is counted | non-empty |
| `data-figure-asof` | the date the count was true | non-empty, and is a `<time>` |
| `data-faq` | a disclosure stack | ⛔ no `<details name>` — never exclusive |
| `data-banner` | a site notice | at most one per page |
| `data-funding` | the money disclosure | sits beside the figures it explains |
| `data-partner` / `data-partner-name` | a named partner | no logo image; no size tiering between partners |
| `data-route` / `data-route-what` / `data-route-who` | a way to get involved | `who` is non-empty |
| `data-people` | a named list | no photographs |
| `data-mail` | an email link | `display: flex`, **never** `inline-flex` |

---

## Canonical markup

### Headline — the two-part lockup

```html
<h1 data-headline>
  <span data-headline-name>Sentinaro Shiu</span>
  <span data-headline-phrase>A Heart that Listens</span>
</h1>
```

⛔ **Split the CMS title on `|` and on nothing else.** If there is no `|`, the whole string
is the name and the phrase is empty. Do **not** also split on `:` — the live post
*"The Bauls &amp; Millet Songs: Shilanjani Bhattacharyya's Journey"* has the phrase first and
the name second, so a colon rule would set a song title as a person's name at 42px.

⭐ **The splitter must be able to list the posts it could not split**, not count them. A
count sends someone to fix four and conclude the tail was handled. Two known cases as of
7 Aug 2026: the Bauls post (colon), and *"Rahul Thomas| Theatre Saved Me"* (no space before
the pipe — splits correctly, but the source string wants fixing).

### Byline

```html
<p data-byline>
  By <a data-byline-author href="/author/aparna/">Aparna R</a>
  · <time data-byline-date datetime="2026-08-03">3 August 2026</time>
</p>
```

⛔ The date is **not** a link. Six identical "Aug 3, 2026" entries in a screen reader's link
list are noise. The author is a link because an author has an archive.

### Portrait

```html
<figure data-portrait>
  <img src="…" alt="Sentinaro Shiu sitting with three students on a classroom floor" />
  <figcaption>
    Sentinaro with her Class 7 group in Kohima, the week before the school year ended.
    <span data-portrait-credit>Photograph: Haneen Naseer</span>
  </figcaption>
</figure>
```

Round variant, for a face used to identify someone: `<figure data-portrait="round">`.

⛔ **Both `figcaption` and `data-portrait-credit` are required.** A portrait with neither is
the defect measured on the live site on 7 Aug 2026, on every photograph of the Sentinaro Shiu
profile.

### Pull-quote

```html
<blockquote data-pullquote>
  <p>I feel very understood when I talk to you.</p>
  <cite data-pullquote-source>A Class 7 student, on Sentinaro</cite>
</blockquote>
```

⛔ **`source` is required.** Unattributed, that line reads as the fellow praising herself.

### Topic tag

```html
<a data-topic href="/tag/art-and-culture/">Art &amp; Culture</a>
```

⚠️ **The tag vocabulary is broken in the CMS and no markup fixes it.** `/tag/arts-culture/`
and `/tag/art-and-culture/` are both live and both linked from the homepage;
`/tag/mental-health-2/` is a Ghost duplicate-slug artefact. Until one slug per topic exists,
this component sends different readers to different, incomplete lists.

### Correction

```html
<aside data-correction>
  <strong>Correction, 7 August 2026.</strong>
  An earlier version said Sentinaro taught in Dimapur. She teaches in Kohima.
</aside>
```

⛔ Foot of the piece, in words, with a date. **No red.** There is no error colour in this
palette and adding one is how the palette gets worse.

---

## Canonical markup — the page skeleton

⭐ **Every page type in this system is this, with a different middle.** It was written down
on 8 Aug 2026 because the chrome had never been part of the system, so each of the five
institutional pages had assembled its own from memory.

```html
<a class="skip-link" href="#main">Skip to the story</a>

<header data-masthead>
  <div data-masthead-inner class="wrap wrap--wide">
    <a data-wordmark href="/">aikyam fellows</a>
    <nav data-nav aria-label="Primary">
      <a href="/fellows/">Fellows</a>
      <a href="/about/" aria-current="page">About</a>
      <a href="/partners/">Partners</a>
      <a href="/contact/">Contact</a>
    </nav>
  </div>
</header>

<main id="main" class="wrap">
  <!-- the page -->
</main>

<footer data-footer>
  <div data-footer-cols class="wrap wrap--wide">…</div>
  <div data-footer-legal class="wrap wrap--wide">…</div>
</footer>
```

⛔ **`aria-current="page"` is the styling hook as well as the accessibility contract** — one
attribute, so they cannot disagree. A page that marks the current nav item with a class and
forgets the attribute looks right and announces nothing.

⛔ **No emoji in nav labels.** The live site carries 🌳 🤝🏼 🫂 ✉️. `🫂` does not decode in
several fonts, and every one of them is read aloud before the link text.

### Breadcrumb

```html
<nav data-breadcrumb aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/tag/education/">Education</a></li>
    <li aria-current="page">Sentinaro Shiu</li>
  </ol>
</nav>
```

⛔ **The separator is drawn with `::before`, never typed.** A `/` in the markup is announced
as "slash" on every hop. ⛔ **The last crumb is not a link** — it is the page the reader is
already on.

### Field, and a field that failed

```html
<div data-field>
  <label for="email">Your email address</label>
  <p data-field-hint id="email-hint">We only use this to reply to you.</p>
  <input id="email" name="email" type="email" autocomplete="email"
         aria-describedby="email-hint" />
</div>

<div data-field data-invalid>
  <label for="email">Your email address</label>
  <p data-field-error id="email-error">
    <span class="visually-hidden">Error:</span>
    Enter an email address in the format name@example.com
  </p>
  <input id="email" name="email" type="email" autocomplete="email"
         aria-invalid="true" aria-describedby="email-error" />
</div>
```

⛔ **The message goes ABOVE the input.** Below the field it is behind the on-screen keyboard
the moment the reader focuses the input to fix it — the instruction for correcting the error
is hidden by the act of correcting it.

⛔ **The word "Error:" is in the markup, not in CSS.** A `::before { content: 'Error: ' }` is
not reliably announced; some screen readers skip generated content entirely.

### Error summary

```html
<div data-error-summary role="alert" tabindex="-1">
  <h2>There is a problem</h2>
  <ul>
    <li><a href="#email">Enter an email address in the format name@example.com</a></li>
  </ul>
</div>
```

⛔ **It must take focus on submit** — `.focus()` on the container after a failed submit.
Without that, a keyboard or screen-reader user submits, the page re-renders, focus returns to
the top of the document, and nothing announces that anything went wrong. **The visible box is
only half the component.**

### Table — never bare

```html
<div data-table role="region" tabindex="0" aria-labelledby="grants-caption">
  <table>
    <caption id="grants-caption">Grants awarded, 2024–2026</caption>
    <thead><tr><th scope="col">Year</th><th scope="col">Fellows</th></tr></thead>
    <tbody><tr><td>2026</td><td>6</td></tr></tbody>
  </table>
</div>
```

⛔ **An unwrapped table is a site-wide phone bug.** Four columns cannot fit a 327px screen,
so the table pushes the whole *document* sideways and every reader on that page gets a
horizontal scrollbar over the entire site chrome. ⛔ And the wrapper alone is not enough:
without `tabindex="0"` the scroll region is unreachable by keyboard, and a focusable region
without an accessible name is a WCAG failure — hence `role="region"` + `aria-labelledby`.

### Figure — a number the reader can check

```html
<ul data-figures class="list-bare">
  <li data-figure>
    <a data-figure-value href="/fellows/">6</a>
    <span data-figure-label>fellows</span>
    <time data-figure-asof datetime="2026-08-07">as of 7 August 2026</time>
  </li>
</ul>
```

⭐⭐ **The value is an `<a>`, not a `<span>`, and that is the whole component.** A figure with
no destination cannot be built. "6 fellows" links to the six; "13 stories" links to the
thirteen. The check is structural, not editorial.

⛔ **This replaced the live site's Plausible traffic embed** — *website traffic standing in
for a fellowship's impact,* where *a rising line reads as achievement without ever claiming
to be one.*

⚠️ **The numbers are still unverified.** "6 fellows" and "13 stories" were counted off the
live site and must be checked against the organisation's own records — *the impact page must
not be where a discrepancy first appears.*

### Empty state — a normal page on this site, not an edge case

```html
<div data-empty>
  <h2>No stories in Aftercare yet</h2>
  <p>Aftercare is one of the seven things aikyam fellows work on. The first
     story about it has not been published.</p>
  <ul data-topics class="list-bare">…the other six topics…</ul>
</div>
```

⛔ **"No results" is not a page.** With 13 stories across 7 topics, a topic page can legally
hold one story or none, and most searches return nothing. Say what was looked for, say why if
the reason is knowable, and offer the seven topics — which on a site this size is the whole
map.
