import { Paths } from '@common/utils'
import { RequestBuilder } from '@common/utils/Query/Query'
import { AxiosResponse } from 'axios'

export const verifyEmailRequest = async (data: {
    token: string
}): Promise<AxiosResponse<{ token: string }>> =>
    new RequestBuilder(Paths.Api.ConfirmRegistration).build().post<{ token: string }>(data)
