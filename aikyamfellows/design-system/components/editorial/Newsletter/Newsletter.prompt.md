# Newsletter

**The signup. Not a commerce CTA — nothing is scarce and nothing happens if the reader says no.**

## Markup

```html
<section data-newsletter>
  <h2>Stories, when there are stories</h2>
  <p>We publish a few times a month.</p>
  <form data-newsletter-form>
    <label for="nl">Your email address</label>
    <input id="nl" type="email" autocomplete="email">
    <button data-button type="submit">Subscribe</button>
  </form>
  <p data-newsletter-privacy>We use it to send you the stories and nothing else.</p>
</section>
```

## Rules

- No urgency, no counter, no "join 1,400 readers", no second ask after a dismissal.
- The privacy line is part of the component, next to the field that collects the address.

## Styling

There is no JavaScript component to import. Style with the system's tokens and
attributes: the `data-*` landmark above is the styling hook AND the contract a
check reads. Never rename it to a class of convenience.
