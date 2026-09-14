import type { PostBackfillResponse } from '@common-types'
import { MockBuilder } from '@common-ux/Test'

export const AdminMocks = {
    backfill: MockBuilder<PostBackfillResponse>({ upserted: 3 }),
}
