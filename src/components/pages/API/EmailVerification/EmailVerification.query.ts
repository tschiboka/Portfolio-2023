import { apiPathBuilder } from "../../../../routing/apiPathBuilder";
import { AxiosResponse } from 'axios'
import axios from "axios";

export const useVerifyEmailRequest: (data: { token: string }) => Promise<AxiosResponse<{token: string}, any>> = async (data) => {
    const path = apiPathBuilder('CONFIRM_REGISTRATION')
    return await axios.post(path, data)
}