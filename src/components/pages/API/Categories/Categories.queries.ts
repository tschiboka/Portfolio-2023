import { useMutation } from "@tanstack/react-query";
import { CategoryResource } from "../common/types";
import { useAPI } from "../../../../common/query";
import { AxiosError } from "axios";
import { RequestError } from "../common/error";

export const usePostCategory = () => {
    const { post } = useAPI()
    return useMutation<void, AxiosError<RequestError>, CategoryResource>({
    mutationFn: async (payload: CategoryResource) => { await post("CATEGORIES", payload) }
})}