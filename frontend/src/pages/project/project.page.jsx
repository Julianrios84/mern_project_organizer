import { useEffect } from "react"
import { useParams } from 'react-router-dom'
import useProject from '../../hooks/project.hook'

const Project = () => {

  const params = useParams()
  const { getProject, project, loading } = useProject()

  useEffect(() => {
    getProject(params.id)
  }, [])

  const { name } = project;

  return (
    loading ? (
      <p>Loading...</p>
    ): (
      <div>
        <h1 className="font-black text-4xl font-sansita">{name}</h1>
      </div>
    )
  )
}

export default Project