import { Link } from 'react-router-dom';
import { ConfirmToken } from '@/types/index';
import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { useMutation } from '@tanstack/react-query';
import { validateToken } from '@/api/AuthAPI';
import { toast } from 'react-toastify';

type NewPasswordTokenProps = {
    token: ConfirmToken['token'];
    setToken: React.Dispatch<React.SetStateAction <string> >;
    setValidToken: React.Dispatch<React.SetStateAction<boolean> >;
};

export default function NewPasswordToken({token, setToken, setValidToken} : NewPasswordTokenProps) {

    // Funcion de mutación encargada de llamar a la API para validar el token
    const { mutate } = useMutation({
        mutationFn: validateToken,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            setValidToken(true); // Se actualiza el estado de validación del token para cambiar la ventana
        }
    })

    // Funcion encargada de actualizar el state del token mientras se escribe el token
    const handleChange = (token: ConfirmToken['token']) => {
        setToken(token);
    };
    
    // Función encargada de llamar a la función de mutación cuando el token se completa
    const handleComplete = (token: ConfirmToken['token']) => mutate({ token }); // Llama a la función de mutación para validar el token, se envía como un objeto

    return (
        <>
            <form
                className="space-y-8 p-10 rounded-lg shadow-lg bg-white mt-10"
            >
                <label
                    className="font-normal text-2xl text-center block"
                >Código de 6 dígitos</label>
                <div className="flex justify-center gap-5">
                    <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                        <PinInputField className="h-10 w-10 p-3 rounded-lg shadow-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg shadow-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg shadow-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg shadow-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg shadow-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg shadow-lg border-gray-300 border placeholder-white" />
                    </PinInput>
                </div>
            </form>
            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to='/auth/forgot-password'
                    className="text-center text-gray-300 font-normal"
                >
                    Solicitar un nuevo Código
                </Link>
            </nav>
        </>
    );
};