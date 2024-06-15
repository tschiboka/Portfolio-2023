import { useMutation } from "@tanstack/react-query";
import { CategoriesFormData } from "./Categories.types";
import { useAPI } from "../../../../common/query";

export const usePostCategory = () => {
    const { post } = useAPI()
    return useMutation({
    mutationFn: (payload: CategoriesFormData) => post("CATEGORIES", payload)
})}