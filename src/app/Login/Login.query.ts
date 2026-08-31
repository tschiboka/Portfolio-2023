import { PostLoginRequest, PostLoginResponse, GetSettingsResponse } from '@common-types'
import { Paths, Query } from '@common-utils'

export const useLoginApi = () => {
    const loginRequest = new Query.RequestBuilder(Paths.Api.Login).build()
    const settingsRequest = new Query.RequestBuilder(Paths.Api.Settings).build()

    return {
        loginFormRequest: (data: PostLoginRequest) => loginRequest.post<PostLoginResponse>(data),
        settingsRequest: () => settingsRequest.get<GetSettingsResponse>(),
    }
}
