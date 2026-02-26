import { LoginFormData } from './Login.types'
import { LoginResponse, SettingsGetResponse } from '../common/types'
import { apiPathBuilder } from '../../../../routing/apiPathBuilder'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export const loginFormRequest = async (data: LoginFormData) => {
    const path = apiPathBuilder('LOGIN')
    return await axios.post<LoginResponse>(path, data)
}

export const settingsRequest = async () => {
    const path = apiPathBuilder('SETTINGS')
    return await axios.get<SettingsGetResponse>(path)
}

export const useRehydrateSessionResources = (token?: string) => {
    const path = apiPathBuilder('REHYDRATE_SESSION')

    return useQuery({
        queryKey: ['rehydrateSession', token],
        queryFn: async () => await axios.get(path, { headers: { 'x-auth-token': token } }),
        enabled: !!token,
        retry: 1,
        staleTime: 0,
        refetchOnWindowFocus: false,
    })
}
