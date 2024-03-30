import { apiPathBuilder } from "../../../../routing/apiPathBuilder";
import { RegistrationFormData } from "./Register.types";
import axios, { AxiosResponse } from "axios";
import {omit} from "ramda"

export const useRegisterUserRequest: (data: RegistrationFormData) => Promise<AxiosResponse<any, any>> = async (data) => {
    const path = apiPathBuilder('REGISTER_USER')
    const user = omit(["passwordConfirmation"])(data)
    
    return await axios.post(path, user)
}