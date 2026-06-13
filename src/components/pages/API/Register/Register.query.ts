import { RegistrationFormData } from './Register.types'
import { omit } from 'ramda'
import { PostUserResponse } from '@common/types'
import { Paths, Query } from '@common/utils'

export const useRegisterApi = () => {
    const registerRequest = new Query.RequestBuilder(Paths.Api.RegisterUser).build()

    return {
        registerFormRequest: (data: RegistrationFormData) => {
            const user = omit(['passwordConfirmation'])(data)
            return registerRequest.post<PostUserResponse>(user)
        },
    }
}
