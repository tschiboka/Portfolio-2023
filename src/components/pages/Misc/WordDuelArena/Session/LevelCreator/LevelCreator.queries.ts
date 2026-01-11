import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { AnagramMapType, Level } from "../../common/utils";
import { useSessionContext } from "../../../../../../context/SessionContext/Session.context";
import { apiPathBuilder, ApiPaths } from "../../../../../../routing/apiPathBuilder";
import { LevelNameResponse } from "../../common/utils/Types/Level";
import { ErrorResponse } from "../../common/utils/Queries/Queries.types";
import { FrequencyType } from "../../common/utils/Types/Words";

export const useGetLevelNames = () =>
    useQuery<LevelNameResponse, AxiosError<ErrorResponse>>({  
        queryKey: ["level-names"],
        queryFn: async () => {
            const response = await axios.get<LevelNameResponse>(
                apiPathBuilder(ApiPaths.PROJECT_WORD_DUEL_ARENA, { prefix: '' }) + "/level/name",
            )
            return response.data
        },
    })

export const useGetLevel = (name: string) =>
    useQuery<Level, AxiosError<ErrorResponse>>({  
        queryKey: ["level" + name],
        queryFn: async () => {
            const response = await axios.get<Level>(
                apiPathBuilder(ApiPaths.PROJECT_WORD_DUEL_ARENA, { prefix: '' }) + "/level/name/" + name,
            )
            return response.data
        },
    })

type UsePostLevel = { onSuccess: () => void }
export const usePostLevel = ({onSuccess}: UsePostLevel) => {
    const token = useSessionContext().session?.token

    return useMutation<void, AxiosError<ErrorResponse>, Level>({
        mutationKey: ["level-create"],
        mutationFn: async (payload: Level) => 
            await axios.post(
                apiPathBuilder(ApiPaths.PROJECT_WORD_DUEL_ARENA, { prefix: '' } ) + "/level",
                payload,
                { headers: { "x-auth-token": token } }
            ),   
        onSuccess
    })
} 

export const useGetAnagramMap = () => {
    const token = useSessionContext().session?.token

    return useQuery<AnagramMapType, AxiosError<ErrorResponse>>({   
        queryKey: ["word-anagram-map"],
        queryFn: async () => {
            const response = await axios.get( 
                apiPathBuilder(ApiPaths.PROJECT_WORD_DUEL_ARENA, { prefix: '' }) + "/word/anagrams",
                { headers: { "x-auth-token": token } }
            )
            return response.data
        }
    })     
}

export const useGetWordFrequencies = () => {
    const token = useSessionContext().session?.token

    return useQuery<FrequencyType, AxiosError<ErrorResponse>>({   
        queryKey: ["word-frequencies"],
        queryFn: async () => {
            const response = await axios.get( 
                apiPathBuilder(ApiPaths.PROJECT_WORD_DUEL_ARENA, { prefix: '' }) + "/word/frequencies",
                { headers: { "x-auth-token": token } }
            )
            return response.data
        }
    })     
}