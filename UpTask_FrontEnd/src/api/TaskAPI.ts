import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { Project, Task, TaskFormData } from "../types";

// Type para la tarea
type TaskAPI = {
    formData: TaskFormData;
    projectId: Project['_id'];
    taskId: Task['_id'];
};

// Crear la Tarea - POST
export async function createTask({formData, projectId} : Pick<TaskAPI, 'formData' | 'projectId'>) {
    try {
        const url = `/projects/${projectId}/tasks`; // URL de la API
        const { data } = await api.post<string>(url, formData); // Se envía la petición POST por medio de la API
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error); // Si el error es de axios y tiene una respuesta, se lanza un error con el mensaje de error
        };
    }
};

// Obtener la Tarea por su ID - GET BY ID
export async function getTaskById({projectId, taskId} : Pick<TaskAPI, 'projectId' | 'taskId'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`; // URL de la API
        const{ data } = await api.get(url); // Se envía la petición GET por medio de la API
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error); // Si el error es de axios y tiene una respuesta, se lanza un error con el mensaje de error
        };
    }  
};

// Actualizar la Tarea - PUT
export async function updateTask({projectId, taskId, formData} : Pick<TaskAPI, 'projectId' | 'taskId' | 'formData'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`; // URL de la API
        const{ data } = await api.put<string>(url, formData); // Se envía la petición PUT por medio de la API  
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error); // Si el error es de axios y tiene una respuesta, se lanza un error con el mensaje de error
        };
    }  
};

// Eliminar Tarea - DELETE
export async function deleteTask({projectId, taskId} : Pick<TaskAPI, 'projectId' | 'taskId'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`; // URL de la API
        const{ data } = await api.delete<string>(url); // Se envía la petición GET por medio de la API
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error); // Si el error es de axios y tiene una respuesta, se lanza un error con el mensaje de error
        };
    }  
};