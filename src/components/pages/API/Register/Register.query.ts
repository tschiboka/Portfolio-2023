import { apiPathBuilder } from '../../../../routing/apiPathBuilder'
import { RegistrationFormData } from './Register.types'
import axios from 'axios'
import { omit } from 'ramda'
import { PostUserResponse } from '@common/types'

export const registerUserRequest = async (data: RegistrationFormData) => {
    const path = apiPathBuilder('REGISTER_USER')
    const user = omit(['passwordConfirmation'])(data)

    return await axios.post<PostUserResponse>(path, user)
}
