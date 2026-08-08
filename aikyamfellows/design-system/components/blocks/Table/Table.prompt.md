# Table

**Any table. ⛔ Unwrapped, a four-column table pushes the whole document sideways on a phone.**

## Markup

```html
<div data-table role="region" tabindex="0" aria-labelledby="cap">
  <table>
    <caption id="cap">Fellows by year</caption>
    <thead><tr><th scope="col">Year</th><th scope="col">Fellows</th><th scope="col">Stories</th></tr></thead>
    <tbody>
      <tr><td>2023</td><td>2</td><td>0</td></tr>
      <tr><td>2026</td><td>3</td><td>9</td></tr>
    </tbody>
  </table>
</div>
```

## Rules

- The wrapper needs `tabindex="0"` or the scroll region is unreachable by keyboard, and a name via `aria-labelledby`.
- Figures in a table are tabular — the one place in this system where numbers stack vertically.

## Styling

There is no JavaScript component to import. Style with the system's tokens and
attributes: the `data-*` landmark above is the styling hook AND the contract a
check reads. Never rename it to a class of convenience.
