# Verify before you push

Run this from `~/aikyam-space-design-system/ui_kits/`. Every line prints the expected
value beside the real one, so a stale working copy is obvious in one screen instead of
being discovered after the push.

⚠️ **This file exists because of a real miss.** On 9 Aug 2026 a push went out from a
snapshot taken before eight defect fixes landed. The source on disk was correct and the
deployed pages were not, and it cost a full review cycle to find out. **Diff what you are
about to push, not what you remember writing.**

```sh
# --- the eight fixes from the tester pass. Every one must print 1 or more. ---
printf '%-46s %s\n' \
 "data-today wired in homepage"      "$(grep -c 'li data-today' homepage/index.html)" \
 "week starts Today not Mon 10"      "$(grep -c 'week__day">Today<' homepage/index.html)" \
 ".card row overlay"                 "$(grep -c 'card h3 a::after' _kit.css)" \
 ".cards li positioned"              "$(grep -c 'cards li{position:relative}' _kit.css)" \
 "secondary button border"           "$(grep -c 'border:1px solid var(--border-control)' _kit.css)" \
 "way-in button border"              "$(grep -c 'border:1px solid var(--action-way-in-text)' _kit.css)" \
 "foot-cols zoom guard"              "$(grep -c 'minmax(min(15rem,100%)' _kit.css)" \
 "header wraps at zoom"              "$(grep -c 'site-head__in{display:flex;flex-wrap:wrap' _kit.css)" \
 "week track can shrink"             "$(grep -c 'minmax(0,5.5rem)' _kit.css)" \
 "contact Send is a button"          "$(grep -c 'button type="submit"' contact-us/index.html)" \
 "footer links have width floor"     "$(grep -c 'min-inline-size:var(--tap-comfortable);font-size:var(--type-small)' _kit.css)" \
 "foot-note measure"                 "$(grep -c 'foot-note{margin-block-start:var(--space-7);max-width:22rem' _kit.css)"

# --- must print 0: the wrong autofill hint, and the clubs contradiction ---
printf '%-46s %s\n' \
 "no stale autocomplete=email"       "$(grep -c 'autocomplete="email"' contact-us/index.html)" \
 "no open/closed adjacency"          "$(grep -c 'Every club is closed on Mondays.</p>' clubs/index.html)"

# --- CSS comment integrity: the two counts must be EQUAL, and the greps silent ---
echo "open $(grep -o '/\*' _kit.css | wc -l)  close $(grep -o '\*/' _kit.css | wc -l)"
grep -n '^\s*\*.*/\*' _kit.css ; grep -n '\*/.*\*/' _kit.css

# --- and the one that catches a stale push directly ---
for f in _kit.css index.html homepage/index.html clubs/index.html \
         contact-us/index.html nav_footer/index.html system/index.html homepage_v1/index.html; do
  live=$(curl -sL "https://design.folktaler.com/aikyam-space/$f" | shasum | cut -c1-8)
  disk=$(shasum "$f" | cut -c1-8)
  [ "$live" = "$disk" ] && s="same" || s="DIFFERENT"
  printf '%-30s disk %s  live %s  %s\n' "$f" "$disk" "$live" "$s"
done
```

⭐ **The last block is the one that matters.** Everything above it checks that the source
is right; only that one checks that what is *served* matches it. `curl -sL` — without
`-L` the custom domain 301s and you compare a redirect stub to a page.

## After the push, in a browser

1. **No red banner** on any page. The `#css-guard` block is hidden by one rule in
   `_kit.css`; if the stylesheet 404s, every page says so in red at the top. Tester has
   confirmed this fires in both directions.
2. **Paste the 12-assertion battery from `SKILL.md`** into the console at 390px and again
   at 1280px. Every line must read `PASS`.
3. ⛔ **Then break one on purpose** and confirm it goes red — see the three-probe rule in
   `SKILL.md`. A gate that has never failed is not known to work, and a fault that lands
   on the threshold proves nothing.
