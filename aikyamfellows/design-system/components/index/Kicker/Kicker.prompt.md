# Kicker

**A small inverted label naming what KIND of thing follows. The publication speaking, rather than the writer.**

## Markup

```html
<p data-kicker>Index · every fellow</p>
<p data-kicker="quiet">More from Aparna R</p>
```

## Rules

- It is a `<p>` or `<span>`, never a heading — it would put a shouting entry in the document outline.
- Uppercase is allowed here and almost nowhere else. Two or three words, never a sentence.

## Styling

There is no JavaScript component to import. Style with the system's tokens and
attributes: the `data-*` landmark above is the styling hook AND the contract a
check reads. Never rename it to a class of convenience.
