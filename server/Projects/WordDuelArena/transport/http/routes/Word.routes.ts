import express from 'express'
const router = express.Router()
import { auth } from '../../../../../App/Users/Users.middleware'
import {
    handleGetWordList,
    handleGetAnagramMap,
    handleGetFrequencies,
} from '../handlers/Word.controller'

router.get('/list', [auth], handleGetWordList)
router.get('/anagrams', [auth], handleGetAnagramMap)
router.get('/frequencies', [auth], handleGetFrequencies)

export default router
