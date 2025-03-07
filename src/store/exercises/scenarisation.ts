import { create } from "zustand"

interface scenarisationState {
    listScenarios: boolean;// if true, list Scenarios list get displayed
    settingModel: boolean // f true, model setting get displayed
    setlistScenarios: () => void;
    setSettingModel: () => void;
}

export const useScenarisationStore = create<scenarisationState>((set) => ({
    listScenarios: false,
    settingModel: false,
    setSettingModel: () => set((state) => ({
        settingModel: !state.settingModel
    })),
    setlistScenarios: () => set((state) => ({
        listScenarios: !state.listScenarios
    }))
}))