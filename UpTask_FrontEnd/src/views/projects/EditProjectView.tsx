import { useParams } from "react-router-dom";

export default function EditProjectView() {
    const params = useParams();
    const projectId = params.projectId!; // ! es usado para asegurarse de que el valor no sea null o undefined
    console.log(projectId);

    return (
        <div>EditProjectView</div>
    );
};
