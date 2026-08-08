# Search

**A search field and its result count. On a small archive most searches return nothing, so build the empty state first.**

## Markup

```html
<div data-search>
  <label for="q">Search stories</label>
  <input id="q" type="search" placeholder="a name, or a place">
  <p data-search-count role="status">3 stories match &ldquo;listening&rdquo;</p>
</div>
```

## Rules

- The count is a live region and echoes the query — a number with no echo is unverifiable by the reader.

## Styling

There is no JavaScript component to import. Style with the system's tokens and
attributes: the `data-*` landmark above is the styling hook AND the contract a
check reads. Never rename it to a class of convenience.
