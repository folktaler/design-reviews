# Photographs — of people

The inherited guidance was written for **places**: a jetty, a doorway, a street at 7am. This
site photographs **people**, and that changes almost every rule. This file replaces it rather
than extending it.

---

## The three rules that carry over unchanged

1. ⛔ **Text never sits on a photograph.** Overlaid contrast belongs to the *photograph*, so
   it cannot be computed once and trusted — and the standard fix, a scrim, damages the
   photograph in order to rescue the type. Captions go **below**.
2. ⛔ **Real photographs only. Never AI-generated.** This is a trust decision, not a style
   one, and it matters more here than on a travel guide: an invented image of a real named
   person is a different category of wrong.
3. **`naturalWidth` is the artefact; an `<img>` in the DOM is a proxy.** 149 images once
   404'd on the sibling project while the components "rendered" perfectly. Check that the
   picture decoded, not that the tag exists.

---

## ⛔ The measured defect

On the live Sentinaro Shiu profile, 7 August 2026: **several photographs of her, and not one
caption or credit on any of them.**

Two separate failures wearing one appearance:

- **The reader cannot tell who is who.** In a group photograph on a page about one person,
  the caption is the only thing that identifies her. Without it the reader guesses, and on a
  page whose entire job is to give someone their due, guessing is the wrong outcome.
- **The photographer is uncredited.** On a not-for-profit whose proposition is that people
  who do quiet work should be named, an uncredited photograph is the house contradicting
  itself in its own margin.

⭐ **So caption and credit are required slots, not optional props.** A component that renders
happily without them is exactly how the 149 broken images shipped: the absence has to be
visible when the page is built, not discoverable by someone scrolling.

---

## Shape — and the only circle in the system

| The photograph is… | Shape | Why |
|---|---|---|
| of the **work** — a classroom, a rehearsal, a workshop | square, may run full-bleed | it is a document, not an ornament |
| a **face used to identify a person** — profile head, card, byline | round | a person is the one thing that is not a rectangle |

⛔ **Nothing else is round, and nothing rounds a photograph for decoration.** A corner appears
only where something contains the picture, and then it is the container's corner.

---

## Captions

A caption does one job: **say what is happening and who is in it.** It is not a title, not a
mood line, and not a repeat of the sentence above it.

> Sentinaro with her Class 7 group in Kohima, the week before the school year ended.
> Photograph: Haneen Naseer

- **14px sans, `--ink-quiet`, capped at `--measure-small`.** Short by construction.
- ⛔ **The credit is the same size as the caption.** Not smaller, not paler, not uppercase.
  A line set at 12px uppercase grey wears the visual grammar of a legal disclaimer, and the
  credit is the one line naming a person who did work. That exact mistake shipped across 144
  pages of the sibling project before anyone asked what the line was *for*.

---

## Consent, and the sentence that is not a design detail

⚠️ **Some subjects of this site are photographed in contexts they did not choose to be public
about** — mental health, aftercare, justice work. Two rules, and neither is negotiable by
layout:

- **A photograph of an identifiable person needs their agreement to be published**, and that
  is the writer's job before it is the designer's.
- ⛔ **Never publish an identifiable photograph of a child, a patient or a survivor who is
  not the subject of the piece.** If the picture is the only one that works, crop it or use
  a photograph of the work instead. There is no caption that fixes it.

---

## Alt text

Alt text describes **what is in the picture**, for someone who cannot see it. It is not the
caption and it is not the credit.

- ✅ `Sentinaro Shiu sitting on a classroom floor with three students, all looking at an open notebook`
- ⛔ `Sentinaro Shiu` — a name is not a description
- ⛔ `Photo of a teacher` — true of ten thousand photographs
- ⛔ Empty alt on a portrait. Empty alt means *decorative*, and a photograph of the person the
  page is about is never decorative.
