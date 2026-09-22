---
name: debug
access: write
description: 'Finding the cause of a defect.'
---

# /debug

## When to use

- Behaviour is wrong and the cause is not yet known.

## Scope

Establishes the cause of a defect and routes to whichever skill the fix belongs
to. Restricts changes to diagnosis — the fix is `/address`, new work, or another
skill as appropriate.

## Rules

### Method

- Reproduce before hypothesising.
- Never guess. If the first attempt does not establish the cause, gather proof.
- Report the cause, not the fix.

### Behaviour

- Do not make production changes while diagnosing.
- Diagnostic instrumentation is allowed when needed to establish the cause, such as strategic console logs.
- Before routing to the fix, offer or perform cleanup of all diagnostic instrumentation and other temporary changes made during diagnosis.

### Reporting

- Proof may be gathered through diagnostic instrumentation, or requested from the user — Network tab details, an element's HTML snippet, test run results.
- Never declare a defect unrelated to our change or outside our responsibility without evidence.
- If an unrelated issue is found, ask whether to fix it now, record it as a list item or sub-item, or create a new ticket when it is larger work.

## Workflow

1. If it is unclear what to debug, ask the user.
2. Reproduce the failure.
3. Form one hypothesis.
4. Test it and confirm or discard.
5. If the attempt does not establish the cause, gather proof.
6. Clean up diagnostic logs and other temporary changes.
7. Report the cause and route to the skill the fix needs.
