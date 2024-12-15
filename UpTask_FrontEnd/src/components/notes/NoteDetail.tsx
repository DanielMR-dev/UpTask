import { deleteNote } from "@/api/NoteAPI";
import { useAuth } from "@/hooks/useAuth";
import { Note } from "@/types/index";
import { formatDate } from "@/utils/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";


type NoteDetailProps = {
    note: Note;
};

export default function NoteDetail({ note } : NoteDetailProps) {

    const { data, isLoading } = useAuth();
    const canDelete = useMemo(() => data?._id === note.createdBy._id , [data]); // Verificar si el usuario que está viendo la nota es el creador de la nota
    const params = useParams();   
    const location = useLocation(); // Obtener la ruta actual
    const queryParams = new URLSearchParams(location.search); // Obtener los parámetros de la URL
    const projectId = params.projectId!;
    const taskId = queryParams.get('viewTask')!; // Obtener el ID del task que se está viendo

    const queryClient = useQueryClient(); // Hook para invalidar las Queries
    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['task', taskId] }); // Invalidar la cache de la tarea
        }
    })

    if(isLoading) return 'Cargando...';

    return (
        <div className="p-3 flex justify-between items-center">
            <div>
                <p>
                    {note.content} | por: <span className="font-bold">{note.createdBy.name}</span>
                </p>
                <p className="text-xs text-slate-500">
                    {formatDate(note.createdAt)}
                </p>
            </div>

            {canDelete && (
                <button
                    type="button"
                    className="bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold cursor-pointer transition-colors rounded-lg shadow-lg"
                    onClick={() => mutate({projectId, taskId, noteId: note._id}) }
                >Eliminar</button>
            )}

        </div>
    );
};
