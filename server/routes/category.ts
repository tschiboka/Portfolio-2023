import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import auth from '../middlewares/auth'
import { getUserToken } from '../models/user'
import { Category, validateCategory } from '../models/category'
import {
    GetCategoryResponse,
    ErrorResponse,
    TypedRequest,
    TypedResponse,
    PostCategoryRequest,
} from '@common/types'
import { HttpStatus } from '../common/HttpStatus/HttpStatus'

const router = express.Router()

type GetCategoriesReq = TypedRequest<{ query: { isParent?: string } }>
type GetCategoriesRes = TypedResponse<{ data: GetCategoryResponse[] } | ErrorResponse>
router.get('/', [auth], async (req: GetCategoriesReq, res: GetCategoriesRes) => {
    const user = await getUserToken(req)
    if (!user)
        return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'User not found' })

    // Find categories with parent
    if (req.query.isParent) {
        const categories: GetCategoryResponse[] = await Category.find({
            userId: user._id,
            isParent: true,
        }).select('-_id, -__v')
        return res.status(HttpStatus.OK).json({ data: categories })
    }

    // Find user categories
    const categories: GetCategoryResponse[] = await Category.find({
        userId: user._id,
    }).select('-_id, -__v')
    res.status(HttpStatus.OK).json({ data: categories })
})

type PostCategoryReq = TypedRequest<{ body: PostCategoryRequest }>
type PostCategoryRes = TypedResponse<ErrorResponse>
router.post('/', [auth], async (req: PostCategoryReq, res: PostCategoryRes) => {
    const user = await getUserToken(req)
    if (!user)
        return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'User not found' })

    // Find if category exists for user
    const categoryWithUser = await Category.find({
        userId: user._id,
        name: { $regex: new RegExp(`^${req.body.name}$`, 'i') },
    })
    if (categoryWithUser.length)
        return res
            .status(HttpStatus.CONFLICT)
            .json({ success: false, message: 'Category exists for user' })

    // Find if parent category exists with user
    const { parentId } = req.body
    if (parentId) {
        const isValidId = mongoose.Types.ObjectId.isValid(new mongoose.Types.ObjectId(parentId))
        if (!isValidId)
            return res
                .status(HttpStatus.BAD_REQUEST)
                .json({ success: false, message: 'Invalid parent id: ' + parentId })

        const parent = await Category.findOne({
            _id: parentId,
            userId: user._id,
        })
        if (!parent)
            return res
                .status(HttpStatus.NOT_FOUND)
                .json({ success: false, message: "Parent don't exist" })

        if (!parent.isParent)
            return res.status(HttpStatus.BAD_REQUEST).json({
                success: false,
                message: 'Parent settings are disabled on category: ' + parent.name,
            })
    }

    // Validate category
    const { error } = validateCategory({ ...req.body })
    if (error)
        return res
            .status(HttpStatus.BAD_REQUEST)
            .json({ success: false, message: error.details[0].message })

    // Create category
    const category = new Category({ ...req.body, userId: user._id })
    await category.save()
    return res.status(HttpStatus.CREATED).send()
})

export default router
