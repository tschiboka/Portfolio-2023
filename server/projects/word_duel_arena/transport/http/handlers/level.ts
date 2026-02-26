import { TypedRequest, TypedResponse } from '@common/types'
import type {
    WdaErrorResponse,
    GetWdaLevelParams,
    GetWdaLevelsResponse,
    PostWdaLevelRequest,
    PostWdaLevelResponse,
    WdaLevel,
} from '@common/types'
import { validateLevel } from '../validation/level'
import { levelPersistance } from '../../../infrastructure/persistence/db/level'
import { HttpStatus } from '../../../../../common/HttpStatus/HttpStatus'

type GetLevelsRes = TypedResponse<GetWdaLevelsResponse | WdaErrorResponse>
async function handleListLevels(_req: TypedRequest, res: GetLevelsRes) {
    const levels = await levelPersistance.findAllLevels()
    if (!levels)
        return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: 'Error retrieving levels from DB' })

    const result = levels.map(
        (level: { name: string; targetWords: string[]; difficulty: number }) => ({
            name: level.name,
            displayName: level.targetWords[level.targetWords.length - 1] || level.name,
            difficulty: level.difficulty,
        }),
    )

    if (result.length === 0)
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'No levels found in DB' })
    res.status(HttpStatus.OK).json({ levels: result })
}

type GetLevelReq = TypedRequest<{ params: GetWdaLevelParams }>
type GetLevelRes = TypedResponse<WdaLevel | WdaErrorResponse>
async function handleGetLevel(req: GetLevelReq, res: GetLevelRes) {
    const { name } = req.params
    const level = await levelPersistance.findLevelByName(name)

    if (!level) return res.status(HttpStatus.NOT_FOUND).json({ message: 'Level not found in DB' })
    res.status(HttpStatus.CREATED).json(level)
}

type PostLevelReq = TypedRequest<{ body: PostWdaLevelRequest }>
type PostLevelRes = TypedResponse<PostWdaLevelResponse | WdaErrorResponse>
async function handleUpsertLevel(req: PostLevelReq, res: PostLevelRes) {
    const level = req.body
    const { error } = validateLevel(level)

    if (error) return res.status(HttpStatus.BAD_REQUEST).json({ message: error.details[0].message })
    const updatedLevel = await levelPersistance.upsertLevel(level)
    res.status(HttpStatus.OK).json({ data: { message: 'OK', level: updatedLevel } })
}

export { handleListLevels, handleGetLevel, handleUpsertLevel }
