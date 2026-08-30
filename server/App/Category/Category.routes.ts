import express from 'express'
import { ApiResponder } from '@utils'
import { UsersAuth } from '../Users/Users.auth'
import { auth } from '../Users/Users.middlewares'
import { CategoryService } from './Category.service'
import type {
    GetCategoriesReq,
    GetCategoriesRes,
    PostCategoryReq,
    PostCategoryRes,
} from './Category.types'

const router = express.Router()

// GET /api/categories â€” the requesting user's categories (optionally parents only).
router.get('/', [auth], async (req: GetCategoriesReq, res: GetCategoriesRes) => {
    const user = await UsersAuth.user.getCurrent(req)
    const categories = await CategoryService.list(user, Boolean(req.query.isParent))
    ApiResponder.ok(res, { data: categories })
})

// POST /api/categories â€” create a category for the requesting user.
router.post('/', [auth], async (req: PostCategoryReq, res: PostCategoryRes) => {
    const user = await UsersAuth.user.getCurrent(req)
    await CategoryService.create(user, req.body)
    ApiResponder.created(res)
})

export { router as CategoryRouter }
