import express from 'express'
import { GetGymEquipmentOptionsResponse, TypedRequest, TypedResponse } from '@common/types'
import { HttpStatus } from '../../../../common/utils/Server/HttpStatus'
import { equipmentOptions } from '../const/options/equipment'
const router = express.Router()

type GetEquipmentOptionsRes = TypedResponse<GetGymEquipmentOptionsResponse>
router.get('/', async (req: TypedRequest, res: GetEquipmentOptionsRes) => {
    res.status(HttpStatus.OK).json(equipmentOptions)
})

export default router
