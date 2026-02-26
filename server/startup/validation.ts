import Joi from 'joi'
import joiObjectId from 'joi-objectid'

export default function () {
    ;(Joi as any).objectId = joiObjectId(Joi)
}
