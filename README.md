# Design reviews

Work in progress, published so it can be opened on a real device and reviewed by
people and models that are not on the machine it was built on. One folder per
project; folders are removed as each project finishes.

⚠️ **This is a review surface, not a source of truth.** The pages here are build
output. Editing them does nothing — each project's source lives elsewhere.

## Projects

- **[aikyamfellows/](aikyamfellows/)** — a Guardian-faithful design system for a
  not-for-profit that publishes profiles of people doing social-impact work.
  13 pages, 34 components, no build step and no JavaScript.
- **[opencollective/](opencollective/)** — the design system behind a fork of
  Open Collective, plus pages built on it. Tokens are copied from the platform's
  own `app.css` (Tailwind v4 variables) rather than matched by eye, and the Inter
  files are the ones it self-hosts. 6 pages, one shared `tokens.css`. `shape.html` is the
  leading page and the only generated one — built from a source document with
  `build-shape.py`; edit the source, not the HTML. `modules.html` carries the
  only JavaScript in the repo, a picker whose selection has since been overturned. Source lives in `~/opencollective/design-system/`.
- **[finishtheline/](finishtheline/)** — a screen system for a 60-second phone
  game built from Friends dialogue. 3 pages, one shared `tokens.css` and one
  shared `faces-ftl.css`, no build step. The four vendored Jelly UI controls are
  drawn as plain-CSS stand-ins throughout, marked ⌗ — loading the real bundle
  would make every frame depend on a remote script. The logo is four concepts
  awaiting a decision, not a chosen mark. Source lives in
  `~/finishtheline/design-system/ds/`.
- **[aikyam-space/](aikyam-space/)** — an Airbnb-faithful design system for
  aikyam.space, a community room in Fort Kochi running clubs (stitching,
  science, dance, more) for the neighbourhood. 5 pages, one shared `_kit.css`,
  no build step. Proposes replacing the homepage's diary post with a real
  schedule sourced from the live site's own `/clubs/` listings. Flags a live
  contradiction between the site's own pages (August guide vs `/clubs/` on
  whether Stitching runs Mondays) rather than silently picking one. Source
  lives in `~/aikyam-space-design-system/`.
