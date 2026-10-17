import express from 'express'
const router = express.Router()
import { WordController } from '../handlers/Word.controller'
import { UsersMiddleware } from '../../../../../App/Users/Users.middleware'

const { auth } = UsersMiddleware

router.get('/list', [auth], WordController.GetWordList)
router.get('/anagrams', [auth], WordController.GetAnagramMap)
router.get('/frequencies', [auth], WordController.GetFrequencies)

export const WordRouter = router
