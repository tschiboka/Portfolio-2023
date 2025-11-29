import axios from "axios";
import { apiPathBuilder } from "../routing/apiPathBuilder";
import { useSessionContext } from "../context/SessionContext/Session.context";

export const useAPI = () => {
    const token = useSessionContext().session?.token
    
    return {
        get: (url: string) => axios.get(
            apiPathBuilder(url), 
            { headers: { "x-auth-token": token }   
        }),
        post: (url: string, payload: object) => axios.post(
            apiPathBuilder(url), 
            payload, 
            { headers: { "x-auth-token": token }   
        }),
    }
}