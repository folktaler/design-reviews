# Section

**A heavy 3px rule that turns one long scroll into a page with parts.**

## Markup

```html
<div data-section>
  <h2>What we can count</h2>
  <p>Four numbers, each one a link.</p>
</div>
```

## Rules

- 3px ink, not the hairline: the hairline is decoration and may never be the only thing separating two kinds of content.

## Styling

There is no JavaScript component to import. Style with the system's tokens and
attributes: the `data-*` landmark above is the styling hook AND the contract a
check reads. Never rename it to a class of convenience.
