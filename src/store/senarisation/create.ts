import { SENARIO_INPUTS_TYPE, SENARIO_TYPE } from "@/utils/constants";
import { create } from "zustand";

interface SenarioCreateState {
    type: string; //  EXPLORATION | EXPLOITATION
    name: string;
    input: string;
    description: string;
    consolidationInput: string; // Scénario existant | Données consolidées
    errors: Record<string, string>; // Store validation errors
    setField: (field: keyof SenarioCreateState, value: string) => void;
    resetForm: () => void
    setErrors: (errors: Record<string, string>) => void
}


//initial state
export const useSenarioCreateStore = create<SenarioCreateState>((set) => ({
    type: SENARIO_TYPE.EXPLOITATION,
    name: "",
    description: "",
    input: SENARIO_INPUTS_TYPE.DONNEES_CONSOLIDEES,
    consolidationInput: "",
    errors: {},
    setField: (field, value) => set((state) => ({ ...state, [field]: value })),
    resetForm: () => set(() => ({
        type: "",
        name: "",
        input: "",
        description: "",
        consolidationInput: "",
        errors: {}
    })),
    setErrors: (errors) => set({ errors }),
}
))