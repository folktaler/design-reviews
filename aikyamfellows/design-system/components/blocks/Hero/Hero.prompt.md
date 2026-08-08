# Hero

**An inverted opening band. For pages that ASK for something, never for pages that are read.**

## Markup

```html
<div data-hero>
  <div class="wrap wrap--wide">
    <p data-kicker>Support the fellowship</p>
    <h1>We back people who have already started.</h1>
    <p data-hero-lede>Four foundations and a number of individuals pay for this.
      There is no advertising and nothing is sold.</p>
  </div>
</div>
```

## Rules

- ⛔ Putting this on a reading page is the fastest way to make this site look like a marketing site.
- At most one, and the H1 lives inside the band.

## Styling

There is no JavaScript component to import. Style with the system's tokens and
attributes: the `data-*` landmark above is the styling hook AND the contract a
check reads. Never rename it to a class of convenience.
