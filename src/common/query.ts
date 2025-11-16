import axios from "axios";
import { Maybe } from "monet";
import { apiPathBuilder } from "../routing/apiPathBuilder";

export const getStorage = () => Maybe.fromNull(localStorage.getItem("tschiboka")).map(JSON.parse).orUndefined()


export const useAPI = () => {
    return {
        get: (url: string) => axios.get(
            apiPathBuilder(url), 
            { headers: { "x-auth-token": getStorage()?.token }   
        }),
        post: (url: string, payload: object) => axios.post(
            apiPathBuilder(url), 
            payload, 
            { headers: { "x-auth-token": getStorage()?.token }   
        }),
    }
}