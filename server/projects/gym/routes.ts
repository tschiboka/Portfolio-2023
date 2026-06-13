import express from 'express'
import {
    GetGymExercisesResponse,
    GetGymUserRoutinesResponse,
    TypedRequest,
    TypedResponse,
} from '@common/types'
import { HttpStatus } from '../../../common/utils/Server/HttpStatus'
import { getUserToken } from '../../models/user'
import { GymExercise, GymRoutine } from './models'
import auth from '../../middlewares/auth'
const router = express.Router()

type GetUserRoutinesRes = TypedResponse<GetGymUserRoutinesResponse>
router.get('/routines', [auth], async (req: TypedRequest, res: GetUserRoutinesRes) => {
    const user = await getUserToken(req)
    if (!user)
        return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'User not found' })

    const routines = await GymRoutine.find()
    res.status(HttpStatus.OK).json({ routines })
})

type GetUserExercisesRes = TypedResponse<GetGymExercisesResponse>
router.get('/exercises', [auth], async (req: TypedRequest, res: GetUserExercisesRes) => {
    const exercises = await GymExercise.find()
    res.status(HttpStatus.OK).json({ exercises })
})

export default router
