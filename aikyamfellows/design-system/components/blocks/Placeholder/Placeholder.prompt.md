# Placeholder

**Something the owner has to supply, or an image that does not exist yet. Quiet, never an alarm.**

## Markup

```html
<div data-placeholder-media>Portrait of Sentinaro Shiu</div>
<div data-slot><b>An email address is needed.</b> The live site publishes none
  anywhere; inventing one would ship a fabricated address into production.</div>
```

## Rules

- The media placeholder carries the aspect ratio the real image will have, so the page\u2019s rhythm is honest.
- ⛔ A page carrying a slot is not ready. Grep `data-slot` before calling anything finished.

## Styling

There is no JavaScript component to import. Style with the system's tokens and
attributes: the `data-*` landmark above is the styling hook AND the contract a
check reads. Never rename it to a class of convenience.
