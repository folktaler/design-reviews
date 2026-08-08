# Guardian-faithful — the governing principle

> **"Our design system should be Guardian faithful."** — Shemeer, 5 August 2026

⚠️ **This sentence did not travel when the system was rehomed here on 7 August
2026, and it is the most important thing in the repository.** Every token file
carries measurements; this is the rule that decides what a measurement is *for*.
Without it, the next page is designed by whoever builds it, the departures are
never named, and in six months nobody can tell which choices were reasoned and
which were improvised.

---

## The rule

**Guardian-faithful is the default, and every departure must be justified by a
named reader difference.**

That reverses the usual burden of proof. You do not argue for taking their
answer — you argue for *not* taking it.

### How to apply it

1. **Where the Guardian has a proven answer, take it.** Type scale, leading,
   paragraph rhythm, caption treatment, subhead cadence, article furniture,
   controls, radius, colour roles. Do not re-derive what they have settled.
2. **Change our side to fit**, rather than adapting their mechanism to our
   stack. The stack is ours to move; their arrangement is what is being adopted.
3. ⛔ **"Our stack is different" is not a reason.** Neither is preference.
4. **A departure needs a named reader difference, written in the file it
   affects.** If none applies, follow the Guardian.

---

## ⭐⭐ The reader differences — RE-DECIDED, and four of the five are gone

This is the part that had to change, and it changes almost everything about how
the rule now behaves. The inherited system listed five differences from the
Guardian's reader. **They belonged to catsofkochi, not to this site.**

| catsofkochi's difference | Still true here? |
|---|---|
| **Sunlight** — outdoors in strong light | ⛔ **No.** This reader is indoors, on a laptop, reading a 1,900-word profile. |
| **Android** — 82% India, overwhelmingly Android | ⚠️ **Unmeasured.** Asserted for that site from real analytics. Nothing equivalent has been read for aikyamfellows.org. |
| **Mobile data** — mid-range devices | ⚠️ **Unmeasured**, and downstream of the same unread analytics. |
| **A slow guide, not news** | ✅ **Yes**, and more so. Fewer entry points, longer dwell, no urgency at all. |
| **Stranding facts** — the freshness system | ⛔ **No.** There is no fact that decays here. A person's story does not expire. |

### What that means in practice

⭐ **The burden of proof got heavier, not lighter.** catsofkochi had five named
escape hatches. This site has **one confirmed difference** — *a slow read, not
news* — and two that are open questions rather than facts.

⛔ **So "our reader is different" is no longer a phrase anyone may use without
citing which difference and where it was measured.** Two of the five above are
marked unmeasured on purpose: the self-hosted Plausible at
analytics.aikyamhq.com would settle both, and until somebody reads it, neither
may be used to justify a departure. `typography.css` already flags the same gap
against the webfont decision, and `tokens/breakpoints.css` flags it against the
reference phone width.

⭐ **And one difference is genuinely new, and it is not on the Guardian's map at
all:**

| **Long proper nouns** | This site's prose is full of names the Guardian's corpus does not contain — Thiruvananthapuram, Bhattacharyya, Kalaripayattu, Kozhikode. Long unbreakable words force early line breaks, so **this site's own prose sets five to eight characters shorter than generic English at the same column width.** Measured 7 Aug 2026 on three corpora. |

That single difference is why `--af-measure` is 592px and not the 552px that
generic prose would suggest. **The instinct to narrow the column was right for
English and backwards for a page full of Malayalam and Bengali names.** It is
the clearest example of what a *named* reader difference looks like: specific,
measured, and it changes exactly one number.

---

## ⚠️ Where we cannot be faithful, say so rather than pretending equivalence

The Guardian's typefaces — Guardian Headline, Guardian Text Egyptian, Guardian
Text Sans — are proprietary and licensed to them alone. This system takes their
*arrangement* and their *ladder*, and the closest open face: **Noticia Text, SIL
OFL**.

