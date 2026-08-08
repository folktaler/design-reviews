# Breadcrumb

**A page below the top level. The last crumb is the page you are on, so it is NOT a link.**

## Markup

```html
<nav data-breadcrumb aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/tag/education/">Education</a></li>
    <li aria-current="page">Sentinaro Shiu</li>
  </ol>
</nav>
```

## Rules

- The separator is drawn with CSS, never typed — a `/` in the markup is announced as "slash" on every hop.

## Styling

There is no JavaScript component to import. Style with the system's tokens and
attributes: the `data-*` landmark above is the styling hook AND the contract a
check reads. Never rename it to a class of convenience.
