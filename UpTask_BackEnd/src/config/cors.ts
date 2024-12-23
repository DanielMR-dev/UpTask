import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = { // Se crea el objeto de corsConfig con el origen de la conexion
    origin: function(origin, callback) { 
        const whitelist = [process.env.FRONTEND_URL]; // Habilitar la URL del frontend 

        // Si se está ejecutando el servidor desde el comando de "npm run dev:api"
        if(process.argv[2] === '--api') {
            whitelist.push(undefined);
        };

        if(whitelist.includes(origin)) { // Si la URL del frontend esta en la whitelist
            callback(null, true); // Si la URL esta en la whitelist, se permite la conexion
        } else {
            callback(new Error('Error de CORS')); // Si la URL no esta en la whitelist,
        };
    }
};