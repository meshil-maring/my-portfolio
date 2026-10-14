# 01 — Colors (v1.1 LOCKED)

Default theme: **light**. Toggle persists; respect saved > system > light default. No flash of wrong theme.

## Light

| Token | Hex | Usage |
|---|---|---|
| `--color-bg` | #F8FAF8 | page bg |
| `--color-surface` | #FFFFFF | nav, cards, containers |
| `--color-soft` | #F0F5F1 | alternating/muted areas |
| `--color-hero` | #EFF6F1 | hero section |
| `--color-text` | #172A23 | headings, important text |
| `--color-muted` | #596D63 | body/descriptions |
| `--color-faint` | #7E9186 | labels, metadata |
| `--color-accent` | #176C4C | buttons, links, numbers, highlights |
| `--color-accent-text` | #FFFFFF | filled-button text |
| `--color-accent-soft` | #E2F2E8 | badges, highlighted surfaces |
| `--color-border` | #DCE8DF | cards, dividers, inputs |

## Dark

| Token | Hex | Usage |
|---|---|---|
| `--color-bg` | #101816 | page bg |
| `--color-surface` | #18231F | cards, nav, content |
| `--color-soft` | #1C2C24 | alternating sections |
| `--color-hero` | #182A21 | hero section |
| `--color-text` | #F0F7F1 | headings |
| `--color-muted` | #ADBDAF | body text |
| `--color-faint` | #82998A | labels |
| `--color-accent` | #A5ECC0 | buttons, links, highlights |
| `--color-accent-text` | #14271B | filled-button text |
| `--color-accent-soft` | #274838 | highlighted surfaces |
| `--color-border` | #304438 | cards, dividers |

## Usage ratio

80% neutrals / 15% soft green / 5% strong accent. No large body text in accent. Accent for: CTAs, links, section numbers, one keyword per heading, icons, active nav, focus rings, availability dot.

No heavy gradients, no extra bright colors. WCAG AA contrast required.

## Changing colors later

Open `proposals/YYYY-MM-DD-color-<name>.md` with swatches in both themes + contrast ratios. Minor bump on accept.
