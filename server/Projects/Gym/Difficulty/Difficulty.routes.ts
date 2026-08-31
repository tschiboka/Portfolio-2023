import express from 'express'
import { ApiResponder } from '@common-utils'
import { difficultyOptions } from './Difficulty.options'
import type { GetDifficultyReq, GetDifficultyOptionsRes } from './Difficulty.types'
const router = express.Router()

router.get('/', async (_: GetDifficultyReq, res: GetDifficultyOptionsRes) => {
    ApiResponder.ok(res, { difficulties: difficultyOptions })
})

export { router as DifficultyRouter }
