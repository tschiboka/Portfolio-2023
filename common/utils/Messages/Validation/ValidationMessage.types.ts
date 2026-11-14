/* Polarity of a validation rule — what the field forbids, or what it demands. */
export type Mode = 'contains' | 'only'

/* Direction of a magnitude rule — the floor a field must reach, or its ceiling. */
export type BoundMode = 'at least' | 'at most' | 'under'
