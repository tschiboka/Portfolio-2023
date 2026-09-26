import express from 'express'
import { RoutinesRouter } from './Routines'
import { ExercisesRouter } from './Exercises'
import { DifficultyRouter } from './Difficulty'
import { EquipmentRouter } from './Equipment'
import { MuscleGroupRouter } from './MuscleGroup'
const router = express.Router()

router.use('/routines', RoutinesRouter)
router.use('/exercises', ExercisesRouter)
router.use('/difficulty', DifficultyRouter)
router.use('/equipment', EquipmentRouter)
router.use('/muscle-group', MuscleGroupRouter)

export { router as GymRouter }
