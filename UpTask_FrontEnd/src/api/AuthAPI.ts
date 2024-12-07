import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { ConfirmToken, RequestConfirmationCodeForm, UserRegistrationForm } from "../types";

// Crear Cuenta - POST
export async function createAccount(formData : UserRegistrationForm) {
    try {
        const url = '/auth/create-account'; // URL para crear cuenta
        const { data } = await api.post<string>(url, formData); // Envía la solicitud POST a la API con la URL y los datos del formulario
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error); // Si el error es de axios y tiene una respuesta, se lanza un error con el mensaje de error
        };
    };  
};

// Confirmar Cuenta - POST
export async function confirmAccount(formData : ConfirmToken) {
    try {
        const url = '/auth/confirm-account'; // URL para crear cuenta
        const { data } = await api.post<string>(url, formData); // Envía la solicitud POST a la API con la URL y los datos del formulario
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error); // Si el error es de axios y tiene una respuesta, se lanza un error con el mensaje de error
        };
    };  
};

// Confirmar Cuenta - POST
export async function requestConfirmationCode(formData : RequestConfirmationCodeForm) {
    try {
        const url = '/auth/request-code'; // URL para crear cuenta
        const { data } = await api.post<string>(url, formData); // Envía la solicitud POST a la API con la URL y los datos del formulario
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error); // Si el error es de axios y tiene una respuesta, se lanza un error con el mensaje de error
        };
    };  
};
