
export default function AddNoteForm() {
    return (
        <form
            onSubmit={() => {} }
            className="space-y-3"
            noValidate
        >
            <div>
                <label className="font-bold" htmlFor="content">Crear Nota</label>
                <input 
                    id="content"
                    type="text"
                    placeholder="Contenido de la nota"
                    className="w-full p-3 border border-gray-400 rounded-lg"
                />
            </div>

            <input 
                type="submit" 
                value="Crear Nota"
                className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 text-white font-black cursor-pointer transition-colors shadow-lg rounded-lg"
            />

        </form>
    );
}
