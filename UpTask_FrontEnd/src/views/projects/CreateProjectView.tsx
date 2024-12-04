import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ProjectForm from "@/components/projects/ProjectForm";
import { ProjectFormData } from "@/types/index";
import { createProject } from "@/api/ProjectAPI";

export default function CreateProjectView() {

    const navigate = useNavigate(); 

    // Datos iniciales del Formulario
    const initialValues : ProjectFormData = {
        projectName : '',
        clientName : '',
        description : '',
    };

    // Validaciones y valores del formulario 
    const { register, handleSubmit, formState: {errors} } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({ // Se aplica destructuring a mutate
        mutationFn: createProject, // La función que se va a ejecutar - en este caso createProject no requiere los parámetros
        onError: (error) => { // Si hay un error
            toast.error(error.message);
        },
        onSuccess: (data) => { // Si la operación se ejecuta correctamente toma los datos que retorna la función del mutationFn
            toast.success(data);
            navigate('/'); // Se redirecciona al usuario hacia la página principal
        }
    });

    // Manejo de la creación de un nuevo proyecto
    const handleForm = (formData : ProjectFormData) => mutate(formData); // La información para crear el proyecto se envía en la función de mutate
    
    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Crear Proyecto</h1>
                <p 
                    className="text-2xl font-light text-gray-500 mt-5"
                >Llena el siguiente formulario para crear un proyecto</p>

                <nav className="my-5">
                    <Link 
                        className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors shadow-lg rounded-lg"
                        to={'/'}
                    >Volver a Proyectos</Link>
                </nav>

                <form 
                    className="mt-10 bg-white shadow-lg p-10 rounded-lg"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >
                    <ProjectForm
                        register={register}
                        errors={errors}
                    />

                    <input 
                        type="submit" 
                        value='Crear Proyecto'
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors shadow-lg rounded-lg"
                    />
                </form>
            </div> 
        </>
    );
};
