import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { apiPathBuilder, ApiPaths } from "../../../../routing/apiPathBuilder";

export const useGetPagePingData = () => 
    useQuery({
        queryKey: ["xmas-page-ping"],
        queryFn: async () => await axios.get(apiPathBuilder(ApiPaths.PROJECT_XMAS, {prefix: ''})),   
    })
