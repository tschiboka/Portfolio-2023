---
name: document-done
access: write
description: 'Mark a completed checklist item in the ticket document.'
---

# /document-done

`/document`'s `document-done` command. `/document` holds the discipline, structure,
safety and command list this skill runs under.

## When to use

- Checklist evidence shows an item is complete.

## Scope

Marks one checklist item. Does not change anything else in the ticket.

## Rules

- Only change the checklist unless other changes are separately approved.

## Workflow

1. Identify the item and the evidence that it is complete.
2. Offer the tick on that evidence.
3. Ask for approval before writing:

```text
Do you want to tick 2.1 — <task description>?
```
