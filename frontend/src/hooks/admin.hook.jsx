import useProject from "./project.hook";
import useAuth from "./auth.hook";

const useAdmin = () => {
    const { project } = useProject()
    const { auth } = useAuth()

    return project.creator === auth._id;
}

export default useAdmin