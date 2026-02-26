import {
    PostLoginRequest,
    PostLoginResponse,
    GetSettingsResponse,
    GetSessionResponse,
} from '@common/types/app'
import { apiPathBuilder } from '../../../../routing/apiPathBuilder'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export const loginFormRequest = async (data: PostLoginRequest) => {
    const path = apiPathBuilder('LOGIN')
    return await axios.post<PostLoginResponse>(path, data)
}

export const settingsRequest = async () => {
    const path = apiPathBuilder('SETTINGS')
    return await axios.get<GetSettingsResponse>(path)
}

export const useRehydrateSessionResources = (token?: string) => {
    const path = apiPathBuilder('REHYDRATE_SESSION')

    return useQuery({
        queryKey: ['rehydrateSession', token],
        queryFn: async () =>
            await axios.get<GetSessionResponse>(path, { headers: { 'x-auth-token': token } }),
        enabled: !!token,
        retry: 1,
        staleTime: 0,
        refetchOnWindowFocus: false,
    })
}
