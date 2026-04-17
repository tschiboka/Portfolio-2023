import { Paths } from '@common/utils'
import { RequestBuilder } from '@common/utils/Query/Query'
import { AxiosResponse } from 'axios'

export const useVerifyEmailRequest: (data: {
    token: string
}) => Promise<AxiosResponse<{ token: string }, any>> = async (data) =>
    new RequestBuilder(Paths.Api.ConfirmRegistration).build().post(data)
