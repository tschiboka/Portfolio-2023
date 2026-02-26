import axios from 'axios'
import { apiPathBuilder } from '../routing/apiPathBuilder'
import { useSessionContext } from '../context/SessionContext/Session.context'

export const useAPI = () => {
    const token = useSessionContext().session?.token

    return {
        get: <T = unknown>(url: string) =>
            axios.get<T>(apiPathBuilder(url), { headers: { 'x-auth-token': token } }),
        post: <T = unknown>(url: string, payload: object) =>
            axios.post<T>(apiPathBuilder(url), payload, { headers: { 'x-auth-token': token } }),
    }
}
