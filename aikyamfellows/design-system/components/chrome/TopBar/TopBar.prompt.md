# TopBar

**The strip above the masthead. Carries ONLY routes that are not reading routes — Support, compliance. Nothing here may also be in the main nav.**

## Markup

```html
<div data-topbar>
  <div data-topbar-inner class="wrap wrap--wide">
    <ul data-topbar-links>
      <li><a href="/support/">Support us</a></li>
      <li><a href="/proudly-not-for-profit/">Proudly Not for Profit</a></li>
    </ul>
  </div>
</div>
```

## Rules

- If everything it would carry is already in the nav or the footer, omit it entirely.

## Styling

There is no JavaScript component to import. Style with the system's tokens and
attributes: the `data-*` landmark above is the styling hook AND the contract a
check reads. Never rename it to a class of convenience.
