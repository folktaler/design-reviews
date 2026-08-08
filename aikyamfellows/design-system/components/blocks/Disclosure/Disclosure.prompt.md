# Disclosure

**A stack of questions and answers that needs no JavaScript.**

## Markup

```html
<div data-faq>
  <details open>
    <summary>Do partners choose the fellows?</summary>
    <div><p>No. Fellows are selected by aikyam.</p></div>
  </details>
  <details>
    <summary>What we cannot show yet</summary>
    <div><p>Whether a fellow&rsquo;s work outlasted the fellowship.</p></div>
  </details>
</div>
```

## Rules

- ⛔ No `name` attribute — never an accordion. A reader comparing two answers should not have one close the other.
- A closed `<details>` is invisible to in-page search in most engines.

## Styling

There is no JavaScript component to import. Style with the system's tokens and
attributes: the `data-*` landmark above is the styling hook AND the contract a
check reads. Never rename it to a class of convenience.
