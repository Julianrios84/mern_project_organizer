import useProject from '../../hooks/project.hook'

const Projects = () => {

  const { projects } = useProject()
  console.log("🚀 ~ file: projects.page.jsx:6 ~ Projects ~ projects", projects)

  return (
    <>
      <h1 className='text-4xl font-black'>Proyectos</h1>
      <div className='bg-white shadow mt-10 rounded-lg p-5'>
        {
          projects.length ? (
            <p>Si hay proyectos</p>
          ): (
            <p className='text-center text-gray-600'>No hay proyectos aún</p>
          )
         }
        
      </div>
    </>
  )
}

export default Projects