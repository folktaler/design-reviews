# The words

UX writing is design here, not decoration. Every string a screen says to a person is part of
this system and is versioned with it.

Target reading level: **grade 8–10**, strictest on anything a first-time reader meets — the
newsletter block, an error, a correction.

---

## ⛔ The defect this file exists to prevent

Measured on the live aikyamfellows.org, 7 August 2026. The newsletter signup block's heading,
shown to a reader who has typed nothing, reads:

> Great! Check your inbox and click the link.

That is the **success** state showing in the **resting** state. It tells a first-time reader
to go and look for an email that was never sent, and it is invisible as a bug because it is a
perfectly well-written sentence — just the wrong one, in the wrong place.

⭐ **A component with states needs all of its states written down in one place, by one
person, at one time.** Written separately, they drift; and the one that drifts is always the
one nobody has a reason to look at.

---

## Newsletter — all four states

| State | Heading | Body | Control |
|---|---|---|---|
| **Resting** | Get new stories by email | We'll email you when we publish a new profile. Nothing else. | `Subscribe` |
| **Sent** | Check your inbox | We've sent a link to **{email}**. Click it and you're on the list. | `Send it again` |
| **Bad address** | That address didn't work | Check for a typo and try again. | `Subscribe` |
| **Already on the list** | You're already subscribed | Nothing to do — the next story will reach you. | *(no control)* |

**Privacy line, always visible, same size as the body of the block:**

> We use your address only to send you these stories. Unsubscribe from any email.

⛔ **What is banned in this block**, and why each one:

- **A subscriber count** ("join 1,400 readers"). It is social pressure, and on a
  not-for-profit that profiles people who are not famous, it makes the reader the product.
- **Urgency of any kind.** Nothing here is scarce. There is no deadline.
- **A second ask after a dismissal.** One no is a no.
- **"Free"**. Nothing here costs anything, so saying "free" invents a price to waive.

---

## Refusals and dead ends

When something cannot be done, the sentence has three parts and no apology loop: **what
happened, why, and the one thing the reader can do next.**

| Situation | Say |
|---|---|
| Search found nothing | No stories match "{query}". Try a topic instead — Education, Livelihood, Mental Health. |
| A tag page is empty | There are no stories under this topic yet. |
| A page is gone | This page has moved or been taken down. The full list of fellows is here. |
| Something broke | Something went wrong at our end. Try again in a moment — nothing you did caused it. |

⛔ **Never "Oops!", never "Uh-oh", never an exclamation mark in an error.** The reader is
looking for a person's story; a cheerful failure reads as not caring.

---

## Writing about the fellows

⭐ **The single hardest rule, and the reason this section exists.** This site profiles real,
living, mostly non-public people, often in their own communities, sometimes about mental
health, aftercare and justice. The friendly phrasing is often the dangerous phrasing.

- **Name the person the way they name themselves.** The headline convention is
  `Name | Phrase`; the name half is theirs and is never shortened for fit. If it does not
  fit, the phrase gets shorter.
- ⛔ **Do not write on their behalf.** "Sentinaro wants you to know…" puts words in a real
  person's mouth. Quote her, or write what she did.
- ⛔ **Do not describe someone as a beneficiary, a case, or a story.** They are a person who
  did something. "Fellow" is the site's word and it is a role, which is fine.
- ⛔ **Do not name a child, a patient, or a survivor** who is not the subject of the piece,
  even when the fellow does in conversation. Use a role: "a Class 7 student", "one of the
  women she works with".
- **Attribute every quote to a speaker.** See `data-pullquote-source`. On a page about one
  person, an unattributed quote is read as that person speaking about themselves.

### Transliteration

⛔ **Use ṃ (dot below, U+1E43), never ṁ (dot above, U+1E41).** Measured 7 Aug 2026: U+1E41 is
**not in the shipped face** and renders as a tofu box in the middle of a name. Both are
correct scholarship — IAST uses ṃ, ISO 15919 uses ṁ — and only one of them renders. Every
other diacritic this site needs (ā ī ū ō ś ṛ ṭ ḍ ṇ ṣ ḥ ḷ ṅ) is present. See `fonts.css`.

⭐ **₹ renders.** Write ₹40,000, not "40,000 rupees" — with the one caveat noted in
`fonts.css` that this was measured against the CDN build and should be eyeballed once from
the shipped file.

---

## Sentence-level house rules

- **Dates in prose: `3 August 2026`.** Not `Aug 3, 2026`, not `03/08/26` — an all-numeral
  date is ambiguous between two readerships this site actually has.
- **One idea per sentence** in anything under a heading a stranger reads first.
- **Cut "simply", "just", "of course", "obviously".** Each one tells a reader who did not
  find it simple that they are the problem.
- **The site tagline is not a standfirst.** *"Sometimes, the people who change lives are
  simply the ones who know how to listen."* is a good line and belongs on the homepage. It is
  currently the subtitle on a profile page, where it is the most valuable 24px on the site
  spent saying nothing about the person in the headline.
