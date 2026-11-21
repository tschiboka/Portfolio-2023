import express from 'express'
import { LevelController } from '../handlers'
import { UsersMiddleware } from '../../../../../App/Users'

const router = express.Router()
const { auth } = UsersMiddleware

router.get('/name', LevelController.ListLevels)
router.get('/name/:name', LevelController.GetLevel)
router.post('/', [auth], LevelController.UpsertLevel)

export const LevelRouter = router
