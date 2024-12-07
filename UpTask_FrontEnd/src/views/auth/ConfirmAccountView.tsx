import { useState } from "react";
import { ConfirmToken } from "@/types/index";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { confirmAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function ConfirmAccountView() {

    // State inicial de los campos para el token
    const [token, setToken] = useState<ConfirmToken['token']>('');

    // La función de mutación para confirmar un usuario
    const { mutate } = useMutation({
        mutationFn: confirmAccount,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
        }
    });


    // Funcion para modificar el token en el State
    const handleChange = (token : ConfirmToken['token']) => { // Este token es el que se muestra en la pantalla
        setToken(token);
    };

    // Funcion para enviar el token y confirmar la cuenta
    const handleComplete = (token : ConfirmToken['token']) => { // Este token es el que se envia al servidor
        mutate({token}) // Se envia el token (como un objeto) al servidor
    };

    return (
        <>
            <h1 className="text-5xl font-black text-white">Confirma tu Cuenta</h1>
            <p className="text-2xl font-light text-white mt-5">
                Ingresa el código que recibiste {''}
                <span className=" text-fuchsia-500 font-bold"> por e-mail</span>
            </p>
            <form
                className="space-y-8 p-10 bg-white mt-10 shadow-lg rounded-lg"
            >
                <label
                    className="font-normal text-2xl text-center block"
                >Código de 6 dígitos</label>
                <div className="flex justify-center gap-5">
                    <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                        <PinInputField className="w-10 h-10 p-3 rounded-lg shadow-lg border-gray-300 border placeholder-white"/>
                        <PinInputField className="w-10 h-10 p-3 rounded-lg shadow-lg border-gray-300 border placeholder-white"/>
                        <PinInputField className="w-10 h-10 p-3 rounded-lg shadow-lg border-gray-300 border placeholder-white"/>
                        <PinInputField className="w-10 h-10 p-3 rounded-lg shadow-lg border-gray-300 border placeholder-white"/>
                        <PinInputField className="w-10 h-10 p-3 rounded-lg shadow-lg border-gray-300 border placeholder-white"/>
                        <PinInputField className="w-10 h-10 p-3 rounded-lg shadow-lg border-gray-300 border placeholder-white"/>
                    </PinInput>
                </div>

            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to='/auth/new-code'
                    className="text-center text-gray-300 font-normal"
                >
                    Solicitar un nuevo Código
                </Link>
            </nav>
        </>
    );
};