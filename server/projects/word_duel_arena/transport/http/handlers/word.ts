import { TypedRequest, TypedResponse } from '@common/types'
import type {
    WdaErrorResponse,
    GetWdaWordListResponse,
    GetWdaAnagramMapResponse,
    GetWdaFrequenciesResponse,
} from '@common/types'

import { getWordResources } from '../../../infrastructure/resources/word'
import { HttpStatus } from '../../../../../common/HttpStatus/HttpStatus'

type GetWordListRes = TypedResponse<GetWdaWordListResponse | WdaErrorResponse>
async function handleGetWordList(_req: TypedRequest, res: GetWordListRes) {
    const resources = getWordResources()
    if (!resources)
        return res
            .status(HttpStatus.SERVICE_UNAVAILABLE)
            .json({ message: 'Could not load resource: wordList' })
    const { wordList } = resources

    res.json(wordList)
}

type GetAnagramMapRes = TypedResponse<GetWdaAnagramMapResponse | WdaErrorResponse>
async function handleGetAnagramMap(_req: TypedRequest, res: GetAnagramMapRes) {
    const resources = getWordResources()
    if (!resources)
        return res
            .status(HttpStatus.SERVICE_UNAVAILABLE)
            .json({ message: 'Could not load resource: anagramMap' })
    const { anagramMap } = resources

    res.json(anagramMap)
}

type GetFrequenciesRes = TypedResponse<GetWdaFrequenciesResponse | WdaErrorResponse>
async function handleGetFrequencies(_req: TypedRequest, res: GetFrequenciesRes) {
    const resources = getWordResources()
    if (!resources)
        return res
            .status(HttpStatus.SERVICE_UNAVAILABLE)
            .json({ message: 'Could not load resource: frequency' })
    const { frequency } = resources

    res.json(frequency)
}

export { handleGetWordList, handleGetAnagramMap, handleGetFrequencies }
