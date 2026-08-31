import express from 'express'
import { ApiResponder } from '@common-utils'
import { muscleGroupOptions } from './MuscleGroup.options'
import type { GetMuscleGroupOptionsRes, GetMuscleGroupReq } from './MuscleGroup.types'
const router = express.Router()

router.get('/', async (_: GetMuscleGroupReq, res: GetMuscleGroupOptionsRes) => {
    ApiResponder.ok(res, { muscleGroups: muscleGroupOptions })
})

export { router as MuscleGroupRouter }
