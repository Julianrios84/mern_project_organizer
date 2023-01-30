import useProject from '../../hooks/project.hook';
import PreviewProject from '../../components/project/preview.component';

const Projects = () => {
  const { projects } = useProject();

  return (
    <>
      <h1 className="text-4xl font-black">Proyectos</h1>
      <div className="bg-white shadow mt-10 rounded-lg p-5">
        {projects.length ? (
          projects.map((project) => (
            <PreviewProject key={project._id} project={project} />
          ))
        ) : (
          <p className="text-center text-gray-600">No hay proyectos aún</p>
        )}
      </div>
    </>
  );
};

export default Projects;
