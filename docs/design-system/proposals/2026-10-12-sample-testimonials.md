# Proposal: Example — Testimonials section (SAMPLE, not accepted)

- Date: 2026-10-12
- Status: DRAFT
- Affects: section + nav + content model
- Version bump: minor (1.0 → 1.1)

## Problem / opportunity
Social proof for freelance clients; currently no testimonials.

## Proposed change
New `#testimonials` section between `#skills` and `#about`, numbered 04 (renumber About→05, Contact→06). 3 quote cards, `data/testimonials.ts: { quote, name, role }[]`. Nav unchanged (no new link in v1).

## Light + dark impact
Cards use `--color-surface` + `--color-border`; quotes in `--color-text`, names in `--color-muted`. Verified AA.

## Responsive + a11y impact
3-col → 1-col stack; `figure/blockquote/figcaption` semantics; no animation beyond standard reveal.

## Alternatives considered
Logos strip (needs client permission — deferred). Carousel (rejected: a11y + complexity).

## Decision
Pending owner approval. Delete this sample when raising a real proposal.
