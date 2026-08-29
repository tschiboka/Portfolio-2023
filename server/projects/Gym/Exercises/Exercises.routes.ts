import express from 'express'
import { ApiMessage, ApiResponder } from '../../../../common/utils/Server'
import { UsersAuth } from '../../../Users/Users.auth'
import { auth, admin } from '../../../Users/Users.middlewares'
import { ExercisesService } from './Exercises.service'
import type {
    DeleteExerciseReq,
    DeleteExerciseRes,
    GetExerciseReq,
    GetExercisesRes,
    PatchExerciseReq,
    PatchExerciseRes,
    PostExerciseReq,
    PostExerciseRes,
} from './Exercises.types'
const router = express.Router()

// Return canonical exercises plus the requesting user's own private exercises.
router.get('/', [auth], async (req: GetExerciseReq, res: GetExercisesRes) => {
    const user = await UsersAuth.user.getCurrent(req)
    const exercises = await ExercisesService.listVisibleTo(user)
    ApiResponder.ok(res, { exercises })
})

router.post('/', [auth, admin], async (req: PostExerciseReq, res: PostExerciseRes) => {
    const exercise = await ExercisesService.create({ ...req.body, source: 'canonical' })
    ApiResponder.created(res, exercise)
})

router.patch('/:id', [auth], async (req: PatchExerciseReq, res: PatchExerciseRes) => {
    const user = await UsersAuth.user.getCurrent(req)
    const exercise = await ExercisesService.update(req.params.id, req.body, user)
    ApiResponder.ok(res, exercise)
})

router.delete('/:id', [auth], async (req: DeleteExerciseReq, res: DeleteExerciseRes) => {
    const user = await UsersAuth.user.getCurrent(req)
    await ExercisesService.remove(req.params.id, user)
    ApiResponder.ok(res, { message: ApiMessage.deleted('exercise') })
})

export { router as ExercisesRouter }
