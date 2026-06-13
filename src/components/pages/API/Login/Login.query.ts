import {
    PostLoginRequest,
    PostLoginResponse,
    GetSettingsResponse,
    GetSessionResponse,
} from '@common/types/app'
import { useQuery } from '@tanstack/react-query'
import { isDefined, Paths, Query, QueryKey } from '@common/utils'

export const useLoginApi = () => {
    const loginRequest = new Query.RequestBuilder(Paths.Api.Login).build()
    const settingsRequest = new Query.RequestBuilder(Paths.Api.Settings).build()

    return {
        loginFormRequest: (data: PostLoginRequest) => loginRequest.post<PostLoginResponse>(data),
        settingsRequest: () => settingsRequest.get<GetSettingsResponse>(),
    }
}

export const useRehydrateSessionResources = (token?: string) => {
    const request = new Query.RequestBuilder(Paths.Api.RehydrateSession)
        .withAuthToken(token)
        .build()

    return useQuery({
        queryKey: QueryKey.RehydrateSession.byId(token).build(),
        queryFn: async () => await request.get<GetSessionResponse>(),
        enabled: isDefined(token),
        retry: 1,
        staleTime: 0,
        refetchOnWindowFocus: false,
    })
}
