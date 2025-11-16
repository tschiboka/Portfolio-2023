import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { apiPathBuilder, ApiPaths } from "../../../../routing/apiPathBuilder";
import { XmasMessageRequestResource } from "./Xmas2025.types";
import { getStorage } from "../../../../common/query";

export const useGetPagePingData = () => 
    useQuery({
        queryKey: ["xmas-page-ping"],
        queryFn: async () => await axios.get(apiPathBuilder(ApiPaths.PROJECT_XMAS, {prefix: ''})),   
    })

type UsePostMessage = { onSuccess: () => void }
export const usePostMessage = ({onSuccess}: UsePostMessage) =>  useMutation({
        mutationKey: ["xmas-message"],
        mutationFn: async (payload: XmasMessageRequestResource) => 
            await axios.post(
                apiPathBuilder(ApiPaths.PROJECT_XMAS, { prefix: '' }) + "/message", 
                payload,
                { headers: { "x-auth-token": getStorage()?.token }}
            ),   
        onSuccess
    })
