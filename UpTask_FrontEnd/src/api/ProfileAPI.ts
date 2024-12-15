import { isAxiosError } from "axios";
import { UpdateCurrentUserPasswordForm, UserProfileForm } from "../types";
import api from "@/lib/axios";

// Actualizar el Perfil - PUT
export async function updateProfile(formData : UserProfileForm) {
    try {
        const { data } = await api.put<string>('/auth/profile', formData); //     
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error); // Si el error es de axios y tiene una respuesta, se lanza un error con el mensaje de error
        };
    };
};

// Actualizar Contraseña Actual - POST
export async function changePassword(formData : UpdateCurrentUserPasswordForm) {
    try {
        const { data } = await api.post<string>('/auth/update-password', formData); //     
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error); // Si el error es de axios y tiene una respuesta, se lanza un error con el mensaje de error
        };
    };
}