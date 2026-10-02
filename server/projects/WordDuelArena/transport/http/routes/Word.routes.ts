import express from 'express'
const router = express.Router()
import { UsersMiddleware } from '../../../../../App/Users/Users.middleware'
import { WordController } from '../handlers/Word.controller'

const { auth } = UsersMiddleware

router.get('/list', [auth], WordController.GetWordList)
router.get('/anagrams', [auth], WordController.GetAnagramMap)
router.get('/frequencies', [auth], WordController.GetFrequencies)

export default router
