// @ts-nocheck — skill example, outside the tsconfig include.

// A feature's own validation values, and only those: every pattern lives in
// `Regexp`, so this file holds bounds.
// Grouped by field, so a field's bounds travel as one value and cannot drift
// apart — the same shape the server uses for `MessageFieldLimits`.
export const FeatureFieldLimits = {
    name: { min: 5, max: 20 },
    userName: { min: 5, max: 20 },
    password: { min: 8, max: 40 },
} as const
