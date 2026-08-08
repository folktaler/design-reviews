# Figure

**A counted claim on an impact page. ⛔ The value is an `<a>` — a figure with no destination CANNOT be built.**

## Markup

```html
<ul data-figures class="list-bare">
  <li data-figure>
    <a data-figure-value href="/fellows/">6</a>
    <span data-figure-label>fellows supported since 2023</span>
    <time data-figure-asof datetime="2026-08-07">as of 7 August 2026</time>
  </li>
  <li data-figure>
    <a data-figure-value href="/fellows/">7</a>
    <span data-figure-label>fields our fellows work in</span>
    <time data-figure-asof datetime="2026-08-07">as of 7 August 2026</time>
  </li>
</ul>
```

## Rules

- Every figure links to the list it counts, and carries the date it was true.
- A count you can open is a fact. A count you cannot open is a claim in 44px type.

## Styling

There is no JavaScript component to import. Style with the system's tokens and
attributes: the `data-*` landmark above is the styling hook AND the contract a
check reads. Never rename it to a class of convenience.
