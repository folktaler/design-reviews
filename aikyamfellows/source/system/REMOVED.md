# What was stripped, and why

The Guardian system arrived complete, built for catsofkochi.com. The handover named four
things that "should not travel". Judging the rest the same way removed nine more, kept one
that looked like it should go, and rebuilt two.

> ⭐ **The test applied to every component:** does this exist because *reading* needs it, or
> because *deciding whether to walk somewhere* needs it? Everything in the second column is a
> travel product's editorial contract wearing a design system's clothes.

---

## Removed — named by the handover

| Component | Why it does not travel |
|---|---|
| `CatLine`, `CatTip` | A cat persona was catsofkochi's byline. This site has **human authors** with archive pages — Aparna R, Haneen Naseer. A voice that is not accountable is the opposite of what a profile needs. Replaced by `data-byline`. |
| `FactsStrip`, `FactsRow` | Opening times, fares, ferry departures. A profile has no facts strip; it has a byline and a date, and those are one line, not a table. |
| `CheckedStamp` (`data-checked-on`) | "We verified this on 3 Aug" is a promise about a **fact that decays**. A person's story does not decay, and stamping a date on it says the opposite of what it means. |
| `NotNow` | "Closed on Fridays — go here instead." There is no closing time on a profile and nothing to redirect to. |

## Removed — judged the same way

| Component | Why |
|---|---|
| `PlanRow`, `PlanDay` | Itinerary machinery. Named by the handover as the example of something more catsofkochi-shaped than it looks; it is a paid product's data model. |
| `Unchecked`, `TrustCard`, `Highlights`, `ThingsToKnow` | The registry family. All four exist to say *how confident we are in a fact*. This site publishes **writing**, where confidence is carried by the byline, not by a badge. |
| `Badge` | A generic label component whose only two uses were registry states. |
| `PlaceCard` | Answered "should I walk there" — distance, opening time, price. Replaced by `data-fellow-card`, which answers "is this a person I want to read about". |
| `ActionBar` | A sticky bar that advances a decision. A reading page has no decision to advance, and a sticky bar on a 2,000-word article eats the bottom of every screen for nothing. |
| `Icon` + the parked cat icon set | `paw.svg`, `cat-pin.svg`, `cat-sitting.svg`. An icon set is a vocabulary of the nouns a product names; none of these nouns exist here. **No icon set replaces it yet** — this system ships none, deliberately, until there is a screen that needs one. |
| `assets/photos/water-metro-jetty.jpg` | A photograph of a jetty in Kochi. |
| The duplicate `PullQuote` | It existed twice — `components/prose/` and `components/editorial/`. One survives. |

## Kept, against first appearances

| Component | Why it stays |
|---|---|
| `Correction` | It **looks** like registry machinery and it is not. A site publishing profiles of real, named, living people needs a way to say "we got this wrong", and needs it **more** than a travel guide does, because the cost of being wrong lands on the person written about. Re-scoped from "this fact changed" to "we published something untrue about someone". |
| `ReadNext` | The live site already ends every profile with one. |
| `Standfirst`, `PullQuote`, `Divider`, `Button` | Reading primitives. Unchanged in role, restyled. |
| `Photograph` | The component survives; **its guidance was replaced entirely** — the old file is about places. See `guidelines/photographs.md`. |
| `NewsletterSignup` | Survives as a shape. Every string in it was rewritten; see `guidelines/voice.md`. |

## Added, for this site

| Component | Why catsofkochi never needed it |
|---|---|
| `data-byline` | Recurring human authors with archive pages. |
| `data-topic` | Seven topics that are how a reader finds the other eleven stories. catsofkochi's categories were places, and a place is a page, not a filter. |
| `data-headline-name` / `data-headline-phrase` | Every title on this site is `Name \| Phrase`. Treating the pipe as a character costs a wrapping bug, an unstyleable name, and one typo nobody catches across 60 posts. |
| `data-pullquote-source` | The quotes on this site are **people speaking about a person**. Unattributed, a student's line reads as the fellow praising herself. |
| `data-portrait` | People, not places — and caption and credit as **required** slots. |
| `data-fellow-card` | Replaces `PlaceCard`. |
| `.skip-link` | A 2,000-word page with nav, tag and byline above it. Always forgotten, so it lives in the base layer. |

---

## ⚠️ What still needs a person, not a designer

1. ⛔ **The tag vocabulary is broken in the CMS.** `/tag/arts-culture/` and
   `/tag/art-and-culture/` are both live and both linked from the homepage;
   `/tag/mental-health-2/` is a Ghost duplicate-slug artefact. **The topic tag component
   means nothing until one topic has one slug** — today, two readers clicking two tags that
   say the same words get two different, incomplete lists, and neither looks wrong.
2. **Standfirsts are boilerplate.** At least one profile uses the site tagline as its
   subtitle. That is an editing job, not a CSS job.
3. **Portrait captions and credits do not exist yet** on published posts. The component
   requires them; the archive does not have them.
4. **Two headlines will not split.** The Bauls post uses a colon with the name second;
   "Rahul Thomas| Theatre Saved Me" is missing the space before its pipe.
