import express from 'express'
import { ApiResponder } from '@common-utils'
import { MuscleGroupOptions } from './MuscleGroup.options'
import type { GetMuscleGroupOptionsRes, GetMuscleGroupReq } from './MuscleGroup.types'

const router = express.Router()

router.get('/', (_: GetMuscleGroupReq, res: GetMuscleGroupOptionsRes) => {
    ApiResponder.ok(res, { muscleGroups: MuscleGroupOptions })
})

export { router as MuscleGroupRouter }
