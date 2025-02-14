import api from "@/api";
import { callAsync } from "@/hooks/useAsync";
import { GroupedData, QueryDefinition } from "@/types/dashboard";
import { apiPaths } from "@/utils/apiPaths";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useAggregations = (aggQuery: QueryDefinition) => {
    return useQuery<GroupedData>({
      queryKey: ["aggregations", aggQuery],
      queryFn: async () => {
        if(!aggQuery) return []
        const response = await callAsync<AxiosResponse<GroupedData>>(() => api.post(apiPaths.aggregations(), {
            ...aggQuery
        }));
        return response.data
      },
    });
  };