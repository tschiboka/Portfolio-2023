import express from 'express'
const router = express.Router()
import { LevelController } from '../handlers/Level.controller'
import { UsersMiddleware } from '../../../../../App/Users/Users.middleware'

const { auth } = UsersMiddleware

router.get('/name', LevelController.ListLevels)
router.get('/name/:name', LevelController.GetLevel)
router.post('/', [auth], LevelController.UpsertLevel)

export default router
