# Card

**One entry in an index. The person\u2019s name leads, the story title follows, the face is on the right.**

## Markup

```html
<ul data-cards>
  <li data-card>
    <div data-card-inner>
      <div data-card-text>
        <a data-card-name href="/x/">Jasentha Joy</a>
        <h3 data-card-title><a href="/x/">Pickles and Chuckles</a></h3>
        <p data-card-meta>Livelihood · 5 May 2026</p>
      </div>
      <div data-card-face aria-hidden="true"></div>
    </div>
  </li>
  <li data-card>
    <div data-card-inner>
      <div data-card-text>
        <h3 data-card-title><a href="/y/">Ramya Sundararajan</a></h3>
        <p data-card-meta>Aftercare · 3 December 2025</p>
      </div>
      <div data-card-face aria-hidden="true"></div>
    </div>
  </li>
</ul>
```

## Rules

- ⛔ A card may NOT have its own background — the grid draws its rules with a shadow on each cell and a fill covers them.
- No editorial phrase means the NAME is the title, with no kicker above it. Never print the name twice.

## Styling

There is no JavaScript component to import. Style with the system's tokens and
attributes: the `data-*` landmark above is the styling hook AND the contract a
check reads. Never rename it to a class of convenience.
