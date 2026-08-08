# TopicTag

**One of seven subjects. A navigational primitive, so it is built like a control — 52px on both axes.**

## Markup

```html
<p><a data-topic href="/tag/education/">Education</a>
<a data-topic href="/tag/mental-health/">Mental Health</a></p>
```

## Rules

- Topics are encoded in WORDS, never colour. Seven hues cannot all clear 4.5:1, and colour does not encode to a first-time reader.

## Styling

There is no JavaScript component to import. Style with the system's tokens and
attributes: the `data-*` landmark above is the styling hook AND the contract a
check reads. Never rename it to a class of convenience.
