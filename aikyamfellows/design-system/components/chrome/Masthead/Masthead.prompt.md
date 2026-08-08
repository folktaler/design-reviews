# Masthead

**The dark band at the top of every page: wordmark, primary nav, topic strip. Exactly one per page.**

## Markup

```html
<header data-masthead>
  <div data-masthead-inner class="wrap wrap--wide">
    <a data-wordmark href="/">aikyam fellows</a>
    <nav aria-label="Primary">
      <ul data-nav>
        <li><a href="/fellows/" aria-current="page">Fellows</a></li>
        <li><a href="/partners/">Partners</a></li>
        <li><a href="/about/">About</a></li>
        <li><a href="/contact/">Contact</a></li>
      </ul>
    </nav>
  </div>
  <nav data-subnav aria-label="Topics">
    <ul class="wrap wrap--wide">
      <li><a href="/tag/art-and-culture/">Art &amp; Culture</a></li>
      <li><a href="/tag/education/">Education</a></li>
      <li><a href="/tag/design/">Design</a></li>
    </ul>
  </nav>
</header>
```

## Rules

- The nav is SERIF at heading size, not UI sans — that is what makes it a masthead rather than an app header.
- The first nav item sits flush to the column edge; every other item is bounded by a hairline.
- Mark the current section with `aria-current` — it is both the accessibility contract and the styling hook.

## Styling

There is no JavaScript component to import. Style with the system's tokens and
attributes: the `data-*` landmark above is the styling hook AND the contract a
check reads. Never rename it to a class of convenience.
