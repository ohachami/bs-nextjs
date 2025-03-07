import { callApi } from "@/hooks/useApi"
import { ScenarioDataIF } from "@/types/senarisation"
import { apiPaths } from "@/utils/apiPaths"
import { useQuery } from "@tanstack/react-query"


//get the consolidated data of the a scenario
export const useScenarioParams = (consoDataId: string) => {
    return useQuery({
        queryKey: ["scenariosData", consoDataId],
        queryFn: async () => {
            return await callApi<ScenarioDataIF>({
                method: "GET",
                url: apiPaths.scenarioParams(consoDataId)
            })
        },
        enabled: !!consoDataId
    })

}