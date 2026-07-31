import express from 'express'
import { GetGymUserRoutinesResponse, TypedRequest, TypedResponse } from '@common/types'
import { HttpStatus } from '../../../../common/utils/Server/HttpStatus'
import { getUserToken } from '../../../models/user'
import { GymRoutine } from '../models/models'
import auth from '../../../middlewares/auth'
const router = express.Router()

type GetUserRoutinesRes = TypedResponse<GetGymUserRoutinesResponse>
router.get('/', [auth], async (req: TypedRequest, res: GetUserRoutinesRes) => {
    const user = await getUserToken(req)
    if (!user)
        return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'User not found' })

    const routines = await GymRoutine.find()
    res.status(HttpStatus.OK).json({ routines })
})

export default router
