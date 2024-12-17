import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Project, TaskProject, TaskStatus } from "@/types/index";
import TaskCard from "./TaskCard";
import { statusTranslations } from "@/locales/es";
import DropTask from "./DropTask";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStatus } from "@/api/TaskAPI";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";


type TaskListProps = {
    tasks: TaskProject[];
    canEdit: boolean;
};

type GroupedTasks = {
    [key: string]: TaskProject[]; // Base de los arreglos de las tareas
};

// Valores iniciales para el objeto de tareas
const intialStatusGroups : GroupedTasks = {
    pending: [], 
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: [],
};

// Diccionario de colores
const statusStyles: {[key:string] : string} = { // Las keys y los valores son strings
    pending: 'border-t-slate-500', 
    onHold: 'border-t-red-500',
    inProgress: 'border-t-blue-500',
    underReview: 'border-t-amber-500',
    completed: 'border-t-emerald-500',
}

export default function TaskList({ tasks, canEdit } : TaskListProps) {

    // Obtener projectId
    const params = useParams();
    const projectId = params.projectId!; // Obtener projectId desde la URL
    const queryClient = useQueryClient(); // Obtener la instancia de la caché

    // Hook encargado de realizar la actualización
    const { mutate } = useMutation({
        mutationFn: updateStatus,
        onError(error) {
            toast.error(error.message);
        },
        onSuccess(data) {
            toast.success(data);
            queryClient.invalidateQueries({queryKey: ['project', projectId]}); // Invalidar el query de "project" para actualizar la lista de las tareas
        }
    });

    // Agrupar las tareas en un objeto
    const groupedTasks = tasks.reduce((acc, task) => { // 
        let currentGroup = acc[task.status] ? [...acc[task.status]] : []; // 
        currentGroup = [...currentGroup, task];
        return { ...acc, [task.status]: currentGroup };
    }, intialStatusGroups);

    const handleDragEnd = (e : DragEndEvent) => {
        const { over, active } = e;
        if(over && over.id) {
            const taskId = active.id.toString(); // Obtener el id de la tarea que se arrastró
            const status = over.id as TaskStatus; // Obtener el status de la tarea que se está arrastrando
            mutate({projectId, taskId, status}); // Llamar a la función de actualización

            // Actualizar el query en tiempo real
            queryClient.setQueryData(['project', projectId], (prevData : Project) => {
                const updatedTasks = prevData.tasks.map((task: TaskProject) => {
                    if(task._id === taskId) {
                        return {
                            ...task,
                            status
                        };
                    };
                    return task;
                });

                return {
                    ...prevData,
                    tasks: updatedTasks // Actualizar la lista de tareas
                };
            });
        };
    };

    return (
        <>
            <h2 className="text-5xl font-black my-10">Tareas</h2>

            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
                <DndContext onDragEnd={handleDragEnd}>
                    {Object.entries(groupedTasks).map(([status, tasks]) => (
                        <div key={status} className='flex-1 min-w-[200px] 2xl:min-w-0'>
                            <h3 
                                className={`captalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 ${statusStyles[status]}`}
                            >{statusTranslations[status]}</h3>

                            <DropTask status={status} />

                            <ul className='mt-5 space-y-5'>
                                {tasks.length === 0 ? (
                                    <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                                ) : (
                                    tasks.map(task => <TaskCard key={task._id} task={task} canEdit={canEdit} />)
                                )}
                            </ul>
                        </div>
                    ))}
                </DndContext>
            </div>
        </>
    );
};
