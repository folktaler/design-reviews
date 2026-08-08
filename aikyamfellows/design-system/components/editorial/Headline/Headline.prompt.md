# Headline

**The H1 of a profile. Every title on this site is `Name | Phrase`, and the pipe is a STRUCTURE, not a character.**

## Markup

```html
<h1 data-headline>
  <span data-headline-name>Sentinaro Shiu</span>
  <span data-headline-phrase>A Heart that Listens</span>
</h1>
```

## Rules

- Split the CMS title on `|` and on nothing else. NEVER on `:` — one live title has the phrase first and the name second.
- No pipe means the whole string is the name and the phrase is empty, which removes itself. Never invent a subtitle.

## Styling

There is no JavaScript component to import. Style with the system's tokens and
attributes: the `data-*` landmark above is the styling hook AND the contract a
check reads. Never rename it to a class of convenience.
