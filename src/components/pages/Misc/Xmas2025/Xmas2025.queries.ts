import { useMutation, useQuery } from '@tanstack/react-query'
import {
    GetXmasCandlesResponse,
    GetXmasMessagesResponse,
    GetXmasPingResponse,
    PostXmasMessageRequest,
    PostXmasMessageResponse,
    PutXmasCandlesRequest,
    PutXmasCandlesResponse,
} from '@common/types'
import { Paths, QueryKey } from '@common/utils'
import { useApi } from '@common/utils/Query/Query'

export const useGetPagePingData = () => {
    const api = useApi(Paths.Projects.Xmas).build()

    return useQuery({
        queryKey: QueryKey.XmasPagePing.build(),
        queryFn: async () => await api.get<GetXmasPingResponse>(),
    })
}

type UsePostMessage = { onSuccess: () => void }
export const usePostMessage = ({ onSuccess }: UsePostMessage) => {
    const api = useApi(Paths.Projects.Xmas).setPath('/message').setToken().build()

    return useMutation({
        mutationKey: QueryKey.XmasMessage.build(),
        mutationFn: async (payload: PostXmasMessageRequest) =>
            await api.post<PostXmasMessageResponse>(payload),
        onSuccess,
    })
}

type UseGetMessages = { userId?: string }
export const useGetMessages = ({ userId }: UseGetMessages) => {
    const api = useApi(Paths.Projects.Xmas)
        .setPath('/message')
        .setQuery({ userId })
        .setToken()
        .build()

    return useQuery({
        queryKey: QueryKey.XmasMessage.build(),
        queryFn: async () => await api.get<GetXmasMessagesResponse>(),
        enabled: Boolean(userId),
    })
}

export const useGetCandles = () => {
    const api = useApi(Paths.Projects.Xmas).setPath('/candles').setToken().build()

    return useQuery({
        queryKey: QueryKey.XmasCandles.build(),
        queryFn: async () => await api.get<GetXmasCandlesResponse>(),
        enabled: Boolean(api),
    })
}

export const usePutCandles = () => {
    const api = useApi(Paths.Projects.Xmas).setPath('/candles').setToken().build()

    return useMutation({
        mutationKey: QueryKey.XmasCandles.build(),
        mutationFn: async (payload: PutXmasCandlesRequest) =>
            await api.put<PutXmasCandlesResponse>(payload),
    })
}
