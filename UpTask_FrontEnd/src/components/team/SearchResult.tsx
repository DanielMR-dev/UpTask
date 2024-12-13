import { addUserToProject } from "@/api/TeamAPI";
import { TeamMember } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

type SearchResultProps = {
    user: TeamMember
};

export default function SearchResult({ user } : SearchResultProps) {

    const params = useParams();
    const projectId = params.projectId!;
    
    // Función de mutación encargada de llamar la función de la API
    const { mutate } = useMutation({
        mutationFn: addUserToProject,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
        }
    });

    // Función encargada de gestionar el botón de agregar un usuario al proyecto
    const handleAddUserToProject = () => {
        const data = { // Se crea el objeto con la información del usuario y el proyecto
            projectId,
            id: user._id
        };
        mutate(data); // Se llama a la función de mutación
    };

    return (
        <>
            <p className="mt-10 text-center font-bold">Resultado:</p>
            <div className="flex justify-between items-center">
                <p>{user.name}</p>
                <button
                    className="text-purple-600 hover:bg-purple-200 px-10 py-3 font-bold cursor-pointer transition-colors shadow-md rounded-lg"
                    onClick={handleAddUserToProject}
                >Agregar al Proyecto</button>
            </div>
        </>
    );
};
