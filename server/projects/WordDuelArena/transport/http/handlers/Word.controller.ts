import { WordRepository } from '../../../infrastructure/resources/Word.repository'
import { TypedRequest } from '../../../../../../common/types'
import { ApiResponder } from '../../../../../../common/utils/Server'
import type {
    GetAnagramMapRes,
    GetFrequenciesRes,
    GetWordListRes,
} from '../../../infrastructure/resources/Word.types'

function handleGetWordList(_req: TypedRequest, res: GetWordListRes) {
    const resources = WordRepository.Get()
    if (!resources) throw ApiResponder.unavailable('wordList')
    const { wordList } = resources

    return ApiResponder.ok(res, { wordList })
}

function handleGetAnagramMap(_req: TypedRequest, res: GetAnagramMapRes) {
    const resources = WordRepository.Get()
    if (!resources) throw ApiResponder.unavailable('anagramMap')
    const { anagramMap } = resources

    return ApiResponder.ok(res, anagramMap)
}

function handleGetFrequencies(_req: TypedRequest, res: GetFrequenciesRes) {
    const resources = WordRepository.Get()
    if (!resources) throw ApiResponder.unavailable('frequency')
    const { frequency } = resources

    return ApiResponder.ok(res, frequency)
}

export const WordController = {
    GetWordList: handleGetWordList,
    GetAnagramMap: handleGetAnagramMap,
    GetFrequencies: handleGetFrequencies,
}
