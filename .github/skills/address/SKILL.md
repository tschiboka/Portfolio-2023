---
name: address
access: write
description: 'Correcting accepted work against what was raised.'
---

# /address

## When to use

- `/review-file` or `/review-feature` flagged something on accepted work.
- The user accepts a correction offered in conversation.

## Scope

Corrects work already accepted, against the finding as raised. The finding
carries its own scope. An improvement beyond it is new work, not an address.

## Rules

- Change nothing beyond the finding.
- Route to whichever skill the correction needs.

## Workflow

1. Read the finding and identify the exact defect.
2. Offer the correction.
3. Wait for approval, then make it.
4. Route to the skill the correction needs — `/implement` for code, `/document`
   for the ticket — then return to `/implement`.
