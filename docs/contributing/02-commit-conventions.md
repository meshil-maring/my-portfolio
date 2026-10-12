# 02 – Commit Conventions

## Purpose
Readable history via Conventional Commits.

## Format
```
<type>(<scope>): <short imperative summary>

[optional body: what + why]
```

Types: `feat` `fix` `docs` `style` `refactor` `perf` `test` `chore` `build` `ci`

## Examples
```
feat(hero): add headline entrance animation
fix(navbar): close mobile menu on route change
docs(styling): document brand tokens
chore(deps): bump vite to v6
```

## Rules
- Present tense, ≤ 72 chars subject, no period.
- `docs:` commits update `docs/`; code PRs update relevant `docs/` files too.
- Squash-merge PRs so `main` stays linear and clean.
