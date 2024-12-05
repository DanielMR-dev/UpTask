import { getTaskById } from "@/api/TaskAPI";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";

export default function EditTaskData() {
    const params = useParams();
    const projectId = params.projectId!; // Se obtiene el ID del projecto desde los params

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search); // Obtiene los parámetros de la URL
    const taskId = queryParams.get('editTask')!; // ! asegura que solo sea string

    const { data } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({projectId, taskId})
    });

    console.log(data);

    return (
        <div>EditTaskData</div>
    );
};
