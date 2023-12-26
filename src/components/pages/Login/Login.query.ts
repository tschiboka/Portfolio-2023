import { LoginFormData } from "./Login.types";
import { apiPathBuilder } from "../../../routing/apiPathBuilder";
import axios from "axios";

export const useLoginForm = async (data: LoginFormData) => {
    const path = apiPathBuilder('LOGIN')
    return await axios.post(path, data)
}

export const useSettingsResources = async () => {
    const path = apiPathBuilder('SETTINGS')
    return await axios.get(path)
}