import { LoginFormData } from "./Login.types";
import { apiPathBuilder } from "../../../../routing/apiPathBuilder";
import { AxiosResponse } from 'axios'
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useLoginFormResources: (data: LoginFormData) => Promise<AxiosResponse<any, any>> = async (data) => {
    const path = apiPathBuilder('LOGIN')
    return await axios.post(path, data)
}

export const useSettingsResources = async () => {
    const path = apiPathBuilder('SETTINGS')
    return await axios.get(path)
}

export const useRehydrateSessionResources = (token: string) => {
    const path = apiPathBuilder('REHYDRATE_SESSION')
    
    return useQuery({
        queryKey: ['rehydrateSession', token],
        queryFn: async () => await axios.get(path, 
            { headers: { 'x-auth-token': token } }
        ),
        enabled: !!token,
        retry: 1,
        staleTime: 0,
        refetchOnWindowFocus: false
    })
}