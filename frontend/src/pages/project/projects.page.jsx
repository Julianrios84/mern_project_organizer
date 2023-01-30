import useProject from '../../hooks/project.hook'

const Projects = () => {

  const { projects } = useProject()

  return (
    <>
      <h1 className='text-4xl font-black'>Proyectos</h1>
      <div>
        
      </div>
    </>
  )
}

export default Projects