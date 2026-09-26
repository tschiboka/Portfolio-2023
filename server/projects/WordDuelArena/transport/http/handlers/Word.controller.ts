import { TypedRequest, TypedResponse } from '../../../../../../common/types'
import type {
    WdaErrorResponse,
    GetWdaWordListResponse,
    GetWdaAnagramMapResponse,
    GetWdaFrequenciesResponse,
} from '../../../../../../common/types'
import { getWordResources } from '../../../infrastructure/resources/Word.repository'
import { ApiResponder } from '../../../../../../common/utils/Server'

type GetWordListRes = TypedResponse<GetWdaWordListResponse | WdaErrorResponse>
function handleGetWordList(_req: TypedRequest, res: GetWordListRes) {
    const resources = getWordResources()
    if (!resources) throw ApiResponder.unavailable('wordList')
    const { wordList } = resources

    return ApiResponder.ok(res, { wordList })
}

type GetAnagramMapRes = TypedResponse<GetWdaAnagramMapResponse | WdaErrorResponse>
function handleGetAnagramMap(_req: TypedRequest, res: GetAnagramMapRes) {
    const resources = getWordResources()
    if (!resources) throw ApiResponder.unavailable('anagramMap')
    const { anagramMap } = resources

    return ApiResponder.ok(res, anagramMap)
}

type GetFrequenciesRes = TypedResponse<GetWdaFrequenciesResponse | WdaErrorResponse>
function handleGetFrequencies(_req: TypedRequest, res: GetFrequenciesRes) {
    const resources = getWordResources()
    if (!resources) throw ApiResponder.unavailable('frequency')
    const { frequency } = resources

    return ApiResponder.ok(res, frequency)
}

export { handleGetWordList, handleGetAnagramMap, handleGetFrequencies }
