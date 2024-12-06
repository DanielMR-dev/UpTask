import { Task } from "@/types/index";
import TaskCard from "./TaskCard";
import { statusTranslations } from "@/locales/es";


type TaskListProps = {
    tasks: Task[];
};

type GroupedTasks = {
    [key: string]: Task[]; // Base de los arreglos de las tareas
};

// Valores iniciales para el objeto de tareas
const intialStatusGroups : GroupedTasks = {
    pending: [], 
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: [],
}


// Diccionario de colores
const statusStyles: {[key:string] : string} = { // Las keys y los valores son strings
    pending: 'border-t-slate-500', 
    onHold: 'border-t-red-500',
    inProgress: 'border-t-blue-500',
    underReview: 'border-t-amber-500',
    completed: 'border-t-emerald-500',
}

export default function TaskList({tasks} : TaskListProps) {
    // Agrupar las tareas en un objeto
    const groupedTasks = tasks.reduce((acc, task) => { // 
        let currentGroup = acc[task.status] ? [...acc[task.status]] : []; // 
        currentGroup = [...currentGroup, task];
        return { ...acc, [task.status]: currentGroup };
    }, intialStatusGroups);

    return (
        <>
            <h2 className="text-5xl font-black my-10">Tareas</h2>

            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
                {Object.entries(groupedTasks).map(([status, tasks]) => (
                    <div key={status} className='flex-1 min-w-[200px] 2xl:min-w-0'>
                        <h3 
                            className={`captalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 ${statusStyles[status]}`}
                        >{statusTranslations[status]}</h3>
                        <ul className='mt-5 space-y-5'>
                            {tasks.length === 0 ? (
                                <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                            ) : (
                                tasks.map(task => <TaskCard key={task._id} task={task} />)
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    );
};
