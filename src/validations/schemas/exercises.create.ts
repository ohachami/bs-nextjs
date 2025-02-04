import { z } from 'zod';

/**
 * Exercise creation steps forms
 */

export const horizonSchema = z.object({
  exerciceType: z.string().min(1, "Type d'exercice est obligatoire"),
  periodConfig: z.array(z.string()).min(1, "Période de l'exercice est obligatoire"),
});
export type HorizonFormType = z.infer<typeof horizonSchema>;


export const objectifsSchema = z.object({
  file: z.instanceof(File, { message: "Le fichier est obligatoire" })
});
export type objectifsSchemaType = z.infer<typeof objectifsSchema>;

export const deadlinesSchema = z.object({
  steps: z.array(z.object({
    stepConfigId: z.string(),
    deadlineAt: z.date()
  }))
});
export type deadlinesSchemaType = z.infer<typeof deadlinesSchema>;
