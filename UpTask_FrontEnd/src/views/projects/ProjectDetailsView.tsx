import { getProjectById } from "@/api/ProjectAPI";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskList from "@/components/tasks/TaskList";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import { useQuery } from "@tanstack/react-query";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

export default function ProjectDetailsView() {

    const navigate = useNavigate();

    const params = useParams();
    const projectId = params.projectId!; // ! es usado para asegurarse de que el valor no sea null o undefined
    
    // Traer los proyectos desde la API
    const { data, isLoading, isError } = useQuery({
        queryKey: ['project', projectId], // El queryKey es un array que identifica la query
        queryFn: () => getProjectById(projectId), // Cuando se tienen que enviar parámetros a la funcion de queryFn se usa la sintáxis de callBack
        retry: false // Si se quiere que se vuelva a intentar la query si falla
    });

    if(isLoading) return 'Cargando...';
    if(isError) return <Navigate to='/404' />
    if(data) return (
        <>
            <h1 className="text-5xl font-black">{data.projectName}</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>

            <nav className="mt-5 flex gap-3">
                <button
                    type="button"
                    className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors shadow-lg rounded-lg"
                    onClick={() => navigate(location.pathname + '?newTask=true')}
                >Agregar Tarea</button>

                <Link
                    to={'team'}
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors shadow-lg rounded-lg"
                >Colaboradores</Link>

            </nav>
            <TaskList
                tasks={data.tasks}
            />
            <AddTaskModal />
            <EditTaskData /> 
            <TaskModalDetails />
        </>
    );
};
