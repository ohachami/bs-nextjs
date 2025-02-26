import { callApi } from "@/hooks/useApi";
import { DataVersionIF } from "@/types/collect/datasources";
import { apiPaths } from "@/utils/apiPaths";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export const useDatasourceVersions = (datasourceId: string, exerciseId: string, siteId?: string) => {
    console.log("exerciseId", exerciseId)
    return useQuery<DataVersionIF[]>({
        queryKey: ["datasources", datasourceId, exerciseId, siteId],
        queryFn: async () => {
            const response = await callApi<DataVersionIF[]>({
                method: 'GET',
                url: apiPaths.datasourceVersions(datasourceId),
                params: {
                    exerciseId
                }
            });

            return siteId ? response.filter(v => v.site.id === siteId) : response;
        },
    })
}

type DataSourcePatchVersionParams = {
    id: string,
    comment: string
}

export const usePatchComment = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, DataSourcePatchVersionParams>({
        mutationFn: async ({ id, comment }) => {
            return callApi<void>({
                method: 'POST',
                url: apiPaths.version(id),
                data: { comment }
            })
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["dataVersions"] }),
        onError: (error: Error) => console.error('usePatchVersion failed', error),
    });
}

