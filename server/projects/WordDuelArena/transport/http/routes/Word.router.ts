import express from 'express'
import { WordController } from '../handlers'
import { UsersMiddleware } from '../../../../../App/Users'

const router = express.Router()
const { auth } = UsersMiddleware

router.get('/list', [auth], WordController.GetWordList)
router.get('/anagrams', [auth], WordController.GetAnagramMap)
router.get('/frequencies', [auth], WordController.GetFrequencies)

export const WordRouter = router
