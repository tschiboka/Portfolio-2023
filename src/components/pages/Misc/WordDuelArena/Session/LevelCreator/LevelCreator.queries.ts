import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Level } from "../../common/utils";
import { useSessionContext } from "../../../../../../context/SessionContext/Session.context";
import { apiPathBuilder, ApiPaths } from "../../../../../../routing/apiPathBuilder";

export const useGetLevelNames = () =>
    useQuery({  
        queryKey: ["level-names"],
        queryFn: async () =>
            await axios.get<{ success: boolean; levelNames: string[] }>(
                apiPathBuilder(ApiPaths.PROJECT_WORD_DUEL_ARENA, { prefix: '' }) + "/level/name",
            ),
    })

export const useGetLevel = (name: string) =>
    useQuery({  
        queryKey: ["level" + name],
        queryFn: async () =>
            await axios.get<Level>(
                apiPathBuilder(ApiPaths.PROJECT_WORD_DUEL_ARENA, { prefix: '' }) + "/level/" + name,
            ),
    })


type UsePostLevel = { onSuccess: () => void }
export const usePostLevel = ({onSuccess}: UsePostLevel) => {
    const token = useSessionContext().session?.token

    return useMutation({
        mutationKey: ["level-create"],
        mutationFn: async (payload: Level) => 
            await axios.post(
                apiPathBuilder(ApiPaths.PROJECT_WORD_DUEL_ARENA, { prefix: '' },) + "/level",
                payload,
                { headers: { "x-auth-token": token } }
            ),   
        onSuccess
    })
} 