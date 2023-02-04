import { useEffect } from 'react';
import io from 'socket.io-client';
import useProject from '../../hooks/project.hook';
import PreviewProject from '../../components/project/preview.component';
import Alert from '../../components/alert.component';

let socket;

const Projects = () => {
  const { projects, alert } = useProject();

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
  }, []);

  return (
    <>
      <h1 className="text-4xl font-black font-sansita">Proyectos</h1>
      {alert.message && <Alert alert={alert} />}
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
