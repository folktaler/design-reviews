# FieldError

**A field that failed validation. This palette has NO red, and the pattern works without one.**

## Markup

```html
<div data-field data-invalid>
  <label for="e2">Your email address</label>
  <p data-field-error id="er"><span class="visually-hidden">Error:</span>
    Enter an email address in the format name@example.com</p>
  <input id="e2" type="email" aria-invalid="true" aria-describedby="er">
</div>
```

## Rules

- ⛔ The message goes ABOVE the input — below it, it is behind the on-screen keyboard the moment the reader focuses to fix it.
- The word "Error:" is in the MARKUP, not in CSS — generated content is not reliably announced.

## Styling

There is no JavaScript component to import. Style with the system's tokens and
attributes: the `data-*` landmark above is the styling hook AND the contract a
check reads. Never rename it to a class of convenience.
