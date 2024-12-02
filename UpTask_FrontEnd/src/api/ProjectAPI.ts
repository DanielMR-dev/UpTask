import api from "@/lib/axios";
import { dashBoardProjectSchema, ProjectFormData } from "../types";
import { isAxiosError } from "axios";

// Crear el Proyecto - POST
export async function createProject(formData : ProjectFormData) {
    try {
        const { data } = await api.post('/projects', formData); // Se envía la petición POST por medio de la api
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
        const { data } = await api.get('/projects'); // Se envía la petición GET por medio de la api
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