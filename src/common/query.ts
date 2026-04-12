import axios from 'axios'
import { apiPathBuilder } from '../routing/apiPathBuilder'
import { Session } from '../context/SessionContext'

export const useAPI = () => {
    const token = Session.useContext().session?.token

    return {
        get: <T = unknown>(url: string) =>
            axios.get<T>(apiPathBuilder(url), { headers: { 'x-auth-token': token } }),
        post: <T = unknown>(url: string, payload: object) =>
            axios.post<T>(apiPathBuilder(url), payload, { headers: { 'x-auth-token': token } }),
    }
}
