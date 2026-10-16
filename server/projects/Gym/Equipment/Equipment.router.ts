import express from 'express'
import { ApiResponder } from '@common-utils'
import { EquipmentOptions } from './Equipment.options'
import type { GetEquipmentOptionsRes, GetEquipmentReq } from './Equipment.types'
const router = express.Router()

router.get('/', (_: GetEquipmentReq, res: GetEquipmentOptionsRes) => {
    ApiResponder.ok(res, { equipment: [...EquipmentOptions] })
})

export { router as EquipmentRouter }
