import { AxiosError } from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Session } from '@shared-context'
import { Query, QueryKey } from '@common-utils'
import { AnagramMapType, Level } from '@projects/WordDuelArena/common'
import type { ErrorResponse, VoidFunction } from '@common-utils'
import type { LevelNameResponse, FrequencyType } from '@projects/WordDuelArena/common'

const useGetLevelNames = () => {
    const request = new Query.RequestBuilder('WordDuelArena', 'Projects')
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

const useGetLevel = (name: string) => {
    const request = new Query.RequestBuilder('WordDuelArena', 'Projects')
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

type UsePostLevelProps = { onSuccess: VoidFunction }
const usePostLevel = ({ onSuccess }: UsePostLevelProps) => {
    const token = Session.useContext().session?.token
    const request = new Query.RequestBuilder('WordDuelArena', 'Projects')
        .setSubpath('/level')
        .withAuthToken(token)
        .build()

    return useMutation<void, AxiosError<ErrorResponse>, Level>({
        mutationKey: QueryKey.LevelCreate.build(),
        mutationFn: async (payload: Level) => void (await request.post(payload)),
        onSuccess,
    })
}

const useGetAnagramMap = () => {
    const token = Session.useContext().session?.token
    const request = new Query.RequestBuilder('WordDuelArena', 'Projects')
        .setSubpath('/word/anagrams')
        .withAuthToken(token)
        .build()

    return useQuery<AnagramMapType, AxiosError<ErrorResponse>>({
        queryKey: QueryKey.AnagramMap.build(),
        queryFn: async () => {
            const response = await request.get<AnagramMapType>()
            return response.data
        },
    })
}

const useGetWordFrequencies = () => {
    const token = Session.useContext().session?.token
    const request = new Query.RequestBuilder('WordDuelArena', 'Projects')
        .setSubpath('/word/frequencies')
        .withAuthToken(token)
        .build()

    return useQuery<FrequencyType, AxiosError<ErrorResponse>>({
        queryKey: QueryKey.WordFrequencies.build(),
        queryFn: async () => {
            const response = await request.get<FrequencyType>()
            return response.data
        },
    })
}

export const LevelCreatorQueries = {
    useGet: useGetLevel,
    usePost: usePostLevel,
    Names: {
        useGet: useGetLevelNames,
    },
    AnagramMap: {
        useGet: useGetAnagramMap,
    },
    Frequencies: {
        useGet: useGetWordFrequencies,
    },
}
