import { AxiosError } from "axios"

export type RequestError = {
    error: { message: string }
}

export const getErrorMessage = (error: AxiosError<RequestError>, message: string) => error.response?.data?.error?.message || message