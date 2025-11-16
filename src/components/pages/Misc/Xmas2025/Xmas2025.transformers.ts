import { User } from "../../API/Login/Login.types";
import { XmasFormData } from "./Xmas2025.types";

export const xmasTransformer = {
    toApi: (data: XmasFormData, user: User) => ({
            name: data.name,
            message: data.message,
            userId: user.id,
    })
}
