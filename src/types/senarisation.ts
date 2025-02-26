import { RUN_STATUS, SENARIO_TYPE, WORKFLOW_STATUS } from "@/utils/constants";

export type RunStatusType = typeof RUN_STATUS[keyof typeof RUN_STATUS];
export type WorkflowStatusType = typeof WORKFLOW_STATUS[keyof typeof WORKFLOW_STATUS]
export type SenarioType = typeof SENARIO_TYPE[keyof typeof SENARIO_TYPE]

export interface ScenarioIF {
    //add more types
    id: string
    name: string
    created_at: string
    run_status: RunStatusType,
    workflow_status: WorkflowStatusType
    published: boolean
    up_vote: number
    down_vote: number
    type: SenarioType,
    is_automatic: boolean
}

