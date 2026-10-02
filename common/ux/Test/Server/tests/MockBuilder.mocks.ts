import { MockBuilder } from '../MockBuilder'
import type { MockItem } from './MockBuilder.spec.types'

/** Base fixture every `MockBuilder` spec derives from. */
const baseMock: MockItem = {
    id: 1,
    name: 'foo',
    status: 'active',
    meta: { hits: 0 },
}

/** Reusable builder over `baseMock`. */
const baseBuilder = MockBuilder(baseMock)

export const MockBuilderMocks = { baseMock, baseBuilder }
