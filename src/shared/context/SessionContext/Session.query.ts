import { useQuery } from '@tanstack/react-query'
import { isDefined, Paths, Query, QueryKey } from '@common-utils'
import { GetSessionResponse } from '@common-types'

/**
 * Re-hydrates the persisted session from the server so that a reloading user
 * keeps their authenticated state. Self-contained within SessionContext so the
 * context has no dependency on the app feature layer.
 * @example
 * const { data } = useRehydrateSessionResources(token)
 */
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
