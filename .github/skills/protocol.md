# Protocols words between user and agent

## Commands

Agent offers relevant commands when they represent the next action. Definitions in
this file.

A capitalised word in a message is likely a command. Check it against this list
before treating it as prose.

**Decision**

- `GO` — accept the offered one action
- `DROP` — reject it and do not offer that action again
- `SKIP` — defer the offered action; it may be offered again when relevant
- `1` / `2` / `3` — choose the corresponding Decide option

**Progression**

- `NEXT` — do the next smallest reviewable chunk
- `DONE` — the previously requested user-run action is complete; continue
- `BACK` — return to the previous meaningful working point, abandoning the current branch

**Mode**

- `PILOT` — the agent drives the implementation; review each proposed change
- `COPILOT` — work collaboratively, with the user directing the next step (default)

**Report**

- `DOC` — record the current exchange in the ticket as appropriate
- `STATE` — return the state block only
- `WDYT` — review the current editor's file, cruelly but constructively
- `SHOW` — link the file or artifact currently being discussed
- `WHY` — explain the reasoning behind the current action or decision

**Help**

- `HELP` — print the command and skill lists for the user

**Recovery**

- `SOS` — re-read `working-style.md` and `AGENTS.md` because of a violation, and
  repeat the answer in the correct format

## Agent directed question types

- **Question** — one unresolved point.
- **Decide** — numbered alternatives.
- **Check** — investigate without editing.
- **Action** — make the accepted change; name the token that accepts it.
- **Document** — record or tick the ticket.

The ask is always the final block before `Happy coding!`.
