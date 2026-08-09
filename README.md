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
- **[catsofkochi/](catsofkochi/)** — an Airbnb-faithful design system for a travel
  guide to Fort Kochi and Mattancherry. 13 pages, one shared faces file per
  font family (`faces-figtree.css`/`faces-noticia-text.css`), no build step and
  no JavaScript. Labelled `catsofkochi-airbnb-design-system-2026-08-09` — a
  different system from the earlier Guardian-era `guardian-design-system-v1`.
- **[opencollective/](opencollective/)** — the design system behind a fork of
  Open Collective, plus pages built on it. Tokens are copied from the platform's
  own `app.css` (Tailwind v4 variables) rather than matched by eye, and the Inter
  files are the ones it self-hosts. 5 pages, one shared `tokens.css`, no build
  step. `modules.html` carries the only JavaScript in the repo — a checkbox
  picker for choosing which parts of the product to keep. Source lives in `~/opencollective/design-system/`.
- **[finishtheline/](finishtheline/)** — a screen system for a 60-second phone
  game built from Friends dialogue. 3 pages, one shared `tokens.css` and one
  shared `faces-ftl.css`, no build step. The four vendored Jelly UI controls are
  drawn as plain-CSS stand-ins throughout, marked ⌗ — loading the real bundle
  would make every frame depend on a remote script. The logo is four concepts
  awaiting a decision, not a chosen mark. Source lives in
  `~/finishtheline/design-system/ds/`.
