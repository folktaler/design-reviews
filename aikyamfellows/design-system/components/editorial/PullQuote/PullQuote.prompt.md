# PullQuote

**Words lifted out of the article and repeated to make a reader stop. Editorial, not structural.**

## Markup

```html
<blockquote data-pullquote>
  <p>They&rsquo;re all a big part of who I am</p>
  <cite data-pullquote-source>Sentinaro Shiu</cite>
</blockquote>
```

## Rules

- ⛔ The source is what makes it honest. Unattributed, a student\u2019s line about a fellow reads as the fellow praising herself.
- Do NOT confuse with `<blockquote>`: that is someone else speaking, at body size. This is a designer\u2019s device.

## Styling

There is no JavaScript component to import. Style with the system's tokens and
attributes: the `data-*` landmark above is the styling hook AND the contract a
check reads. Never rename it to a class of convenience.
