import { RegistrationFormData } from './Register.types'
import { omit } from 'ramda'
import { PostUserResponse } from '@types'
import { Paths, Query } from '@utils'

export const useRegisterApi = () => {
    const registerRequest = new Query.RequestBuilder(Paths.Api.RegisterUser).build()

    return {
        registerFormRequest: (data: RegistrationFormData) => {
            const user = omit(['passwordConfirmation'])(data)
            return registerRequest.post<PostUserResponse>(user)
        },
    }
}
