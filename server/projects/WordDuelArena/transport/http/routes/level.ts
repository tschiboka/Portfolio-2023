import express from 'express'

const router = express.Router()
import { handleListLevels, handleGetLevel, handleUpsertLevel } from '../handlers/level'
import { auth } from '../../../../../Users/Users.middlewares'

router.get('/name', handleListLevels)
router.get('/name/:name', handleGetLevel)
router.post('/', [auth], handleUpsertLevel)

export default router
