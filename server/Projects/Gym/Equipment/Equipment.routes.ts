import express from 'express'
import { ApiResponder } from '@utils'
import { equipmentOptions } from './Equipment.options'
import type { GetEquipmentOptionsRes, GetEquipmentReq } from './Equipment.types'
const router = express.Router()

router.get('/', async (_: GetEquipmentReq, res: GetEquipmentOptionsRes) => {
    ApiResponder.ok(res, { equipment: [...equipmentOptions] })
})

export { router as EquipmentRouter }
