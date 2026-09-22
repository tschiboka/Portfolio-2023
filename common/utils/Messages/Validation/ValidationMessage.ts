import { Strings } from '../../Strings'

/* Polarity of a validation rule — what the field forbids, or what it demands. */
export type Mode = 'contains' | 'only'

/* Direction of a magnitude rule — the floor a field must reach, or its ceiling. */
export type BoundMode = 'at least' | 'under'

const allowed = (f: string, subject: string, mode: Mode): string =>
    mode === 'only'
        ? `${Strings.capitalise(f)} allows only ${subject}`
        : `${Strings.capitalise(f)} must contain ${subject}`

/* Field validation wording — addressed to the caller about their input, and
   bound to the field that failed. Never a report on what the system did. */
export const ValidationMessage = {
    Allowed: (f: string, subject: string, mode: Mode = 'only') => allowed(f, subject, mode),
    Bound: (f: string, n: number, unit: string, mode: BoundMode) =>
        mode === 'at least'
            ? `${Strings.capitalise(f)} must be at least ${n} ${unit}`
            : `${Strings.capitalise(f)} must be under ${n} ${unit}`,
    Invalid: (f: string, subject?: string) =>
        subject
            ? `${Strings.capitalise(f)} must be ${subject}`
            : `${Strings.capitalise(f)} is not valid`,
    Matches: (f: string, other: string) =>
        `${Strings.capitalise(f)} must match ${other.toLowerCase()}`,
    Required: (f: string) => `${Strings.capitalise(f)} is required`,
    Unique: (f: string) => `${Strings.capitalise(f)} must be unique`,
} as const
