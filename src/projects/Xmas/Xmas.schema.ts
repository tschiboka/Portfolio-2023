import * as yup from 'yup'
import { Regexp, ValidationMessage } from '@common-utils'
import { XmasConstants } from './Xmas.constants'
import type { ObjectSchema } from 'yup'
import type { XmasFormData } from './Xmas.types'

export const XmasSchema: ObjectSchema<XmasFormData> = yup.object({
    name: yup
        .string()
        .required(ValidationMessage.Required('Name'))
        .min(
            XmasConstants.nameMin,
            ValidationMessage.Bound('Name', XmasConstants.nameMin, 'characters', 'at least'),
        )
        .max(
            XmasConstants.nameMax,
            ValidationMessage.Bound('Name', XmasConstants.nameMax, 'characters', 'under'),
        )
        .matches(Regexp.Alphanumeric, ValidationMessage.Allowed('Name', 'alphanumerics')),
    message: yup
        .string()
        .required(ValidationMessage.Required('Message'))
        .min(
            XmasConstants.messageMin,
            ValidationMessage.Bound('Message', XmasConstants.messageMin, 'character', 'at least'),
        )
        .max(
            XmasConstants.messageMax,
            ValidationMessage.Bound('Message', XmasConstants.messageMax, 'characters', 'under'),
        )
        .matches(
            Regexp.MessageText,
            ValidationMessage.Allowed('Message', 'letters, numbers and punctuation'),
        ),
})
