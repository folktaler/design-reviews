# EmptyState

**A zero-result list. On a small archive this is a normal page, not an edge case.**

## Markup

```html
<div data-empty>
  <h2>No stories in Aftercare yet</h2>
  <p>Aftercare is one of the seven things aikyam fellows work on. The first
    story about it has not been published.</p>
  <ul data-topics class="list-bare" style="display:flex;gap:.5rem;flex-wrap:wrap">
    <li><a data-topic href="/tag/education/">Education</a></li>
    <li><a data-topic href="/tag/design/">Design</a></li>
  </ul>
</div>
```

## Rules

- ⛔ "No results" is not a page. Say what was looked for, why if knowable, and offer a route onward.

## Styling

There is no JavaScript component to import. Style with the system's tokens and
attributes: the `data-*` landmark above is the styling hook AND the contract a
check reads. Never rename it to a class of convenience.
