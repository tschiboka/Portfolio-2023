import express from 'express'
import { GetGymDifficultyOptionsResponse, TypedRequest, TypedResponse } from '@common/types'
import { HttpStatus } from '../../../../common/utils/Server/HttpStatus'
import { difficultyOptions } from '../const/options/difficulty'
const router = express.Router()

type GetDifficultyOptionsRes = TypedResponse<GetGymDifficultyOptionsResponse>
router.get('/', async (req: TypedRequest, res: GetDifficultyOptionsRes) => {
    res.status(HttpStatus.OK).json(difficultyOptions)
})

export default router