⛔ **It is not the same thing and this system does not claim it is.** Noticia was
chosen over PT Serif, Zilla Slab, Roboto Slab, Bitter, Noto Serif and Source
Serif 4 on two properties — the largest x-height of the set (0.802 x/cap) and
lining numerals. Georgia was rejected for old-style figures.

---

## The audit against this principle

Inherited from the sibling system's README, with this site's re-decisions marked.
Each row is a departure from the *old* design, justified by faithfulness to the
Guardian — not the other way round.

| Was | Now | Why |
|---|---|---|
| Body sans, headings serif | **Body serif, captions sans** | Faithful. Inverts both the old system and the live site |
| System serif stack, no download | **Noticia Text, self-hosted** | ⭐ **RE-DECIDED HERE.** catsofkochi named *Android*; that difference is unmeasured for this site. It survives on a different argument — **a face change is a measure change**, and a system stack is three faces with three widths, so no single `--af-measure` is correct for all of them. On a site whose whole job is reading, that is the last thing to make per-visitor. |
| `line-height: 1.6` | **1.55** | ⭐ **RE-DECIDED.** catsofkochi set 1.5, naming *sunlight*. That reader is gone; 1.55 sits between their 1.5 and the sans-derived 1.6, for longer indoor reading. |
| Paragraph gap 24px | **Half the line height** | Faithful, no difference applies |
| Caption 15px | **16px** | ⭐ **RE-DECIDED, upward.** catsofkochi cut to 14px naming *sunlight*, and floored `--micro` at 13px. Both raised: 14px is the floor now and nothing goes below it, because the 13px case was a photo credit — the text this site most needs read. |
| Everything square | **Square + a pill for buttons + one circle** | Faithful to their semantic radius. ⭐ The circle is new and is not decoration: **square is structure, round is a person.** A fellow's portrait is the only circle in the system. |
| Standfirst in sans, grey | **Display face, quiet ink** | Faithful — measured 20px/500, headline face |
| Links underlined | **Ink, underlined in the brand** | ⭐ Faithful *mechanism*, opposite *cause*. On catsofkochi the link could not be amber because amber was too pale to be text. Here it cannot be indigo because indigo is too dark to be **distinguishable as** text — 15.72:1 against ink's 17.15:1. Same pattern, inverted reason. |
| No dark theme | **Dark theme ships** | ⭐⭐ **REVERSED.** The refusal was specific, not general: *"a phone on scheduled dark mode would serve the dark palette at exactly the wrong moment — outdoors, in sun."* The premise is gone, and the case **for** dark mode is strongest exactly here: long-form reading, at night, on a bright panel. |

**Still deliberately not faithful, with reasons on the file:** the pillar colour
system, a separate display face, a downloaded sans, and their JS-gated focus
rings (`:focus-visible` is the same intent with no script).

---

## ⭐ Two things are genuinely ours

These have no Guardian counterpart, so build them freely — this is where bespoke
is the right answer rather than a failure of the reuse rule.

1. **The two-part headline.** Every profile is titled `Name | Phrase`. Treating
   the pipe as a character costs a wrapping bug, an unstyleable name, and one
   typo nobody catches across 60 posts. The Guardian has no equivalent because
   its headlines are sentences.
2. **The attributed pull-quote.** On a page about two or three named people, an
   unattributed quote is ambiguous exactly where it matters — a student's line
   about a fellow reads as the fellow praising herself. `source` is required.
   A newspaper quoting a source in its own article does not have this problem.

⚠️ **catsofkochi's two were the checked-on stamp and the cat-line contract.
Neither travels.** See `REMOVED.md`.

---

## How to use this document

**Before you deviate from a Guardian answer, write one line in the file you are
editing:**

> *Departs from the Guardian's X. Named difference: **long proper nouns**.
> Measured 8 Aug 2026 at [where].*

If you cannot name one from the table above, you are not deviating — you are
preferring. Follow the Guardian.

⛔ **And if you find yourself naming *Android* or *mobile data*, stop and read
the analytics first.** Those two are inherited assertions about a different
site's audience, and this system has already shipped one decision built on an
unchecked inherited belief.
