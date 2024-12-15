import { isAxiosError } from "axios";
import { Note, NoteFormData, Project, Task } from "../types";
import api from "@/lib/axios";


type NoteAPIType = {
    formData: NoteFormData;
    projectId: Project['_id'];
    taskId: Task['_id'];
    noteId: Note['_id'];
}

// Crear nota - POST
export async function createNote({projectId, taskId, formData}: Pick<NoteAPIType, 'projectId' | 'taskId' | 'formData'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/notes`; // URL que se pasará a la API para la petición
        const { data } = await api.post<string>(url, formData); // Hacer la petición POST a la API
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error); // Si el error es de axios y tiene una respuesta, se lanza un error con el mensaje de error
        };
    };
};

// Eliminar nota - DELETE
export async function deleteNote({projectId, taskId, noteId} : Pick<NoteAPIType, 'projectId' | 'taskId' | 'noteId'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`; // URL que se pasará a la API para la petición
        const { data } = await api.delete<string>(url); // Hacer la petición DELETE a la API
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error); // Si el error es de axios y tiene una respuesta, se lanza un error con el mensaje de error
        };
    };
}