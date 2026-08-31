# 0007 — Light mode sweep

> **Status:** Planned
> **Last updated:** 2026-08-30
> **Created:** 2026-08-30

---

## 1. Description

A full-app **light mode sweep**. While doing the `Region` light-theme audit
(0006) a dark section was found on the Login page — `.region__content` and other
region surfaces had no `.light` overrides and stayed dark in light mode. Those
were fixed, but the exercise exposed that **light mode is not systematically
verified** across the whole app. This ticket is a sweep to run through every
page/screen in light theme, find remaining dark-stuck surfaces / insufficient
contrast / broken tokens, and fix them.

## 2. Feature scope

**In scope**

- Walk every page / route in light mode and visually inspect for:
    - surfaces that stay dark (`--black-*` backgrounds without a `.light` override);
    - text/surface contrast issues (e.g. light text on light background);
    - components/SVG/icons that assume dark mode;
    - scss `palette.$X`-based styles that don't flip in light mode.
- Fix each finding (prefer adding `.light` overrides / token swaps in the owning
  `common/*` or feature styles).
- Ensure `tsc` and relevant tests stay green.

**Out of scope / non-goals**

- No dark-mode rework — only make light mode correct.
- No new design system changes beyond what light mode needs.
- No server work.

## 3. Plan

1. Audit `common/ux` primitives for remaining dark-only surfaces (beyond Region).
2. Audit feature pages: Home, About, Projects, Blog, Contact, API pages, Misc
   (WordDuelArena, Typist, Gym, Xmas2025), articles.
3. Audit shared chrome: Nav, SubNav, MobileMenu, Footer, PageSideMenu, Login form.
4. Fix findings one area at a time (per AGENTS.md — one file at a time).
5. Verify (tsc + spot-check in browser light mode).

## 6. Decisions & rationale

- Triggered by the 0006 `Region` light-theme audit (Login dark section).
- `.light`-override + token-swap approach preferred over duplicating components.

## 7. Artifacts

- Fixes to `common/*` and feature styles.
- This ticket log.
