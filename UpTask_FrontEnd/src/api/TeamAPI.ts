import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { Project, TeamMemberForm } from "../types";



// Encontrar al usuario - POST
export async function findUserByEmail({projectId, formData} : {projectId : Project['_id'], formData: TeamMemberForm}) {
    try {
        const url = `/projects/${projectId}/team/find`; // URL que se pasará a la API para la petición
        const { data } = await api.post(url, formData); // Se envía la petición POST por medio de la API
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error); // Si el error es de axios y tiene una respuesta, se lanza un error con el mensaje de error
        };
    };
};