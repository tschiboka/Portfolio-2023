import {
    PostLoginRequest,
    PostLoginResponse,
    GetSettingsResponse,
    GetSessionResponse,
} from '@common/types/app'
import { useQuery } from '@tanstack/react-query'
import { isDefined, Paths, QueryKey } from '@common/utils'
import { RequestBuilder, useApi } from '@common/utils/Query/Query'

export const useLoginApi = () => {
    const loginApi = useApi(Paths.Api.Login).build()
    const settingsApi = useApi(Paths.Api.Settings).build()

    return {
        loginFormRequest: (data: PostLoginRequest) => loginApi.post<PostLoginResponse>(data),
        settingsRequest: () => settingsApi.get<GetSettingsResponse>(),
    }
}

// Note: cannot use useApi() here — this runs inside SessionContextProvider
// before the session context is available
export const useRehydrateSessionResources = (token?: string) => {
    const api = new RequestBuilder(Paths.Api.RehydrateSession).setToken(token).build()

    return useQuery({
        queryKey: QueryKey.RehydrateSession.byId(token).build(),
        queryFn: async () => await api.get<GetSessionResponse>(),
        enabled: isDefined(token),
        retry: 1,
        staleTime: 0,
        refetchOnWindowFocus: false,
    })
}
