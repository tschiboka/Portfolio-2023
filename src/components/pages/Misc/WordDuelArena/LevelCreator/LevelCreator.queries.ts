import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { AnagramMapType, Level } from '../common/utils'
import { Paths, QueryKey } from '@common/utils'
import { useApi } from '@common/utils/Query/Query'
import { LevelNameResponse } from '../common/utils/Types/Level'
import { ErrorResponse } from '../common/utils/Queries/Queries.types'
import { FrequencyType } from '../common/utils/Types/Words'

export const useGetLevelNames = () => {
    const api = useApi(Paths.Projects.WordDuelArena).setPath('/level/name').build()

    return useQuery<LevelNameResponse, AxiosError<ErrorResponse>>({
        queryKey: QueryKey.LevelNames.build(),
        queryFn: async () => {
            const response = await api.get<LevelNameResponse>()
            return response.data
        },
    })
}

export const useGetLevel = (name: string) => {
    const api = useApi(Paths.Projects.WordDuelArena)
        .setPath('/level/name/' + name)
        .build()

    return useQuery<Level, AxiosError<ErrorResponse>>({
        queryKey: QueryKey.Level.byId(name).build(),
        queryFn: async () => {
            const response = await api.get<Level>()
            return response.data
        },
    })
}

type UsePostLevel = { onSuccess: () => void }
export const usePostLevel = ({ onSuccess }: UsePostLevel) => {
    const api = useApi(Paths.Projects.WordDuelArena).setPath('/level').setToken().build()

    return useMutation<void, AxiosError<ErrorResponse>, Level>({
        mutationKey: QueryKey.LevelCreate.build(),
        mutationFn: async (payload: Level) => {
            await api.post(payload)
        },
        onSuccess,
    })
}

export const useGetAnagramMap = () => {
    const api = useApi(Paths.Projects.WordDuelArena).setPath('/word/anagrams').setToken().build()

    return useQuery<AnagramMapType, AxiosError<ErrorResponse>>({
        queryKey: QueryKey.AnagramMap.build(),
        queryFn: async () => {
            const response = await api.get<AnagramMapType>()
            return response.data
        },
    })
}

export const useGetWordFrequencies = () => {
    const api = useApi(Paths.Projects.WordDuelArena).setPath('/word/frequencies').setToken().build()

    return useQuery<FrequencyType, AxiosError<ErrorResponse>>({
        queryKey: QueryKey.WordFrequencies.build(),
        queryFn: async () => {
            const response = await api.get<FrequencyType>()
            return response.data
        },
    })
}
