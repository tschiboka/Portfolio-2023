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

## Documentation

Engineering notes and feature plans live in [`docs/`](docs/README.md).
Architecture and conventions are in [`ARCHITECTURE.md`](ARCHITECTURE.md) and [`AGENTS.md`](AGENTS.md).
