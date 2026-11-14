import { isEmpty } from '@common-utils'
import { LevelSchema } from '../validation/Level.schema'
import { LevelRepository } from '../../../infrastructure/persistence/db/Level.repository'
import { TypedRequest } from '../../../../../../common/types'
import { ApiResponder, ApiMessage } from '../../../../../../common/utils'
import { ApiTransformers } from '../../../../../../common/utils/Transformer'
import type {
    GetLevelReq,
    GetLevelRes,
    GetLevelsRes,
    PostLevelReq,
    PostLevelRes,
} from '../../../model/Level.types'
import type { WdaLevel } from '../../../../../../common/types'

async function handleListLevels(_req: TypedRequest, res: GetLevelsRes) {
    const levels = await LevelRepository.findAll()
    if (!levels) throw ApiResponder.internalServerError()

    const result = levels.map(
        (level: { name: string; targetWords: string[]; difficulty: number }) => ({
            name: level.name,
            displayName: level.targetWords[level.targetWords.length - 1] || level.name,
            difficulty: level.difficulty,
        }),
    )

    if (isEmpty(result)) throw ApiResponder.notFound('levels')
    return ApiResponder.ok(res, { levels: result })
}

async function handleGetLevel(req: GetLevelReq, res: GetLevelRes) {
    const { name } = req.params
    const level = await LevelRepository.findByName(name)

    if (!level) throw ApiResponder.notFound('level')
    return ApiResponder.ok(res, ApiTransformers.toApiResource<WdaLevel>(level))
}

async function handleUpsertLevel(req: PostLevelReq, res: PostLevelRes) {
    const level = req.body
    const { error } = LevelSchema.validate(level)

    if (error) throw ApiResponder.badRequest(error)
    const updatedLevel = await LevelRepository.upsert(level)
    return ApiResponder.ok(res, { data: { message: ApiMessage.ok(), level: updatedLevel } })
}

export const LevelController = {
    ListLevels: handleListLevels,
    GetLevel: handleGetLevel,
    UpsertLevel: handleUpsertLevel,
}
