import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { Project, TeamMember, TeamMemberForm, teamMembersSchema } from "../types";

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

// Agregar usuario al proyecto - POST
export async function addUserToProject({projectId, id} : {projectId : Project['_id'], id: TeamMember['_id']}) {
    try {
        const url = `/projects/${projectId}/team`; // URL que se pasará a la API para la petición
        const { data } = await api.post<string>(url, {id}); // Se envía la petición POST por medio de la API
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error); // Si el error es de axios y tiene una respuesta, se lanza un error con el mensaje de error
        };
    };
};

// Obtener los todo el equipo del projecto - GET
export async function getProjectTeam(projectId : Project['_id']) {
    try {
        const url = `/projects/${projectId}/team`; // URL que se pasará a la API para la petición
        const { data } = await api.get(url); // Se envía la petición GET por medio de la API
        const response = teamMembersSchema.safeParse(data);
        if(response.success) {
            return response.data;
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error); // Si el error es de axios y tiene una respuesta, se lanza un error con el mensaje de error
        };
    };
};

// Remover usuario del proyecto - DELETE
export async function removeUserFromProject({projectId, userId} : {projectId : Project['_id'], userId: TeamMember['_id']}) {
    try {
        const url = `/projects/${projectId}/team/${userId}`; // URL que se pasará a la API para la petición
        const { data } = await api.delete<string>(url); // Se envía la petición POST por medio de la API
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error); // Si el error es de axios y tiene una respuesta, se lanza un error con el mensaje de error
        };
    };
};