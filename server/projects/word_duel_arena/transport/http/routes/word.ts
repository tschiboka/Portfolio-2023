import express from 'express'

const router = express.Router()
import auth from '../../../../../middlewares/auth'
import { handleGetWordList, handleGetAnagramMap, handleGetFrequencies } from '../handlers/word'

router.get('/list', [auth], handleGetWordList)
router.get('/anagrams', [auth], handleGetAnagramMap)
router.get('/frequencies', [auth], handleGetFrequencies)

export default router
