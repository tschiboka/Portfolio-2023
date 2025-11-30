import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { apiPathBuilder, ApiPaths } from "../../../../routing/apiPathBuilder";
import { CandleFormData, XmasMessageRequestResource } from "./Xmas2025.types";
import { XmasCandlesResponseResource, XmasMessageResponseResource } from "../../API/common/types";
import { useSessionContext } from "../../../../context/SessionContext/Session.context";

export const useGetPagePingData = () => 
    useQuery({
        queryKey: ["xmas-page-ping"],
        queryFn: async () => await axios.get(apiPathBuilder(ApiPaths.PROJECT_XMAS, {prefix: ''})),   
    })

type UsePostMessage = { onSuccess: () => void }
export const usePostMessage = ({onSuccess}: UsePostMessage) => {
    const token = useSessionContext().session?.token

    return useMutation({
        mutationKey: ["xmas-message"],
        mutationFn: async (payload: XmasMessageRequestResource) => 
            await axios.post(
                apiPathBuilder(ApiPaths.PROJECT_XMAS, { prefix: '' }) + "/message", 
                payload,
                { headers: { "x-auth-token": token } }
            ),   
        onSuccess
    })
} 

type UseGetMessages = { userId?: string }
export const useGetMessages = ({userId}: UseGetMessages) => {
    const token = useSessionContext().session?.token

    return useQuery({
        queryKey: ["xmas-message"],
        queryFn: async () => 
            await axios.get<{success: boolean, data: XmasMessageResponseResource[]}>(
                apiPathBuilder(ApiPaths.PROJECT_XMAS, { prefix: '' }) + "/message",
                { params: { userId },  headers: { "x-auth-token": token }},
            ),
        enabled: Boolean(userId)
    })
}

export const useGetCandles = () => {
    const token = useSessionContext().session?.token

    return useQuery({
        queryKey: ["xmas-candles"],
        queryFn: async () => 
            await axios.get<{success: boolean, data: XmasCandlesResponseResource}>(
                apiPathBuilder(ApiPaths.PROJECT_XMAS, { prefix: '' }) + "/candles",
                { headers: { "x-auth-token": token }},
            ),
        enabled: Boolean(token)
    })
}

export const usePutCandles = () => {
    const token = useSessionContext().session?.token

    return useMutation({
        mutationKey: ["xmas-candles"],
        mutationFn: async (payload: CandleFormData) => 
            await axios.put<{success: boolean, data: XmasCandlesResponseResource}>(
                apiPathBuilder(ApiPaths.PROJECT_XMAS, { prefix: '' }) + "/candles",
                payload,
                { headers: { "x-auth-token": token }},
            )
    })
}