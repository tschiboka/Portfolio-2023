import express from 'express'
import { GetGymMuscleGroupOptionsResponse, TypedRequest, TypedResponse } from '@common/types'
import { HttpStatus } from '../../../../common/utils/Server/HttpStatus'
import { muscleGroupOptions } from '../const/options/muscleGroup'
const router = express.Router()

type GetMuscleGroupOptionsRes = TypedResponse<GetGymMuscleGroupOptionsResponse>
router.get('/', async (req: TypedRequest, res: GetMuscleGroupOptionsRes) => {
    res.status(HttpStatus.OK).json(muscleGroupOptions)
})

export default router
