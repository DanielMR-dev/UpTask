import api from "@/lib/axios";
import { ProjectFormData } from "../types";
import { isAxiosError } from "axios";

export async function createProject(formData : ProjectFormData) {
    try {
        const { data } = await api.post('/projects', formData); // Se envía la petición por medio de la api
        return data; // Se devuelve la respuesta
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error); // Si el error es de axios y tiene una respuesta, se lanza un error con el mensaje de error
        };
    };
};