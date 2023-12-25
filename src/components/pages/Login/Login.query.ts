import { LoginFormData } from "./Login.types";
import { apiPathBuilder } from "../../../routing/apiPathBuilder";

export const useLoginForm = (data: LoginFormData) => {
    const path = apiPathBuilder('LOGIN')
}