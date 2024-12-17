import api from "@/lib/axios";
import { dashBoardProjectSchema, editProjectSchema, Project, ProjectFormData, projectSchema } from "../types";
import { isAxiosError } from "axios";

// Crear el Proyecto - POST
export async function createProject(formData : ProjectFormData) {
    try {
        const { data } = await api.post('/projects', formData); // Se envía la petición POST por medio de la API
        return data; // Se devuelve la respuesta
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error); // Si el error es de axios y tiene una respuesta, se lanza un error con el mensaje de error
        };
    };
};

// Obtener todos los proyectos - GET
export async function getProjects() {
    try {
        const { data } = await api.get('/projects'); // Se envía la petición GET por medio de la API
        const response = dashBoardProjectSchema.safeParse(data); // Se parsea la respuesta para verificar que cumpla con el schema
        if(response.success) { 
            return response.data;
        };
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error); // Si el error es de axios y tiene una respuesta, se lanza un error con el mensaje de error
        };
    };
};

// Obtener un proyecto - GET BY ID
export async function getProjectById(id: Project['_id']) { // 
    try {
        const { data } = await api.get(`/projects/${id}`); // Se envía la petición GET por medio de la API
        const response = editProjectSchema.safeParse(data); // Se parsea la respuesta para verificar que cumpla con el schema
        if(response.success) {
            return response.data;
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error); // Si el error es de axios y tiene una respuesta, se lanza un error con el mensaje de error
        };
    };
};

// Obtener todo el proyecto
export async function getFullProject(id: Project['_id']) { // 
    try {
        const { data } = await api.get(`/projects/${id}`); // Se envía la petición GET por medio de la API
        const response = projectSchema.safeParse(data); // Se parsea la respuesta para verificar que cumpla con el schema
        if(response.success) {
            return response.data;
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error); // Si el error es de axios y tiene una respuesta, se lanza un error con el mensaje de error
        };
    };
};

// Actualizar proyecto - PUT
type ProjectAPIType = { // 
    formData: ProjectFormData,
    projectId: Project['_id']
}
export async function updateProject({formData, projectId} : ProjectAPIType ) { // 
    try {
        const { data } = await api.put<string>(`/projects/${projectId}`, formData); // Se envía la petición PUT por medio de la API
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error); // Si el error es de axios y tiene una respuesta, se lanza un error con el mensaje de error
        };
    };
};

// Eliminar un proyecto - DELETE
export async function deleteProject(id: Project['_id']) { // 
    try {
        const { data } = await api.delete<string>(`/projects/${id}`); // Se envía la petición GET por medio de la API
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error); // Si el error es de axios y tiene una respuesta, se lanza un error con el mensaje de error
        };
    };
};