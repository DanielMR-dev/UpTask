import { z } from 'zod';

// Projects
export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
});
export type Project = z.infer<typeof projectSchema>; // Genera el type de Project con el Schema de projectSchema
export type ProjectFormData = Pick<Project, 'projectName' | 'clientName' | 'description'>; // Genera el type de ProjectFormData con los campos que se van a enviar en el formulario