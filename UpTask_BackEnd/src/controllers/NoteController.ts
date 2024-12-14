import type { Request, Response } from "express";
import Note, { INote } from '../models/Note';
import { Types } from "mongoose";

type NoteParams = {
    noteId: Types.ObjectId;
};

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

    static getTaskNotes = async (req: Request, res: Response) => { 
        try {
            const notes = await Note.find({task: req.task.id}); // Se buscan las notas de la tarea
            res.json(notes);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Server Error' });
        }
    };

    static deleteNote = async (req: Request<NoteParams>, res: Response) => {
        const { noteId } = req.params; // Se extrae el id de la nota
        const note = await Note.findById(noteId); // Se busca la nota en la base de datos
        
        if(!note) {
            const error = new Error('Nota no encontrada');
            res.status(404).json({error: error.message});
            return;
        };

        if(note.createdBy.toString() !== req.user.id.toString()) {
            const error = new Error('Acción no válida');
            res.status(409).json({error: error.message});
            return;
        };

        req.task.notes = req.task.notes.filter(note => note.toString() !== noteId.toString()); // Se elimina la nota de la tarea

        try {
            await Promise.allSettled([req.task.save(), note.deleteOne()]); // Se actualiza la tarea y la nota se elimina de la base de datos
            res.send('Nota Eliminada Correctamente');
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Server Error' });
        }
    };
};