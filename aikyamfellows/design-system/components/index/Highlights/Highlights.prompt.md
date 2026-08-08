# Highlights

**The light band under the top strip: two or three fellows with faces, above the fold on every page.**

## Markup

```html
<div data-highlights>
  <ul class="wrap wrap--wide">
    <li><div data-highlight-inner>
      <div data-highlight-text>
        <a data-highlight-name href="/a/">Sentinaro Shiu</a>
        <p data-highlight-title><a href="/a/">A Heart that Listens</a></p>
      </div>
      <div data-highlight-face aria-hidden="true"></div>
    </div></li>
    <li><div data-highlight-inner>
      <div data-highlight-text>
        <a data-highlight-name href="/b/">Rahul Thomas</a>
        <p data-highlight-title><a href="/b/">Theatre Saved Me</a></p>
      </div>
      <div data-highlight-face aria-hidden="true"></div>
    </div></li>
  </ul>
</div>
```

## Rules

- ⛔ Not a carousel. Nothing in this system moves on its own.
- Scrolls sideways on a phone — stacked it cost 314px and pushed the story off the screen.

## Styling

There is no JavaScript component to import. Style with the system's tokens and
attributes: the `data-*` landmark above is the styling hook AND the contract a
check reads. Never rename it to a class of convenience.
