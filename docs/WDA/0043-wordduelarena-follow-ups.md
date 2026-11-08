# WDA-0043 — WordDuelArena follow-ups

## 1. Description

Two things the session code leaves open. A move carrying a `deviceId` that belongs to no player falls
through without a trace, so a client that lost its seat — or never had one — is told nothing. And a
session's level is drawn uniformly at random, ignoring what the player has already played.

## 1.1 Info

| Status       | Planned    |
| ------------ | ---------- |
| Last updated | 2026-11-08 |
| Created      | 2026-11-08 |

## 2. Feature Dev Checklist

- [ ] Step 1: Decide what an unmatched `deviceId` means — an error, a skipped broadcast, or a no-op
- [ ] Step 2: Answer the client accordingly, or record why silence is right —
      `server/projects/WordDuelArena/domain/session/Move.service.ts`
- [ ] Step 3: Weight the level drawn for a session by the player's history, instead of taking one at
      random — `server/projects/WordDuelArena/infrastructure/persistence/db/Level.repository.ts`
