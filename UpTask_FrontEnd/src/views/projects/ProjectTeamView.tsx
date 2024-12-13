import { Link, useNavigate, useParams } from "react-router-dom";

export default function ProjectTeamView() {

    const navigate = useNavigate();
    const params = useParams(); // Tomar los parametros de la URL
    const projectId = params.projectId!; // ID del proyecto

    return (
        <>
            <h1 className="text-5xl font-black">Administrar Equipo</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">Administra el equipo de trabajo para este proyecto</p>

            <nav className="mt-5 flex gap-3">
                <button
                    type="button"
                    className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors shadow-lg rounded-lg"
                    onClick={() => navigate(location.pathname + '?addMember=true')}
                >Agregar Colaborador</button>

                <Link
                    to={`/projects/${projectId}`}
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors shadow-lg rounded-lg"
                >Volver al Proyecto</Link>

            </nav>
        </>
    );
};
