# Portfolio 2023

Portfolio and personal hub — projects, blog and articles, with the API that backs them.
React and TypeScript on the front end, Express and Joi on the server.

## Workspaces

| Workspace | What it is                                                |
| --------- | --------------------------------------------------------- |
| `src/`    | Front end — app shell, portfolio, projects                |
| `common/` | Shared types, utilities and components used by both sides |
| `server/` | Express API and its feature modules                       |
| `public/` | Static assets, icons and project media                    |
| `rules/`  | Custom lint rules, built into the ESLint config           |
| `docs/`   | Engineering notes and feature plans                       |

## Getting started

```bash
npm install
npm run dev      # Vite dev server
npm start        # API server
npm test         # Vitest
npm run lint     # ESLint
```

## Commit gate

`.githooks/commit-msg` judges the message first — `[0009] - Message` or `[ABC-0009] - Message`,
the number between 1 and 100000 — and only then lints the staged `.ts`/`.tsx`/`.css`/`.scss`
files and runs `tsc` and the full suite. A bad message therefore costs one cheap check instead
of a full run. Everything sits in `commit-msg` rather than `pre-commit` because git runs
`pre-commit` first, where the message does not exist yet. `npm install` switches the hook on
through the `prepare` script, which sets `core.hooksPath` to `.githooks`; to do it by hand in an
existing clone:

```bash
git config core.hooksPath .githooks
```

Bypass it deliberately with `git commit --no-verify`.

`.githooks/commit-msg` refuses a message that is not `[0009] - Message` or `[ABC-0009] - Message`:

- the ticket ref sits in brackets — 1 to 6 digits, or 1 to 5 capital letters, a dash, then digits;
- after `-` the message may hold mixed case, digits, spaces and ordinary punctuation.

## Documentation

Engineering notes and feature plans live in [`docs/`](docs/README.md).
Conventions are in [`AGENTS.md`](AGENTS.md) and the skills in [`.github/skills/`](.github/skills/).
