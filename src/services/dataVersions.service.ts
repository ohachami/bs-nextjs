import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {callAsync} from "@/hooks/useAsync";
import {AxiosResponse} from "axios";
import api from "@/api";
import {apiPaths} from "@/utils/apiPaths";
import {DatasourceVersion} from "@/types/datasource/datasourceVersion";


export const useDatasourceVersions = (datasourceId: string) => {
    return useQuery<DatasourceVersion[]>({
        queryKey: ["datasources", datasourceId],
        queryFn: async () => {
            const response = await callAsync<AxiosResponse<DatasourceVersion[]>>(() => api.get(apiPaths.datasourceVersions(datasourceId)));
            return response.data
        },
    })
}

type DataSourcePatchVersionParams = {
    id: string,
    comment: string
}

export const usePatchComment = () => {
    const queryClient = useQueryClient();

    return useMutation<AxiosResponse, Error, DataSourcePatchVersionParams>({
        mutationFn: async ({id, comment}) => {
            return callAsync<AxiosResponse>(() =>
                api.post(apiPaths.version(id), { comment })
            );
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["dataVersions"] }),
        onError: (error: Error) => console.error('usePatchVersion failed', error),
    });
}

