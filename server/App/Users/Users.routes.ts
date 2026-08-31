import express from 'express'
import { ApiResponder } from '@common-utils'
import { UsersService } from './Users.service'
import { UsersAuth } from './Users.auth'
import { auth, admin } from './Users.middlewares'
import type {
    GetUserReq,
    GetUserRes,
    GetUsersReq,
    GetUsersRes,
    PostConfirmReq,
    PostConfirmRes,
    PostLoginReq,
    PostLoginRes,
    PostUserReq,
    PostUserRes,
    SessionReq,
    SessionRes,
} from './Users.types'

const router = express.Router()

// GET /api/user â€” list all users (admin-facing).
router.get('/', [auth, admin], async (_req: GetUsersReq, res: GetUsersRes) => {
    const users = await UsersService.list()
    ApiResponder.ok(res, { users })
})

// GET /api/user/session â€” the current session's user and settings.
router.get('/session', [auth], async (req: SessionReq, res: SessionRes) => {
    const current = await UsersAuth.user.getCurrent(req)
    const data = await UsersService.session(current)
    ApiResponder.ok(res, data)
})

// GET /api/user/:id â€” single user by id.
router.get('/:id', [auth], async (req: GetUserReq, res: GetUserRes) => {
    const user = await UsersService.get(req.params.id)
    ApiResponder.ok(res, user)
})

// POST /api/user/register â€” register a new user (sends a confirmation email).
router.post('/register', async (req: PostUserReq, res: PostUserRes) => {
    const message = await UsersService.register(req.body)
    ApiResponder.created(res, { message })
})

// POST /api/user/login â€” log a user in, returning an auth token + session data.
router.post('/login', async (req: PostLoginReq, res: PostLoginRes) => {
    const data = await UsersService.login(req.body)
    ApiResponder.ok(res, data)
})

// POST /api/user/confirm â€” confirm a registration token and create the user.
router.post('/confirm', async (req: PostConfirmReq, res: PostConfirmRes) => {
    const data = await UsersService.confirm(req.body)
    ApiResponder.ok(res, data)
})

export { router as UsersRouter }
