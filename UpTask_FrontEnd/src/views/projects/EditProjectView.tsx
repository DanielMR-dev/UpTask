import { getProjectById } from "@/api/ProjectAPI";
import EditProjectForm from "@/components/projects/EditProjectForm";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";

export default function EditProjectView() {
    const params = useParams();
    const projectId = params.projectId!; // ! es usado para asegurarse de que el valor no sea null o undefined
    
    // Traer los proyectos desde la API
    const { data, isLoading, isError } = useQuery({
        queryKey: ['editProject', projectId], // 
        queryFn: () => getProjectById(projectId), // Cuando se tienen que enviar parámetros a la funcion de queryFn se usa la sintáxis de callBack
        retry: false // Si se quiere que se vuelva a intentar la query si falla
    });

    if(isLoading) return 'Cargando...';
    if(isError) return <Navigate to='/404' />

    if(data) return <EditProjectForm />;
};
