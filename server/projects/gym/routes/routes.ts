import express from 'express'
import routinesRouter from './routines'
import exercisesRouter from './exercises'
import difficultyRouter from './difficulty'
import equipmentRouter from './equipment'
import muscleGroupRouter from './muscleGroup'
const router = express.Router()

router.use('/routines', routinesRouter)
router.use('/exercises', exercisesRouter)
router.use('/difficulty', difficultyRouter)
router.use('/equipment', equipmentRouter)
router.use('/muscle-group', muscleGroupRouter)

export default router
