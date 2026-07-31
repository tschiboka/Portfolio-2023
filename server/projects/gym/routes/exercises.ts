import express from 'express'
import { GetGymExercisesResponse, TypedRequest, TypedResponse } from '@common/types'
import { HttpStatus } from '../../../../common/utils/Server/HttpStatus'
import { GymExercise } from '../models/models'
import auth from '../../../middlewares/auth'
const router = express.Router()

type GetUserExercisesRes = TypedResponse<GetGymExercisesResponse>
router.get('/', [auth], async (req: TypedRequest, res: GetUserExercisesRes) => {
    const exercises = await GymExercise.find()
    res.status(HttpStatus.OK).json({ exercises })
})

export default router
