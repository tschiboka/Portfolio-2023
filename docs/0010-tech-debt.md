# 0010 — Tech debt

## 1. Description

Known debt that is worth doing but not worth interrupting the ticket that found it. Each entry is
carried by a `TODO` in the code, so the line that owes the work points here.

## 1.1 Info

| Status       | Planned    |
| ------------ | ---------- |
| Last updated | 2026-11-08 |
| Created      | 2026-11-08 |

## 2. Feature Dev Checklist

- [ ] Step 1: Toast a failed stats request, which today falls back to an empty state —
      `src/app/Home/WebsiteStats/WebsiteStats.tsx`
- [ ] Step 2: Surface a mailbox or notification for a failed notification email, which today is
      dropped in silence — `server/App/Message/Message.utils.ts`
