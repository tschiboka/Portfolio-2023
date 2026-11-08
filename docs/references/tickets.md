# Ticket references

A ticket is named by a number in square brackets, and the number is the ticket's own.

| Form         | What it names                                                        |
| ------------ | -------------------------------------------------------------------- |
| `[0009]`     | a core ticket — the portfolio itself, or generic app work            |
| `[ABC-0009]` | a project ticket — one long-running project, `ABC` being its acronym |

The number runs from 1 to 100000. An acronym is 1 to 3 capitals, picked once per project and never
reused for anything else.

## Projects

A project ticket is for a feature or project large enough to run for a long time, and often in
parallel with core work. The acronym keeps its tickets out of the core number space, so
`[ABC-0009]` and `[0009]` are two different tickets.

## Documents

- A core ticket is `docs/NNNN-<slug>.md` — `[0009]` is `docs/0009-linting-rules`.
- A project ticket is `docs/<ACRONYM>/NNNN-<slug>.md` — `[GYM-0001]` is
  `docs/GYM/0001-gym-write-path.md`. The folder carries the acronym, so the filename carries only the
  number.

## Where a reference is written

- the commit subject — `[0009] - Message`, checked by `.githooks/commit-msg`;
- the ticket's own heading;
- a `TODO` comment, where it follows the word and opens the note — `// TODO: [0009] - add a toast`.

The pattern itself lives once, in `scripts/check-commit-message.js`. The `rules/` package builds to
its own tree and cannot import from `scripts/`, so a rule that reads a reference copies the pattern,
and that file stays the source of truth.
