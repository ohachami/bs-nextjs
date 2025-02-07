import { useMutation, useQueryClient } from "@tanstack/react-query";
import { callAsync } from "@/hooks/useAsync";
import type { AxiosResponse } from "axios";
import api from "@/api";
import { apiPaths } from "@/utils/apiPaths";

const DATA_VERSIONS_QUERY_KEY = ["dataVersions"];

type DataSourcePatchVersionParams = {
    id: string,
    comment: string
}

export const usePatchVersion = () => {
    const queryClient = useQueryClient();

    return useMutation<AxiosResponse, Error, DataSourcePatchVersionParams>({
        mutationFn: async ({id, comment}) => {
            return callAsync<AxiosResponse>(() =>
                api.post(apiPaths.dataSourceVersions(id), { comment })
            );
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: DATA_VERSIONS_QUERY_KEY }),
        onError: (error: Error) => console.error('usePatchVersion failed', error),
    });
};