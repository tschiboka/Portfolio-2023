import express from 'express'
import { ApiMessage, ApiResponder } from '../../../../common/utils/Server'
import { UsersAuth } from '../../../Users/Users.auth'
import { auth } from '../../../Users/Users.middlewares'
import { RoutinesService } from './Routines.service'
import type {
    DeleteRoutineReq,
    DeleteRoutineRes,
    GetRoutineReq,
    GetRoutinesRes,
    PatchRoutineReq,
    PatchRoutineRes,
    PostRoutineReq,
    PostRoutineRes,
} from './Routines.types'
const router = express.Router()

// Return the requesting user's own routines plus any system routines.
router.get('/', [auth], async (req: GetRoutineReq, res: GetRoutinesRes) => {
    const user = await UsersAuth.user.getCurrent(req)
    const routines = await RoutinesService.listVisibleTo(user)
    ApiResponder.ok(res, { routines })
})

router.post('/', [auth], async (req: PostRoutineReq, res: PostRoutineRes) => {
    const user = await UsersAuth.user.getCurrent(req)
    const routine = await RoutinesService.create(req.body, user)
    ApiResponder.created(res, routine)
})

router.patch('/:id', [auth], async (req: PatchRoutineReq, res: PatchRoutineRes) => {
    const user = await UsersAuth.user.getCurrent(req)
    const routine = await RoutinesService.update(req.params.id, req.body, user)
    ApiResponder.ok(res, routine)
})

router.delete('/:id', [auth], async (req: DeleteRoutineReq, res: DeleteRoutineRes) => {
    const user = await UsersAuth.user.getCurrent(req)
    await RoutinesService.remove(req.params.id, user)
    ApiResponder.ok(res, { message: ApiMessage.deleted('routine') })
})

export { router as RoutinesRouter }
