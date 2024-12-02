import api from "@/lib/axios";
import { ProjectFormData } from "../types";

export async function createProject(formData : ProjectFormData) {
    try {
        const { data } = await api.post('/projects', formData); // Se envía la petición por medio de la api
        console.log(data);
    } catch (error) {
        console.log(error);
    }
};