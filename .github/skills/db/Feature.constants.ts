// @ts-nocheck — skill example, outside the tsconfig include.

import { DateTime } from '@common-utils'

// The single source of truth the schema, the model and the validation all read.
// Grouped by field so a field's bounds travel together, and `as const` so the
// values stay literal rather than widening to `number`.
export const FeatureFieldLimits = {
    path: { min: 1, max: 100 },
    label: { min: 3, max: 60 },
} as const

// Timings read from `DateTime.Units` rather than a raw millisecond count, so the
// unit is stated where the value is.
export const FeatureTimings = {
    retentionMs: { min: DateTime.Units.Ms.fromMin(30), max: DateTime.Units.Ms.fromHour(24) },
} as const
