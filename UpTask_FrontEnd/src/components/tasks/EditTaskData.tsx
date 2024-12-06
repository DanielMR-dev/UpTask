import { getTaskById } from "@/api/TaskAPI";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation, useParams } from "react-router-dom";
import EditTaskModal from "./EditTaskModal";

export default function EditTaskData() {
    const params = useParams();
    const projectId = params.projectId!; // Se obtiene el ID del projecto desde los params

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search); // Obtiene los parámetros de la URL
    const taskId = queryParams.get('editTask')!; // "!" asegura que solo sea string

    const { data, isError } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({projectId, taskId}),
        // Con base en una condición se activa o no la consulta
        enabled: !!taskId // Solo se ejecuta si taskId es true, solo es true si tiene algo
    });

    if(isError) return <Navigate to={'/404'} />

    if(data) return <EditTaskModal data={data} taskId={taskId} />
};
