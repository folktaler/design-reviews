# Portrait

**A photograph of a person. The caption names them; a portrait with no caption on a site about people is the page failing at its own job.**

## Markup

```html
<figure data-portrait>
  <div data-placeholder-media>Portrait of Sentinaro Shiu</div>
  <figcaption>Sentinaro with her Class 7 group in Kohima.
    <span data-portrait-credit>Photograph: Haneen Naseer</span>
  </figcaption>
</figure>
```

## Rules

- Round only for a face. Square is structure, round is a person — the only circle in the system.
- A credit is recommended: measured across five live profiles, not one photograph carries one.

## Styling

There is no JavaScript component to import. Style with the system's tokens and
attributes: the `data-*` landmark above is the styling hook AND the contract a
check reads. Never rename it to a class of convenience.
