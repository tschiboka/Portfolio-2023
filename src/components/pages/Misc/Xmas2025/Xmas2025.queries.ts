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
import { Paths, QueryKey, Query } from '@common/utils'

export const useGetPagePingData = () => {
    const request = new Query.RequestBuilder(Paths.Projects.Xmas).build()

    return useQuery({
        queryKey: QueryKey.XmasPagePing.build(),
        queryFn: async () => await request.get<GetXmasPingResponse>(),
    })
}

type UsePostMessage = { onSuccess: () => void }
export const usePostMessage = ({ onSuccess }: UsePostMessage) => {
    const request = new Query.RequestBuilder(Paths.Projects.Xmas)
        .setSubpath('/message')
        .withAuthToken()
        .build()

    return useMutation({
        mutationKey: QueryKey.XmasMessage.build(),
        mutationFn: async (payload: PostXmasMessageRequest) =>
            await request.post<PostXmasMessageResponse>(payload),
        onSuccess,
    })
}

type UseGetMessages = { userId?: string }
export const useGetMessages = ({ userId }: UseGetMessages) => {
    const request = new Query.RequestBuilder(Paths.Projects.Xmas)
        .setSubpath('/message')
        .setQuery({ userId })
        .withAuthToken()
        .build()

    return useQuery({
        queryKey: QueryKey.XmasMessage.build(),
        queryFn: async () => await request.get<GetXmasMessagesResponse>(),
        enabled: Boolean(userId),
    })
}

export const useGetCandles = () => {
    const request = new Query.RequestBuilder(Paths.Projects.Xmas)
        .setSubpath('/candles')
        .withAuthToken()
        .build()

    return useQuery({
        queryKey: QueryKey.XmasCandles.build(),
        queryFn: async () => await request.get<GetXmasCandlesResponse>(),
        enabled: Boolean(request),
    })
}

export const usePutCandles = () => {
    const request = new Query.RequestBuilder(Paths.Projects.Xmas)
        .setSubpath('/candles')
        .withAuthToken()
        .build()

    return useMutation({
        mutationKey: QueryKey.XmasCandles.build(),
        mutationFn: async (payload: PutXmasCandlesRequest) =>
            await request.put<PutXmasCandlesResponse>(payload),
    })
}
