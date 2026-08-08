# Rail

**A section of an index: its name in a left column, the content grid beside it. The heading stays on screen for the whole list.**

## Markup

```html
<div data-rail>
  <h2 data-rail-label>Newest first</h2>
  <ul data-cards>
    <li data-card>
      <div data-card-inner>
        <div data-card-text>
          <a data-card-name href="/sentinaro/">Sentinaro Shiu</a>
          <h3 data-card-title><a href="/sentinaro/">A Heart that Listens</a></h3>
          <p data-card-meta>Education · Aparna R · 3 August 2026</p>
        </div>
        <div data-card-face aria-hidden="true"></div>
      </div>
    </li>
    <li data-card>
      <div data-card-inner>
        <div data-card-text>
          <a data-card-name href="/rahul/">Rahul Thomas</a>
          <h3 data-card-title><a href="/rahul/">Theatre Saved Me</a></h3>
          <p data-card-meta>Art &amp; Culture · Aparna R · 25 July 2026</p>
        </div>
        <div data-card-face aria-hidden="true"></div>
      </div>
    </li>
  </ul>
</div>
```

## Rules

- A heading ABOVE a list is forgotten by the fourth row. Beside it, every row is read in context.
- Collapses to a normal heading below 48rem — there is no clever version of a 220px rail on a phone.

## Styling

There is no JavaScript component to import. Style with the system's tokens and
attributes: the `data-*` landmark above is the styling hook AND the contract a
check reads. Never rename it to a class of convenience.
