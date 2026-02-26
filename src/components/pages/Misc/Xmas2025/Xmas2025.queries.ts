import { useMutation, useQuery } from '@tanstack/react-query'
import { apiPathBuilder, ApiPaths } from '../../../../routing/apiPathBuilder'
import {
    GetXmasCandlesResponse,
    GetXmasMessagesResponse,
    GetXmasPingResponse,
    PostXmasMessageRequest,
    PostXmasMessageResponse,
    PutXmasCandlesRequest,
    PutXmasCandlesResponse,
} from '@common/types'
import { useSessionContext } from '../../../../context/SessionContext/Session.context'
import axios from 'axios'

export const useGetPagePingData = () =>
    useQuery({
        queryKey: ['xmas-page-ping'],
        queryFn: async () =>
            await axios.get<GetXmasPingResponse>(
                apiPathBuilder(ApiPaths.PROJECT_XMAS, { prefix: '' }),
            ),
    })

type UsePostMessage = { onSuccess: () => void }
export const usePostMessage = ({ onSuccess }: UsePostMessage) => {
    const token = useSessionContext().session?.token

    return useMutation({
        mutationKey: ['xmas-message'],
        mutationFn: async (payload: PostXmasMessageRequest) =>
            await axios.post<PostXmasMessageResponse>(
                apiPathBuilder(ApiPaths.PROJECT_XMAS, { prefix: '' }) + '/message',
                payload,
                { headers: { 'x-auth-token': token } },
            ),
        onSuccess,
    })
}

type UseGetMessages = { userId?: string }
export const useGetMessages = ({ userId }: UseGetMessages) => {
    const token = useSessionContext().session?.token

    return useQuery({
        queryKey: ['xmas-message'],
        queryFn: async () =>
            await axios.get<GetXmasMessagesResponse>(
                apiPathBuilder(ApiPaths.PROJECT_XMAS, { prefix: '' }) + '/message',
                { params: { userId }, headers: { 'x-auth-token': token } },
            ),
        enabled: Boolean(userId),
    })
}

export const useGetCandles = () => {
    const token = useSessionContext().session?.token

    return useQuery({
        queryKey: ['xmas-candles'],
        queryFn: async () =>
            await axios.get<GetXmasCandlesResponse>(
                apiPathBuilder(ApiPaths.PROJECT_XMAS, { prefix: '' }) + '/candles',
                { headers: { 'x-auth-token': token } },
            ),
        enabled: Boolean(token),
    })
}

export const usePutCandles = () => {
    const token = useSessionContext().session?.token

    return useMutation({
        mutationKey: ['xmas-candles'],
        mutationFn: async (payload: PutXmasCandlesRequest) =>
            await axios.put<PutXmasCandlesResponse>(
                apiPathBuilder(ApiPaths.PROJECT_XMAS, { prefix: '' }) + '/candles',
                payload,
                { headers: { 'x-auth-token': token } },
            ),
    })
}
