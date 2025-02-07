import {useQuery} from "@tanstack/react-query";
import {callAsync} from "@/hooks/useAsync";
import {AxiosResponse} from "axios";
import api from "@/api";
import {apiPaths} from "@/utils/apiPaths";
import {DatasourceVersion} from "@/types/datasource/datasourceVersion";

const DATA_SOURCE_QUERY_KEY = (datasourceId: string) => ["datasources", datasourceId];

export const useDatasourceVersions = (datasourceId: string) => {
    return useQuery<DatasourceVersion[]>({
        queryKey: DATA_SOURCE_QUERY_KEY(datasourceId),
        queryFn: async () => {
            const response = await callAsync<AxiosResponse<DatasourceVersion[]>>(() => api.get(apiPaths.datasourceVersion(datasourceId)));
            return response.data
        },
    });
};