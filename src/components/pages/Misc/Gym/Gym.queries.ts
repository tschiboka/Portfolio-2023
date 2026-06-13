import { GetGymExercisesResponse, GetGymUserRoutinesResponse } from '@common/types/projects/gym'
import { useQuery } from '@tanstack/react-query'
import { Paths, QueryKey } from '@common/utils'
import { RequestBuilder } from '@common/utils/Query/Query'
import { ErrorResponse } from '../WordDuelArena/common/utils'
import { AxiosError } from 'axios'

export const useGetGymUserRoutines = () => {
    const request = new RequestBuilder(Paths.Projects.Gym)
        .setSubpath('/routines')
        .withAuthToken()
        .build()

    return useQuery<GetGymUserRoutinesResponse, AxiosError<ErrorResponse>>({
        queryKey: QueryKey.GymRoutines.build(),
        queryFn: async () => {
            const response = await request.get<GetGymUserRoutinesResponse>()
            return response.data
        },
    })
}

export const useGetGymExercises = () => {
    const api = new RequestBuilder(Paths.Projects.Gym)
        .setSubpath('/exercises')
        .withAuthToken()
        .build()

    return useQuery<GetGymExercisesResponse, AxiosError<ErrorResponse>>({
        queryKey: QueryKey.GymExercises.build(),
        queryFn: async () => {
            const response = await api.get<GetGymExercisesResponse>()
            return response.data
        },
    })
}
