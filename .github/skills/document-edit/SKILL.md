---
name: document-edit
access: write
description: 'Update existing ticket information — status, checklist, questions, decisions.'
---

# /document-edit

`/document`'s `document-edit` command. `/document` holds the discipline, structure,
safety and command list this skill runs under.

## When to use

- Existing ticket information needs changing.

## Scope

Changes what is already written. Does not create a document or tick a checklist item.

## Rules

- Every mutation requires approval.
- Ask for a parameter word when the target is not obvious.

## Workflow

Parameters:

- STATUS: status or dates
- TICK: checklist and task details
- QUESTIONS: open questions
- NOTES: other relevant ticket information
- DECISION: explicitly approved decisions

1. Identify the parameter the change belongs to.
2. Ask for approval before writing:

```text
Do you want to update the checklist with <change>?
```

```text
Do you want to document the decision of <decision>?
```
