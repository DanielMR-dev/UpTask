import type { ConfirmToken, NewPasswordForm } from "../../types";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { updatePasswordWithToken } from "@/api/AuthAPI";
import { toast } from "react-toastify";

type NewPasswordFormProps = {
    token: ConfirmToken['token'];
};

export default function NewPasswordForm({token} : NewPasswordFormProps ) {
    const navigate = useNavigate();
    const initialValues: NewPasswordForm = {
        password: '',
        password_confirmation: '',
    };

    // Funcion de mutación encargada de llamar a la API para mutar los datos
    const { mutate } = useMutation({
        mutationFn: updatePasswordWithToken, // Función que se ejecuta cuando se hace la petición
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            reset();
            navigate('/auth/login');
        }
    });

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues });


    const handleNewPassword = (formData: NewPasswordForm) => {
        const data = { 
            formData,
            token
        };
        mutate(data); // Se envía el objeto con los datos del formulario y el token a la funcion de mutación
    };

    const password = watch('password');

    return (
        <>
            <form
                onSubmit={handleSubmit(handleNewPassword)}
                className="space-y-8 p-10  bg-white mt-10 shadow-lg rounded-lg"
                noValidate
            >

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Password</label>

                    <input
                        type="password"
                        placeholder="Password de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("password", {
                            required: "El Password es obligatorio",
                            minLength: {
                                value: 8,
                                message: 'El Password debe ser mínimo de 8 caracteres'
                            }
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Repetir Password</label>

                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repite Password de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("password_confirmation", {
                            required: "Repetir Password es obligatorio",
                            validate: value => value === password || 'Los Passwords no son iguales'
                        })}
                    />

                    {errors.password_confirmation && (
                        <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Reestablecer Password'
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer transition-colors shadow-lg rounded-lg"
                />
            </form>
        </>
    );
};