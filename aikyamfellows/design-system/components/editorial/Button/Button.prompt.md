# Button

**One primary button per page. Brand fill, paper text.**

## Markup

```html
<p><a data-button href="/contact/">Tell us about them</a>
<a data-button="quiet" href="/about/">Read more</a></p>
```

## Rules

- Both tap axes, always — width is the one nobody measures.

## Styling

There is no JavaScript component to import. Style with the system's tokens and
attributes: the `data-*` landmark above is the styling hook AND the contract a
check reads. Never rename it to a class of convenience.
