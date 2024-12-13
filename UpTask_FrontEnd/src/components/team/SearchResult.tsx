import { TeamMember } from "@/types/index";

type SearchResultProps = {
    user: TeamMember
};

export default function SearchResult({ user } : SearchResultProps) {
    console.log(user);

    return (
        <>
            <p className="mt-10 text-center font-bold">Resultado:</p>
            <div className="flex justify-between items-center">
                <p>{user.name}</p>
                <button
                    className="text-purple-600 hover:bg-purple-200 px-10 py-3 font-bold cursor-pointer transition-colors shadow-md rounded-lg"
                >Agregar al Proyecto</button>
            </div>
        </>
    );
};
