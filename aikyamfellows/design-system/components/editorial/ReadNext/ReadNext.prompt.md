# ReadNext

**Three more fellows at the end of an article, with faces. The reader is deciding, and a face is what they decide about.**

## Markup

```html
<section data-read-next aria-labelledby="rn">
  <h2 id="rn">More fellows</h2>
  <ul>
    <li>
      <div data-read-next-face aria-hidden="true"></div>
      <span data-card-name>Rahitha Krishnadas</span>
      <h3><a href="/rahitha/">Beating Barriers</a></h3>
      <p>She was told the Chenda wasn&rsquo;t for girls.<br>Aparna R · 21 July 2026</p>
    </li>
    <li>
      <div data-read-next-face aria-hidden="true"></div>
      <span data-card-name>Anson Kurumbathuruth</span>
      <h3><a href="/anson/">Stepping Forward</a></h3>
      <p>He first knew Chavittu Nadakam as the sound of home.<br>Aparna R · 20 July 2026</p>
    </li>
  </ul>
</section>
```

## Rules

- The whole cell is the tap target, not the words. One overlay per cell — two and the later one wins.

## Styling

There is no JavaScript component to import. Style with the system's tokens and
attributes: the `data-*` landmark above is the styling hook AND the contract a
check reads. Never rename it to a class of convenience.
