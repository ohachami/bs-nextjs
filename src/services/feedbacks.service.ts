import { callAsync } from "@/hooks/useAsync"
import { MessageIF } from "@/types/chat";
import { useQuery } from "@tanstack/react-query"
import { AxiosResponse } from "axios";
import { apiPaths } from "@/utils/apiPaths";
import api from "@/api";


export const useFeedbacks = () => {
    return useQuery<MessageIF>({
        queryKey: ["feedbacks"], queryFn: async () => {
            const response = await callAsync<AxiosResponse<MessageIF>>(() => api.get(apiPaths.feedbacks()))
            return response.data
        }
    })
}