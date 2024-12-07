import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTaskById, updateStatus } from '@/api/TaskAPI';
import { toast } from 'react-toastify';
import { formatDate } from '@/utils/utils';
import { statusTranslations } from '@/locales/es';
import { TaskStatus } from '@/types/index';


export default function TaskModalDetails() {

    // Obtener projectId
    const params = useParams();
    const projectId = params.projectId!; // Obtener projectId desde la URL

    const navigate = useNavigate();

    const location = useLocation(); // Obtener la ruta actual
    const queryParams = new URLSearchParams(location.search); // Obtener los parámetros de la URL
    const taskId = queryParams.get('viewTask')!; // Obtener el ID del task que se está viendo

    const show = taskId ? true : false; // Mostrar el modal si hay un ID de task

    const { data, isError, error } = useQuery({
        queryKey: ['task', taskId], // Clave de la caché
        queryFn: () => getTaskById({projectId, taskId}),
        enabled: !!taskId, // Solo realizar la consulta si taskId existe
        retry: false
    });

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
            queryClient.invalidateQueries({queryKey: ['task', taskId]}); // Invalidar el query de "task" para actualizar la información de la tarea en el modal
            navigate(location.pathname, {replace : true}); // Cierra la ventana Modal
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const status = e.target.value as TaskStatus; // Obtener el valor seleccionado
        const data = { projectId, taskId, status }; // Crear el objeto con los datos para la actualización
        mutate(data); // Realizar la actualización con el hook de mutación
    };

    if(isError) {
        toast.error(error.message, { toastId: 'error' }); // Mostrar un mensaje de error y con toastId se crea un id para no mostrar toast adicionales
        return <Navigate to={`/projects/${projectId}`} />; // Redirigir a la página de proyectos si hay un error
    };

    if(data) return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {replace: true})}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <p className='text-sm text-slate-400'>Agregada el: { formatDate( data.createdAt )}</p>
                                    <p className='text-sm text-slate-400'>Última actualización: { formatDate( data.updatedAt )}</p>

                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl text-slate-600 my-5"
                                    >{data.name}</Dialog.Title>

                                    <p className='text-lg text-slate-500 mb-2'>Descripción: {data.description}</p>
                                    <div className='my-5 space-y-3'>
                                        <label className='font-bold'>Estado Actual:</label>
                                        <select 
                                            className='w-full p-3 bg-white border border-gray-300'
                                            defaultValue={data.status}
                                            onChange={handleChange}
                                        >
                                            {Object.entries(statusTranslations).map(([key, value]) => (
                                                <option key={key} value={key}>{value}</option>
                                            ))}
                                        </select>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};