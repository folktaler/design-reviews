# Footer

**The end of every page. Repeats the primary nav, then ruled link columns, then the standing ask, then a legal strip.**

## Markup

```html
<footer data-footer>
  <div data-footer-nav>
    <nav aria-label="Primary, repeated">
      <ul data-nav class="wrap wrap--wide">
        <li><a href="/fellows/">Fellows</a></li>
        <li><a href="/about/">About</a></li>
      </ul>
    </nav>
  </div>
  <div data-footer-cols class="wrap wrap--wide">
    <div data-footer-col>
      <h2>The fellowship</h2>
      <ul><li><a href="/fellows/">Fellows</a></li><li><a href="/about/">About Us</a></li></ul>
    </div>
    <div data-footer-col data-footer-ask>
      <h2>Know someone who should be a fellow?</h2>
      <p>There is no form and no deadline.</p>
      <a data-button href="/contact/">Tell us about them →</a>
    </div>
  </div>
  <div data-footer-legal class="wrap wrap--wide">
    <p>aikyam fellows — a project of aikyam, constituted not for profit.</p>
    <a data-footer-top href="#main">Back to top ↑</a>
  </div>
</footer>
```

## Rules

- The nav repeat is not optional: a reader who finishes a 2,000-word article is a long way from the header.
- Back-to-top is a link to `#main`, never a scripted scroll — a script moves the viewport but not focus.

## Styling

There is no JavaScript component to import. Style with the system's tokens and
attributes: the `data-*` landmark above is the styling hook AND the contract a
check reads. Never rename it to a class of convenience.
