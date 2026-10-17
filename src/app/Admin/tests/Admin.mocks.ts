import { MockBuilder } from '@common-ux/Test'
import type { PostBackfillResponse } from '@common-types'

export const AdminMocks = {
    backfill: MockBuilder<PostBackfillResponse>({ upserted: 3 }),
}
