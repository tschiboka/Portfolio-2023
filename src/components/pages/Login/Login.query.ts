import { LoginFormData, SettingsResources } from "./Login.types";
import { apiPathBuilder } from "../../../routing/apiPathBuilder";
import axios from "axios";

export const useLoginForm = (data: LoginFormData) => {
    const path = apiPathBuilder('LOGIN')
}

export const useSettingsResources = async () => {
    const path = apiPathBuilder('SETTINGS')
    return await axios.get(path)
}