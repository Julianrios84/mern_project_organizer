import useProject from '../../hooks/project.hook';
import PreviewProject from '../../components/project/preview.component';
import Alert from '../../components/alert.component';

const Projects = () => {
  const { projects, alert } = useProject();



  return (
    <>
      <h1 className="text-4xl font-black font-sansita">Proyectos</h1>
      { alert.message && <Alert alert={alert} />}
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
