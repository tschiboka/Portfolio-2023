import { LoginFormData } from "./Login.types";
import { apiPathBuilder } from "../../../routing/apiPathBuilder";
import { AxiosResponse } from 'axios'
import axios from "axios";

export const useLoginFormResources: (data: LoginFormData) => Promise<AxiosResponse<any, any>> = async (data) => {
    const path = apiPathBuilder('LOGIN')
    return await axios.post(path, data)
}

export const useSettingsResources = async () => {
    const path = apiPathBuilder('SETTINGS')
    return await axios.get(path)
}