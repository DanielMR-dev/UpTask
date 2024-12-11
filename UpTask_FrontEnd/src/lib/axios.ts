import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// Antes de la petición HTTP
api.interceptors.request.use( config => {
    const token = localStorage.getItem('AUTH_TOKEN');
    if(token) {
        // Enviar la configuración con Headers y despues inyectar el Token
        config.headers.Authorization = `Bearer ${token}`;
    };
    return config;
});

export default api;