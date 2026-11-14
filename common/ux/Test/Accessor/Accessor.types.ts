import type { BoundFunctions, queries } from '@testing-library/react'

export type Scope = BoundFunctions<typeof queries>
