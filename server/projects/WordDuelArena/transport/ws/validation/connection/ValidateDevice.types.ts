export type AllowedConnectionResult = { allowed: true }

export type DeniedConnectionResult = {
    allowed: false
    reason: string
    message: string
}

export type ValidationResult = AllowedConnectionResult | DeniedConnectionResult
