# DocumentIndex

**A compliance page. The reader is working through a checklist, not browsing.**

## Markup

```html
<ul data-docs>
  <li data-doc><a href="#">Certificate OF Incorporation T4G.pdf
    <span data-doc-type>PDF · opens in Google Drive</span></a></li>
  <li data-doc><a href="#">80G Approval certificate.pdf
    <span data-doc-type>PDF · opens in Google Drive</span></a></li>
</ul>
```

## Rules

- ⛔ Use the file\u2019s OWN name verbatim, including the extension and any odd capitalisation — a tidied name does not match their checklist.
- Announce the format in the link, not with an icon: metered data, and screen readers.

## Styling

There is no JavaScript component to import. Style with the system's tokens and
attributes: the `data-*` landmark above is the styling hook AND the contract a
check reads. Never rename it to a class of convenience.
