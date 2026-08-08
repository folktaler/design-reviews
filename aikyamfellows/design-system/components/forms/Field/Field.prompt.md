# Field

**One input with its label and hint. The label is ABOVE the input and is never a placeholder.**

## Markup

```html
<div data-field>
  <label for="e">Your email address</label>
  <p data-field-hint id="eh">We only use this to reply to you.</p>
  <input id="e" type="email" autocomplete="email" aria-describedby="eh">
</div>
<div data-field>
  <label for="m">Your message <span data-field-optional>(optional)</span></label>
  <textarea id="m"></textarea>
</div>
```

## Rules

- A hint goes above the input too — below it, the reader has already answered.
- Mark the OPTIONAL fields in words; an asterisk needs a legend and is announced as "star".

## Styling

There is no JavaScript component to import. Style with the system's tokens and
attributes: the `data-*` landmark above is the styling hook AND the contract a
check reads. Never rename it to a class of convenience.
