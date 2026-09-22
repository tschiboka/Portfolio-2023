// @ts-nocheck — skill example, outside the tsconfig include.

import { hasLength, isDefined, isOneOf, isTruthy } from '@common-utils'
import type { FeatureStatus } from './Feature.types'

// Turns the feature's own state into a rendered value. It knows the feature's
// vocabulary — the class names the markup uses — which is what keeps it out of
// `utils.ts`.
//
// Predicates and selectors are complementary: a predicate answers a question
// about a value, a selector turns the answer into something renderable. Reach
// for a predicate from `@common-utils` rather than writing the check inline.
const StatusClass: Record<FeatureStatus, string> = {
    idle: 'feature-card',
    active: 'feature-card feature-card--active',
    done: 'feature-card feature-card--done',
} as const

const DONE = 'done'
const ACTIVE = 'active'

export const getCardClass = (status: FeatureStatus) => StatusClass[status]

export const getStatusLabel = (status: FeatureStatus) =>
    isOneOf(status, [DONE]) ? 'Complete' : isOneOf(status, [ACTIVE]) ? 'In progress' : 'Not started'

export const selectIsActionable = (status?: FeatureStatus) => isDefined(status) && status !== DONE

export const selectHasTags = (tags?: string[]) => hasLength(tags)

export const selectShowStatus = (status?: FeatureStatus, isOpen?: boolean) =>
    isTruthy(isOpen) && selectIsActionable(status)
