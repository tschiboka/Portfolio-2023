import {
    GetGymDifficultyOptionsResponse,
    GetGymEquipmentOptionsResponse,
    GetGymExercisesResponse,
    GetGymMuscleGroupOptionsResponse,
    GetGymUserRoutinesResponse,
} from '@types'
import { useQuery } from '@tanstack/react-query'
import { ErrorResponse, Paths, Query, QueryKey } from '@utils'
import { AxiosError } from 'axios'

export const useGetGymUserRoutines = () => {
    const request = new Query.RequestBuilder(Paths.Projects.Gym)
        .setSubpath('/routines')
        .withAuthToken()
        .build()

    return useQuery<GetGymUserRoutinesResponse, AxiosError<ErrorResponse>>({
        queryKey: QueryKey.GymRoutines.build(),
        queryFn: async () => request.get<GetGymUserRoutinesResponse>().then(Query.extractAxiosData),
    })
}

export const useGetGymExercises = () => {
    const request = new Query.RequestBuilder(Paths.Projects.Gym)
        .setSubpath('/exercises')
        .withAuthToken()
        .build()

    return useQuery<GetGymExercisesResponse, AxiosError<ErrorResponse>>({
        queryKey: QueryKey.GymExercises.build(),
        queryFn: async () => request.get<GetGymExercisesResponse>().then(Query.extractAxiosData),
    })
}

export const useGetGymDifficultyOptions = () => {
    const request = new Query.RequestBuilder(Paths.Projects.Gym).setSubpath('/difficulty').build()

    return useQuery<GetGymDifficultyOptionsResponse, AxiosError<ErrorResponse>>({
        queryKey: QueryKey.GymOptions.feature('difficulty').build(),
        queryFn: async () =>
            request.get<GetGymDifficultyOptionsResponse>().then(Query.extractAxiosData),
    })
}

export const useGetGymEquipmentOptions = () => {
    const request = new Query.RequestBuilder(Paths.Projects.Gym).setSubpath('/equipment').build()

    return useQuery<GetGymEquipmentOptionsResponse, AxiosError<ErrorResponse>>({
        queryKey: QueryKey.GymOptions.feature('equipment').build(),
        queryFn: async () =>
            request.get<GetGymEquipmentOptionsResponse>().then(Query.extractAxiosData),
    })
}

export const useGetGymMuscleGroupOptions = () => {
    const request = new Query.RequestBuilder(Paths.Projects.Gym).setSubpath('/muscle-group').build()

    return useQuery<GetGymMuscleGroupOptionsResponse, AxiosError<ErrorResponse>>({
        queryKey: QueryKey.GymOptions.feature('muscle-group').build(),
        queryFn: async () =>
            request.get<GetGymMuscleGroupOptionsResponse>().then(Query.extractAxiosData),
    })
}
