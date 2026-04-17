import { RegistrationFormData } from './Register.types'
import { omit } from 'ramda'
import { PostUserResponse } from '@common/types'
import { Paths } from '@common/utils'
import { RequestBuilder } from '@common/utils/Query/Query'

export const registerUserRequest = async (data: RegistrationFormData) => {
    const user = omit(['passwordConfirmation'])(data)
    return new RequestBuilder(Paths.Api.RegisterUser).build().post<PostUserResponse>(user)
}
