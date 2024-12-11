import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { ConfirmToken, ForgotPasswordForm, NewPasswordForm, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm } from "../types";

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
        const url = '/auth/confirm-account'; // URL para confirmar la cuenta
        const { data } = await api.post<string>(url, formData); // Envía la solicitud POST a la API con la URL y los datos del formulario
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error); // Si el error es de axios y tiene una respuesta, se lanza un error con el mensaje de error
        };
    };  
};

// Confirmar Token - POST
export async function requestConfirmationCode(formData : RequestConfirmationCodeForm) {
    try {
        const url = '/auth/request-code'; // URL para confirmar el token
        const { data } = await api.post<string>(url, formData); // Envía la solicitud POST a la API con la URL y los datos del formulario
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error); // Si el error es de axios y tiene una respuesta, se lanza un error con el mensaje de error
        };
    };  
};

// Autenticar Usuario - POST
export async function authenticateUser(formData : UserLoginForm) {
    try {
        const url = '/auth/login'; // URL para autenticar al usuario
        const { data } = await api.post<string>(url, formData); // Envía la solicitud POST a la API con la URL y los datos del formulario
        localStorage.setItem('AUTH_TOKEN', data); // Guardar el token en el almacenamiento local
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error); // Si el error es de axios y tiene una respuesta, se lanza un error con el mensaje de error
        };
    };  
};

// Reestablecer Password - POST
export async function forgotPassword(formData : ForgotPasswordForm) {
    try {
        const url = '/auth/forgot-password'; // URL para reestablecer el Password
        const { data } = await api.post<string>(url, formData); // Envía la solicitud POST a la API con la URL y los datos del formulario
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error); // Si el error es de axios y tiene una respuesta, se lanza un error con el mensaje de error
        };
    };  
};

// Validar el Token - POST
export async function validateToken(formData : ConfirmToken) {
    try {
        const url = '/auth/validate-token'; // URL para validar el token
        const { data } = await api.post<string>(url, formData); // Envía la solicitud POST a la API con la URL y los datos del formulario
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error); // Si el error es de axios y tiene una respuesta, se lanza un error con el mensaje de error
        };
    };  
};

// Actualizar Password - POST
export async function updatePasswordWithToken({formData, token} : {formData: NewPasswordForm, token : ConfirmToken['token']}) {
    try {
        const url = `/auth/update-password/${token}`; // URL para actualizar el Password
        const { data } = await api.post<string>(url, formData); // Envía la solicitud POST a la API con la URL y los datos del formulario
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error); // Si el error es de axios y tiene una respuesta, se lanza un error con el mensaje de error
        };
    };  
};

// Obtener el Usuario
export async function getUser() {
    try {
        const { data } = await api.get('/auth/user');
        console.log(data);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error); // Si el error es de axios y tiene una respuesta, se lanza un error con el mensaje de error
        };
    }  
};