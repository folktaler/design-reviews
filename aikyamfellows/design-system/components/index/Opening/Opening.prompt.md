# Opening

**The home page\u2019s first screen: the strapline on one side, a fellow\u2019s face and words on the other.**

## Markup

```html
<div data-opening>
  <div>
    <h1>Inspiring Action</h1>
    <p data-standfirst>aikyam fellows inspire actions on important &amp; urgent
      needs of the planet and underserved communities.</p>
  </div>
  <aside data-opening-aside>
    <div data-opening-face aria-hidden="true"></div>
    <blockquote data-opening-quote>
      <p>&ldquo;I feel very understood when I talk to you.&rdquo;</p>
      <cite data-opening-source>A Class 7 student, to Sentinaro Shiu</cite>
    </blockquote>
  </aside>
</div>
```

## Rules

- The strapline keeps the reading measure. Do not widen it because there is room — the measure is a property of the face.
- The quote is evidence for the claim beside it, so it must be attributed and the attribution must be honest.

## Styling

There is no JavaScript component to import. Style with the system's tokens and
attributes: the `data-*` landmark above is the styling hook AND the contract a
check reads. Never rename it to a class of convenience.
