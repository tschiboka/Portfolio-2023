import express from 'express'
import mongoose from 'mongoose'
import {
    GetGymExercisesResponse,
    GymExerciseResource,
    PatchGymExerciseRequest,
    PostGymExerciseRequest,
    TypedRequest,
    TypedResponse,
} from '@common/types'
import { HttpStatus } from '../../../../common/utils/Server/HttpStatus'
import { getUserToken } from '../../../models/user'
import { GymExercise, validateGymExercise } from '../models/models'
import auth from '../../../middlewares/auth'
import admin from '../../../middlewares/admin'
const router = express.Router()

type GetExercisesRes = TypedResponse<GetGymExercisesResponse>

// Return canonical exercises plus the requesting user's own private exercises.
router.get('/', [auth], async (req: TypedRequest, res: GetExercisesRes) => {
    const user = await getUserToken(req)
    if (!user)
        return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'User not found' })

    const exercises = await GymExercise.find({
        $or: [{ source: 'canonical' }, { source: 'user', ownerId: user._id }],
    })
    res.status(HttpStatus.OK).json({
        exercises: exercises.map(
            (exercise) =>
                ({
                    ...exercise.toObject(),
                    _id: exercise._id.toString(),
                }) as unknown as GymExerciseResource,
        ),
    })
})

type PostExerciseReq = TypedRequest<{
    body: PostGymExerciseRequest
    params: Record<string, string>
}>
type PostExerciseRes = TypedResponse
router.post('/', [auth, admin], async (req: PostExerciseReq, res: PostExerciseRes) => {
    const { error } = validateGymExercise({ ...req.body, source: 'canonical' })
    if (error)
        return res
            .status(HttpStatus.BAD_REQUEST)
            .json({ success: false, message: error.details[0].message })

    const exercise = new GymExercise({ ...req.body, source: 'canonical' })
    await exercise.save()
    res.status(HttpStatus.CREATED).json({ success: true, data: exercise })
})

type PatchExerciseReq = TypedRequest<{ body: PatchGymExerciseRequest; params: { id: string } }>
type PatchExerciseRes = TypedResponse
router.patch('/:id', [auth], async (req: PatchExerciseReq, res: PatchExerciseRes) => {
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id))
        return res
            .status(HttpStatus.BAD_REQUEST)
            .json({ success: false, message: 'Invalid exercise id' })

    const user = await getUserToken(req)
    if (!user)
        return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'User not found' })

    const exercise = await GymExercise.findById(id)
    if (!exercise)
        return res
            .status(HttpStatus.NOT_FOUND)
            .json({ success: false, message: 'Exercise not found' })

    // Canonical exercises may only be edited by admins; user exercises only by their owner.
    if (exercise.source === 'canonical' && !user.isAdmin)
        return res
            .status(HttpStatus.FORBIDDEN)
            .json({ success: false, message: 'Forbidden: access denied!' })
    if (exercise.source === 'user' && exercise.ownerId?.toString() !== user._id.toString())
        return res
            .status(HttpStatus.FORBIDDEN)
            .json({ success: false, message: 'Forbidden: access denied!' })

    const { error } = validateGymExercise({ ...exercise.toObject(), ...req.body })
    if (error)
        return res
            .status(HttpStatus.BAD_REQUEST)
            .json({ success: false, message: error.details[0].message })

    exercise.set(req.body)
    await exercise.save()
    res.status(HttpStatus.OK).json({ success: true, data: exercise })
})

type DeleteExerciseReq = TypedRequest<{ params: { id: string } }>
type DeleteExerciseRes = TypedResponse
router.delete('/:id', [auth], async (req: DeleteExerciseReq, res: DeleteExerciseRes) => {
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id))
        return res
            .status(HttpStatus.BAD_REQUEST)
            .json({ success: false, message: 'Invalid exercise id' })

    const user = await getUserToken(req)
    if (!user)
        return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'User not found' })

    const exercise = await GymExercise.findById(id)
    if (!exercise)
        return res
            .status(HttpStatus.NOT_FOUND)
            .json({ success: false, message: 'Exercise not found' })

    if (exercise.source === 'canonical' && !user.isAdmin)
        return res
            .status(HttpStatus.FORBIDDEN)
            .json({ success: false, message: 'Forbidden: access denied!' })
    if (exercise.source === 'user' && exercise.ownerId?.toString() !== user._id.toString())
        return res
            .status(HttpStatus.FORBIDDEN)
            .json({ success: false, message: 'Forbidden: access denied!' })

    await exercise.deleteOne()
    res.status(HttpStatus.OK).json({ success: true, message: 'Exercise deleted' })
})

export default router
