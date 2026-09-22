import * as yup from 'yup'
import { Regexp, ValidationMessage } from '@common-utils'
import { MESSAGE_MAX, MESSAGE_MIN, NAME_MAX, NAME_MIN } from './Xmas2025.constants'
import { XmasFormData } from './Xmas2025.types'

export const XmasSchema: yup.ObjectSchema<XmasFormData> = yup.object({
    name: yup
        .string()
        .required(ValidationMessage.Required('Name'))
        .min(NAME_MIN, ValidationMessage.Bound('Name', NAME_MIN, 'characters', 'at least'))
        .max(NAME_MAX, ValidationMessage.Bound('Name', NAME_MAX, 'characters', 'under'))
        .matches(Regexp.Alphanumeric, ValidationMessage.Allowed('Name', 'alphanumerics')),
    message: yup
        .string()
        .required(ValidationMessage.Required('Message'))
        .min(MESSAGE_MIN, ValidationMessage.Bound('Message', MESSAGE_MIN, 'character', 'at least'))
        .max(MESSAGE_MAX, ValidationMessage.Bound('Message', MESSAGE_MAX, 'characters', 'under'))
        .matches(
            Regexp.MessageText,
            ValidationMessage.Allowed('Message', 'letters, numbers and punctuation'),
        ),
})
