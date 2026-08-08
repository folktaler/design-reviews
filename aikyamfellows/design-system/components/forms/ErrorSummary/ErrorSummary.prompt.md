# ErrorSummary

**The component that does the real work on a no-red form: every failure listed at the top, each a link to its field.**

## Markup

```html
<div data-error-summary role="alert" tabindex="-1">
  <h2>There is a problem</h2>
  <ul>
    <li><a href="#e2">Enter an email address in the format name@example.com</a></li>
  </ul>
</div>
```

## Rules

- ⛔ It must take focus on submit, or a keyboard user is told nothing went wrong.
- Items in the same order as the fields, not the order the validator produced them.

## Styling

There is no JavaScript component to import. Style with the system's tokens and
attributes: the `data-*` landmark above is the styling hook AND the contract a
check reads. Never rename it to a class of convenience.
