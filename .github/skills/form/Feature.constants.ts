// @ts-nocheck — skill example, outside the tsconfig include.

// A feature's own validation values. Reusable patterns live in `Regexp`; only a
// rule belonging to this feature alone is declared here.
// Grouped by field, so a field's bounds travel as one value and cannot drift
// apart — the same shape the server uses for `MessageFieldLimits`.
export const FeatureFieldLimits = {
    name: { min: 5, max: 20 },
    userName: { min: 5, max: 20 },
    password: { min: 8, max: 40 },
} as const

// A rule this feature alone has. Any pattern a second feature could need belongs
// in `Regexp`.
export const NAME_PATTERN = /^[a-z '-]+$/i
