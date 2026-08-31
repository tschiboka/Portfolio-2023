import {
    GetGymDifficultyOptionsResponse,
    GetGymEquipmentOptionsResponse,
    GetGymExercisesResponse,
    GetGymMuscleGroupOptionsResponse,
    GetGymUserRoutinesResponse,
} from '@common-types'
import { useQuery } from '@tanstack/react-query'
import { ErrorResponse, Paths, Query, QueryKey } from '@common-utils'
import { AxiosError } from 'axios'
import { Session } from '@shared-context/SessionContext'

export const useGetGymUserRoutines = () => {
    const token = Session.useContext().session?.token
    const request = new Query.RequestBuilder(Paths.Projects.Gym)
        .setSubpath('/routines')
        .withAuthToken(token)
        .build()

    return useQuery<GetGymUserRoutinesResponse, AxiosError<ErrorResponse>>({
        queryKey: QueryKey.GymRoutines.build(),
        queryFn: async () => request.get<GetGymUserRoutinesResponse>().then(Query.extractAxiosData),
    })
}

export const useGetGymExercises = () => {
    const token = Session.useContext().session?.token

    const request = new Query.RequestBuilder(Paths.Projects.Gym)
        .setSubpath('/exercises')
        .withAuthToken(token)
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
