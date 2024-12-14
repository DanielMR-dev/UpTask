import type { Request, Response } from "express";
import Note, { INote } from '../models/Note';

export class NoteController {
    static createNote = async (req: Request<{}, {}, INote>, res: Response) => { // Usando generic se le da el type de INote al req.body
        const { content } = req.body; // Se extrae el contenido de la nota
        const note = new Note; // Crear la instacia de Note
        note.content = content; // Se asigna el contenido a la nota
        note.createdBy = req.user.id; // Se asigna el id del usuario que creo la nota
        note.task = req.task.id; // Se asigna el id de la tarea a la nota
        req.task.notes.push(note.id); // Se agrega la nota a la tarea
        try {
            await Promise.allSettled([req.task.save(), note.save()]); // Se guardan la tarea y la nota en la base de datos
            res.send('Nota Creada Correctamente');
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Server Error' });
        }
    };
};