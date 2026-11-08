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

`.githooks/pre-commit` runs the one gate that may change the commit: `package.json` must carry a
bump, for which it offers PATCH, MINOR or MAJOR and writes the choice. It cannot live in
`commit-msg` — git freezes the commit's contents the moment `pre-commit` returns, so a file staged
later is left in the index instead of the commit.

`.githooks/commit-msg` then judges cheapest first: the commit's ticket is swept for TODOs of the
same ticket or an earlier one, every change must be staged, and the subject must read
`[0009] - Message` or `[ABC-0009] - Message`, the number between 1 and 100000. Only then do
`npm run lint`, `tsc` and the full suite run, so a cheap problem costs one cheap check instead of a
full run. A listed TODO is acknowledged with `y` at the prompt, or resolved before committing. What
each reference form names is in [`docs/references/tickets.md`](docs/references/tickets.md). The step
formatting both hooks print lives in `.githooks/step.sh`, which they source.

`npm install` switches the hooks on through the `prepare` script, which sets `core.hooksPath` to
`.githooks`; to do it by hand in an existing clone:

```bash
git config core.hooksPath .githooks
```

Bypass them deliberately with `git commit --no-verify`.

`.githooks/commit-msg` refuses a message that is not `[0009] - Message` or `[ABC-0009] - Message`:

- the ticket ref sits in brackets — 1 to 6 digits, or 1 to 3 capital letters, a dash, then digits;
- after `-` the message may hold mixed case, digits, spaces and ordinary punctuation.

## Documentation

Engineering notes and feature plans live in [`docs/`](docs/README.md).
Conventions are in [`AGENTS.md`](AGENTS.md) and the skills in [`.github/skills/`](.github/skills/).
