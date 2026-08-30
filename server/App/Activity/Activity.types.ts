import type {
    GetActivityFeedQuery,
    GetActivityFeedResponse,
    TypedRequest,
    TypedResponse,
} from '../../../common/types'

export type GetActivityFeedReq = TypedRequest<{ query: GetActivityFeedQuery }>
export type GetActivityFeedRes = TypedResponse<GetActivityFeedResponse>


