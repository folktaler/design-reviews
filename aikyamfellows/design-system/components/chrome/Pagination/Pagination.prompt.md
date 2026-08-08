# Pagination

**A paginated index. Shows the count, because on a small archive "Page 1 of 6" is reassuring rather than daunting.**

## Markup

```html
<nav data-pagination aria-label="Pagination">
  <a href="?page=1" aria-current="page">1</a>
  <a href="?page=2">2</a>
  <a href="?page=2">Next</a>
  <span data-pagination-count>Page 1 of 6</span>
</nav>
```

## Rules

- A disabled control is REMOVED from the markup, not greyed out — greyed still takes focus and invites a dead tap.

## Styling

There is no JavaScript component to import. Style with the system's tokens and
attributes: the `data-*` landmark above is the styling hook AND the contract a
check reads. Never rename it to a class of convenience.
