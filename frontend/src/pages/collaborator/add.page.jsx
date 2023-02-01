import { useEffect } from "react"
import { useParams } from "react-router-dom"
import FormCollaborator from "../../components/collaborator/form.component"
import useProject from "../../hooks/project.hook"


const AddCollaborator = () => {

  const params = useParams()
  const { getProject, project } = useProject();

  useEffect(() => {
    getProject(params.id)
  }, [])

  return (
    <>
      <h1 className='text-4xl font-black text-center'>Añadir colaborador(a) al proyecto: {project.name}</h1>

      <div className='mt-10 flex justify-center'>
        <FormCollaborator />
      </div>
    </>
  )
}

export default AddCollaborator