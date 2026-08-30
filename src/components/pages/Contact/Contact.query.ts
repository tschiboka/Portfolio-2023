import { PostMessageResponse } from '@types'
import { Paths, Query } from '@utils'

export const useContactApi = () => {
    const messageRequest = new Query.RequestBuilder(Paths.Api.Message).build()

    return {
        sendMessageRequest: (data: {
            name: string
            email: string
            phone?: string
            message: string
        }) => messageRequest.post<PostMessageResponse>(data),
    }
}
