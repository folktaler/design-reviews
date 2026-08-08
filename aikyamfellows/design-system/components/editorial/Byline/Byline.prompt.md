# Byline

**Who wrote it and when. Required on every profile — this site publishes about real, named, living people.**

## Markup

```html
<p data-byline>
  By <a data-byline-author href="/author/aparna/">Aparna R</a>
  · <time data-byline-date datetime="2026-08-03">3 August 2026</time>
</p>
```

## Rules

- The author is a link because an author has an archive. The DATE is not a link.

## Styling

There is no JavaScript component to import. Style with the system's tokens and
attributes: the `data-*` landmark above is the styling hook AND the contract a
check reads. Never rename it to a class of convenience.
