// @ts-nocheck — skill example, outside the tsconfig include.

// The barrel for the parts folder. A component in `components/` is not imported
// by path from outside the feature — the feature's own `index.ts` re-exports what
// may leave, and this file keeps that list in one place.
export { ComponentFoo } from './ComponentFoo'
