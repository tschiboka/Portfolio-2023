---
name: document
access: write
description: 'Maintain the ticket document as work progresses. Record approved changes, decisions, relevant context, and completed subtasks.'
---

# /document

## When to use

- A ticket document must be created, or an existing one kept current.
- Approved changes, decisions, or completed subtasks need recording.

## Scope

Maintains the single authoritative document for a ticket — current task, checklist,
agreed decisions, relevant context, and history.

Does not gather requirements, implement code, test, debug, review, or make
unapproved decisions.

## Rules

### Conduct

- **Never write without explicit user approval.**
- Propose changes before making them.
- Keep sentences and checklist steps short and actionable.
- When updating, check whether the change affects other entries and update them
  as necessary.
- Update `Last updated` when an approved change makes it outdated.

### Structure

- One ticket = one document.
- Never create additional documentation files.
- Consult [`ticket-template.md`](ticket-template.md) for structure.
- Only document information that belongs to the ticket.

### Commands

- [`/document-new`](.github/skills/document-new/SKILL.md) — create the initial document when none exists.
- [`/document-done`](.github/skills/document-done/SKILL.md) — mark an existing checklist item complete.
- [`/document-edit`](.github/skills/document-edit/SKILL.md) — update existing ticket information.
- When a command represents the next action, offer it. Definitions: [`protocol.md`](.github/skills/protocol.md).

### Content safety

`docs/` is public and tracked in version control. Before writing, ensure content
contains no secrets, credentials, API keys, tokens or passwords; no private URLs
or internal endpoints; no private personal or sensitive data.

### `Decisions & Rationale`

- Never independently add or modify it. Surface the change and obtain explicit
  approval first.
- Record only decisions that materially constrain implementation or explain a
  non-obvious choice. Never use it as a design diary.
