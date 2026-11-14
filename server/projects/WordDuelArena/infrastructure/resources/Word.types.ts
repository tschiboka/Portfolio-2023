import type { Dictionary } from '@common-utils'
import type {
    GetWdaAnagramMapResponse,
    GetWdaFrequenciesResponse,
    GetWdaWordListResponse,
    TypedResponse,
    WdaErrorResponse,
} from '@common-types'

/** The word data the feature loads once and serves from memory. */
export type WordResources = {
    wordList: string[]
    anagramMap: Dictionary<string[]>
    frequency: Dictionary<number>
}

export type GetWordListRes = TypedResponse<GetWdaWordListResponse | WdaErrorResponse>
export type GetAnagramMapRes = TypedResponse<GetWdaAnagramMapResponse | WdaErrorResponse>
export type GetFrequenciesRes = TypedResponse<GetWdaFrequenciesResponse | WdaErrorResponse>
