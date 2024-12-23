import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import TaskForm from './TaskForm';
import { TaskFormData } from '@/types/index';
import { createTask } from '@/api/TaskAPI';
import { toast } from 'react-toastify';

export default function AddTaskModal() {

    const navigate = useNavigate(); // Se utilizará para eliminar el query string y redirigir al usuario

    // Revisar si existe ventana Modal
    const location = useLocation(); // Permite leer datos desde la URL
    const queryParams = new URLSearchParams(location.search); // Revisa si hay parámetros en la URL
    const modalTask = queryParams.get('newTask'); // Revisar si existe el parámetro newTask en la URL
    const show = modalTask ? true : false; // Si existe el parámetro, mostrar el modal

    // Obtener projectId
    const params = useParams();
    const projectId = params.projectId!; // Obtener projectId desde la URL

    const initialValues : TaskFormData = {
        name: '',
        description: ''
    };

    // Validaciones y valores del formulario 
    const { register, handleSubmit, reset, formState: { errors } } = useForm({defaultValues: initialValues});

    const queryClient = useQueryClient(); // Se utiliza para obtener/reiniciar la cache de la aplicación

    // Usar useMutation para cuando se agrega una tarea
    const { mutate } = useMutation({
        mutationFn: createTask,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({queryKey: ['project', projectId]}); // Reiniciar el Query del proyecto donde nos encontramos modificando tareas
            reset(); // Reinicia el formulario
            navigate(location.pathname, {replace : true}); // Cierra la ventana Modal
        }
    })

    const handleCreateTask = (formData: TaskFormData) => {
        const data = { // 
            formData,
            projectId
        };
        mutate(data);
    };

    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {replace : true})}>
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
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl  my-5"
                                    >
                                        Nueva Tarea
                                    </Dialog.Title>

                                    <p className="text-xl font-bold">Llena el formulario y crea  {''}
                                        <span className="text-fuchsia-600">una tarea</span>
                                    </p>

                                    <form
                                        className='mt-10 space-y-3'
                                        onSubmit={handleSubmit(handleCreateTask)}
                                        noValidate
                                    >
                                        <TaskForm 
                                            register={register}
                                            errors={errors}
                                        />

                                        <input 
                                            type="submit" 
                                            value='Guardar Tarea'
                                            className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors shadow-lg rounded-lg"
                                        />
                                    </form>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};