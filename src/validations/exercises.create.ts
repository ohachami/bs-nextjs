import { z } from 'zod';

/**
 * Exercise creation steps forms
 */

// Step 1: Horizon Form
// Horizon Form Step A validation Schema
export const horizonFormSchema = z.object({
  exerciseType: z.string(),
  exercisePeriod: z.string(), //z.array(z.string()),
});
// Horizon Form Schema type
export type HorizonFormType = z.infer<typeof horizonFormSchema>;
