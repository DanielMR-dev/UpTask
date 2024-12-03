import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { Project, ProjectFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/api/ProjectAPI";
import { toast } from "react-toastify";

type EditProjectFormProps = {
    data: ProjectFormData;
    projectId: Project['_id'];
};

export default function EditProjectForm({data, projectId} : EditProjectFormProps) {

    const navigate = useNavigate();

    // Validaciones y valores  del formulario 
    const {register, handleSubmit, formState: {errors} } = useForm({ defaultValues: {
        projectName : data.projectName,
        clientName : data.clientName,
        description : data.description,
    }});

    const queryClient = useQueryClient();

    const { mutate } = useMutation({ // Se aplica destructuring a mutate
        mutationFn: updateProject,
        onError: (error) => { // Si hay un error
            toast.error(error.message); // Muestra el mensaje de error
        },
        onSuccess: (data) => { // Si la operación se ejecuta correctamente toma los datos que retorna la función del mutationFn
            // Con invalidateQueries va a obligar a hacer un query nuevo del query elegido para cuando se redirija al usuario
            queryClient.invalidateQueries({queryKey: ['projects']}); // Invalida el quey de projects
            queryClient.invalidateQueries({queryKey: ['editProject', projectId]}); // Invalida el quey de editProject
            
            toast.success(data); // Muestra el mensaje de éxito
            navigate('/'); // Se redirecciona al usuario hacia la página principal
        }
    });

    // Manejo de la edición del proyecto
    const handleForm = (formData: ProjectFormData) => {
        const data = { // Se pasa un objeto con la información del proyecto
            formData, // Se para la información del formulario
            projectId // Se pasa el id del proyecto
        };
        mutate(data);
    };

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Editar Proyecto</h1>
                <p 
                    className="text-2xl font-light text-gray-500 mt-5"
                >Llena el siguiente formulario para editar el proyecto</p>

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
                        value='Guardar Cambios'
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors shadow-lg rounded-lg"
                    />
                </form>
            </div> 
        </>
    );
};
