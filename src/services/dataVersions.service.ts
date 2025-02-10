import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {callAsync} from "@/hooks/useAsync";
import {AxiosResponse} from "axios";
import api from "@/api";
import {apiPaths} from "@/utils/apiPaths";
import { DataVersionIF } from "@/types/collect/datasources";


export const useDatasourceVersions = (datasourceId: string, siteId?: string) => {
    return useQuery<DataVersionIF[]>({
        queryKey: ["datasources", datasourceId, siteId],
        queryFn: async () => {
            const response = await callAsync<AxiosResponse<DataVersionIF[]>>(() => api.get(apiPaths.datasourceVersions(datasourceId)));
            return siteId ? response.data.filter(v => v.site.id === siteId): response.data
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

