import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Alert from '../../components/alert.component';
import FormCollaborator from '../../components/collaborator/form.component';
import useProject from '../../hooks/project.hook';

const AddCollaborator = () => {
  const params = useParams();
  const { getProject, project, loading, collaborator, addCollaborator, alert } = useProject();

  useEffect(() => {
    getProject(params.id);
  }, []);

  return !project._id ? <Alert alert={alert} /> :(
    <>
      <h1 className="text-4xl font-black text-center">
        Añadir colaborador(a) al proyecto: {project.name}
      </h1>

      <div className="mt-10 flex justify-center">
        <FormCollaborator />
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        collaborator?._id && (
          <div className="flex justify-center mt-10">
            <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow w-full ">
              <h2 className="text-center mb-10 text-2xl font-bold">
                Resultado:
              </h2>
              <div className="flex justify-between items-center">
                <p>{collaborator.name}</p>
                <button
                  type="button"
                  className="bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm"
                  onClick={() => addCollaborator(collaborator.email)}
                >
                  Agregar al proyecto
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default AddCollaborator;
