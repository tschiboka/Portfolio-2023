import { PostMessageResponse } from '@common/types'
import { Paths } from '@common/utils'
import { useApi } from '@common/utils/Query/Query'

export const useContactApi = () => {
    const messageApi = useApi(Paths.Api.Message).build()

    return {
        sendMessageRequest: (data: {
            name: string
            email: string
            phone?: string
            message: string
        }) => messageApi.post<PostMessageResponse>(data),
    }
}
