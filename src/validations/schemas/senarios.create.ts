import { SENARIO_INPUTS_TYPE, SENARIO_TYPE } from "@/utils/constants"
import { z } from "zod"


export const senarioShema = z.object({
    type: z.nativeEnum(SENARIO_TYPE, {
        errorMap: () => ({ message: "Veuillez choisir un type." })
    }),
    name: z.string().min(1, { message: "Le nom du scénario est obligatoire" }).max(50, {
        message: "le nom du scénario ne peut pas dépasser 50 caractères."
    }),
    input: z.nativeEnum(SENARIO_INPUTS_TYPE, {
        errorMap: () => ({ message: "Veuillez choisir un input." })
    }),
    description: z.string().min(2, {
        message: "La description doit contenir au moins 2 caractères."
    }).max(250, {
        message: "La description ne peut pas dépasser 250 caractères."
    }),
    consolidationInput: z.string().min(1, { message: "Veuillez sélectionner une donnée consolidée" }),
})

