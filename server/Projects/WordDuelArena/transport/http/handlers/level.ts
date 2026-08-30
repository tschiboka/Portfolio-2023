import { TypedRequest, TypedResponse } from '../../../../../../common/types'
import type {
    WdaErrorResponse,
    GetWdaLevelParams,
    GetWdaLevelsResponse,
    PostWdaLevelRequest,
    PostWdaLevelResponse,
    WdaLevel,
} from '../../../../../../common/types'
import { validateLevel } from '../validation/level'
import { levelPersistance } from '../../../infrastructure/persistence/db/level'
import { ApiResponder, ApiMessage } from '../../../../../../common/utils/Server'
import { ApiTransformers } from '../../../../../../common/utils/Transformer'
import { isEmpty } from '@utils'

type GetLevelsRes = TypedResponse<GetWdaLevelsResponse | WdaErrorResponse>
async function handleListLevels(_req: TypedRequest, res: GetLevelsRes) {
    const levels = await levelPersistance.findAllLevels()
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

type GetLevelReq = TypedRequest<{ params: GetWdaLevelParams }>
type GetLevelRes = TypedResponse<WdaLevel | WdaErrorResponse>
async function handleGetLevel(req: GetLevelReq, res: GetLevelRes) {
    const { name } = req.params
    const level = await levelPersistance.findLevelByName(name)

    if (!level) throw ApiResponder.notFound('level')
    return ApiResponder.ok(res, ApiTransformers.toApiResource<WdaLevel>(level))
}

type PostLevelReq = TypedRequest<{ body: PostWdaLevelRequest }>
type PostLevelRes = TypedResponse<PostWdaLevelResponse | WdaErrorResponse>
async function handleUpsertLevel(req: PostLevelReq, res: PostLevelRes) {
    const level = req.body
    const { error } = validateLevel(level)

    if (error) throw ApiResponder.badRequest(error)
    const updatedLevel = await levelPersistance.upsertLevel(level)
    return ApiResponder.ok(res, { data: { message: ApiMessage.ok(), level: updatedLevel } })
}

export { handleListLevels, handleGetLevel, handleUpsertLevel }
