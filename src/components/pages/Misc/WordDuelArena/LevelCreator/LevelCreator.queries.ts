import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { AnagramMapType, Level } from '../common/utils'
import { Paths, Query, QueryKey } from '@common/utils'
import { LevelNameResponse } from '../common/utils/Types/Level'
import { ErrorResponse } from '../common/utils/Queries/Queries.types'
import { FrequencyType } from '../common/utils/Types/Words'

export const useGetLevelNames = () => {
    const request = new Query.RequestBuilder(Paths.Projects.WordDuelArena)
        .setSubpath('/level/name')
        .build()

    return useQuery<LevelNameResponse, AxiosError<ErrorResponse>>({
        queryKey: QueryKey.LevelNames.build(),
        queryFn: async () => {
            const response = await request.get<LevelNameResponse>()
            return response.data
        },
    })
}

export const useGetLevel = (name: string) => {
    const request = new Query.RequestBuilder(Paths.Projects.WordDuelArena)
        .setSubpath('/level/name/' + name)
        .build()

    return useQuery<Level, AxiosError<ErrorResponse>>({
        queryKey: QueryKey.Level.byId(name).build(),
        queryFn: async () => {
            const response = await request.get<Level>()
            return response.data
        },
    })
}

type UsePostLevel = { onSuccess: () => void }
export const usePostLevel = ({ onSuccess }: UsePostLevel) => {
    const request = new Query.RequestBuilder(Paths.Projects.WordDuelArena)
        .setSubpath('/level')
        .withAuthToken()
        .build()

    return useMutation<void, AxiosError<ErrorResponse>, Level>({
        mutationKey: QueryKey.LevelCreate.build(),
        mutationFn: async (payload: Level) => {
            await request.post(payload)
        },
        onSuccess,
    })
}

export const useGetAnagramMap = () => {
    const request = new Query.RequestBuilder(Paths.Projects.WordDuelArena)
        .setSubpath('/word/anagrams')
        .withAuthToken()
        .build()

    return useQuery<AnagramMapType, AxiosError<ErrorResponse>>({
        queryKey: QueryKey.AnagramMap.build(),
        queryFn: async () => {
            const response = await request.get<AnagramMapType>()
            return response.data
        },
    })
}

export const useGetWordFrequencies = () => {
    const request = new Query.RequestBuilder(Paths.Projects.WordDuelArena)
        .setSubpath('/word/frequencies')
        .withAuthToken()
        .build()

    return useQuery<FrequencyType, AxiosError<ErrorResponse>>({
        queryKey: QueryKey.WordFrequencies.build(),
        queryFn: async () => {
            const response = await request.get<FrequencyType>()
            return response.data
        },
    })
}
