import { useMutation, useQuery } from "@tanstack/react-query";
import { CategoryRequestResource, CategoryResource } from "../common/types";
import { useAPI } from "../../../../common/query";
import { AxiosError, AxiosResponse } from "axios";
import { RequestError } from "../common/error";
import { ApiPaths } from "../../../../routing/apiPathBuilder";

type UsePostCategory = {
    onSuccess: () => void
}
export const usePostCategory = ({onSuccess}: UsePostCategory) => {
    const { post } = useAPI()
    return useMutation<void, AxiosError<RequestError>, CategoryResource>({
    mutationFn: async (payload: CategoryResource) => { await post(ApiPaths.CATEGORIES, payload) },
    onSuccess,
})}

export const useGetCategories = () => {
    const { get } = useAPI()
    return useQuery<AxiosResponse<CategoryRequestResource[]>, AxiosError<RequestError>>({
    queryKey: ["categories"],
    queryFn: async () => { return await get(ApiPaths.CATEGORIES).then(c => c.data) }
})}
