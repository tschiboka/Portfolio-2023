---
name: document-new
access: write
description: 'Create the initial ticket document when none exists.'
---

# /document-new

`/document`'s `document-new` command. `/document` holds the discipline, structure,
safety and command list this skill runs under.

## When to use

- A ticket has no document yet.

## Scope

Creates the document. Does not update an existing one or tick a checklist item.

## Rules

- Never overwrite an existing document.
- Take content from the resolved briefing, not from invention.
- Everything under `/document`'s `Rules` applies.

## Workflow

1. Determine the next `NNNN`.
2. Create `docs/NNNN-short-filename.md` from [`ticket-template.md`](../document/ticket-template.md).
3. Populate it from the resolved briefing.
4. Ask for approval before writing:

```text
Do you want to create docs/NNNN-short-filename.md for this task?
```
