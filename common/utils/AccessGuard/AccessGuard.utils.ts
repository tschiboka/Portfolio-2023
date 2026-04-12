import { AccessMap, Guard, GuardCondition, ModeConfig } from './AccessGuard.types'

/**
 * Evaluates a single condition against the current access map.
 * Returns `true` if access is **denied** (guard should activate).
 */
export const isConditionDenied = (condition: GuardCondition, access: AccessMap): boolean => {
    switch (condition.type) {
        case 'capability': {
            const { capabilities = [] } = condition
            return !capabilities.every((c) => access.capabilities.includes(c))
        }
        case 'feature': {
            const { features = [] } = condition
            return !features.every((f) => access.features[f])
        }
        case 'custom': {
            return !condition.predicate(access)
        }
    }
}

/**
 * Evaluates a guard's `when` clause.
 * If `when` is an array, any denied condition activates the guard (OR — first fail triggers).
 */
export const isGuardActive = (guard: Guard, access: AccessMap): boolean => {
    if (guard.unless) return !isConditionDenied(guard.unless, access)
    return isConditionDenied(guard.when, access)
}

/**
 * Walk through guards in priority order.
 * Returns the first matching ModeConfig, or null if all guards pass (access granted).
 */
export const resolveGuards = (guards: Guard[], access: AccessMap): ModeConfig | null => {
    for (const guard of guards) {
        if (isGuardActive(guard, access)) {
            return guard.then
        }
    }
    return null
}
