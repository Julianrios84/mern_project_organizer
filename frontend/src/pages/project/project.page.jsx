import { useEffect } from "react"
import { useParams } from 'react-router-dom'
import useProject from '../../hooks/project.hook'

const Project = () => {

  const params = useParams()
  const { getProject } = useProject()

  useEffect(() => {
    getProject(params.id)
  }, [])

  return (
    <div>Project</div>
  )
}

export default Project