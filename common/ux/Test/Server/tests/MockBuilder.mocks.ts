import { MockBuilder } from '../MockBuilder'
import type { MockItem } from './MockBuilder.spec.types'

/** Base fixture every `MockBuilder` spec derives from. */
export const baseMock: MockItem = {
    id: 1,
    name: 'foo',
    status: 'active',
    meta: { hits: 0 },
}

/** Reusable builder over `baseMock`. */
export const baseBuilder = MockBuilder(baseMock)
