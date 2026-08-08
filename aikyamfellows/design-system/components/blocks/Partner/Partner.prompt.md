# Partner

**A named funder, with its mark beside its sentence rather than instead of it.**

## Markup

```html
<div data-partner>
  <a data-partner-logo href="https://example.org/" aria-hidden="true" tabindex="-1">
    <span>Samagata Foundation</span>
  </a>
  <div>
    <h3 data-partner-name><a href="https://example.org/">Samagata Foundation</a></h3>
    <p data-partner-what>Supports projects and ideas that bring value to society.</p>
  </div>
</div>
```

## Rules

- ⛔ No size tiering. Tiering by contribution turns a partner page into a sponsor board.
- Fixed-height box with `object-fit: contain` — four logos arrive at four aspect ratios and will not line up on their own.

## Styling

There is no JavaScript component to import. Style with the system's tokens and
attributes: the `data-*` landmark above is the styling hook AND the contract a
check reads. Never rename it to a class of convenience.
