import express from 'express'
import { ApiResponder } from '@common-utils'
import { DifficultyOptions } from './Difficulty.options'
import type { GetDifficultyReq, GetDifficultyOptionsRes } from './Difficulty.types'

const router = express.Router()

router.get('/', (_: GetDifficultyReq, res: GetDifficultyOptionsRes) => {
    ApiResponder.ok(res, { difficulties: DifficultyOptions })
})

export { router as DifficultyRouter }
