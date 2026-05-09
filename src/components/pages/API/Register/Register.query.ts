import { RegistrationFormData } from './Register.types'
import { omit } from 'ramda'
import { PostUserResponse } from '@common/types'
import { Paths } from '@common/utils'
import { useApi } from '@common/utils/Query/Query'

export const useRegisterApi = () => {
    const registerApi = useApi(Paths.Api.RegisterUser).build()

    return {
        registerFormRequest: (data: RegistrationFormData) => {
            const user = omit(['passwordConfirmation'])(data)
            return registerApi.post<PostUserResponse>(user)
        },
    }
}
