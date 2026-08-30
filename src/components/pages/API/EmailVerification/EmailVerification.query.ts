import { Paths, Query } from '@utils'
import { AxiosResponse } from 'axios'

export const verifyEmailRequest = async (data: {
    token: string
}): Promise<AxiosResponse<{ token: string }>> => {
    const request = new Query.RequestBuilder(Paths.Api.ConfirmRegistration).build()
    return request.post<{ token: string }>(data)
}
