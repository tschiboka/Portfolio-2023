import express from 'express'
const router = express.Router()
import { handleListLevels, handleGetLevel, handleUpsertLevel } from '../handlers/Level.controller'
import { auth } from '../../../../../App/Users/Users.middleware'

router.get('/name', handleListLevels)
router.get('/name/:name', handleGetLevel)
router.post('/', [auth], handleUpsertLevel)

export default router
