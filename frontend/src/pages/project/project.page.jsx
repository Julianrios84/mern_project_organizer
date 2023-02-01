import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ModalTask from '../../components/task/modal.component';
import DeleteTask from '../../components/task/delete.component';
import Task from '../../components/task/task.component';
import useProject from '../../hooks/project.hook';
import Alert from '../../components/alert.component';
import Collaborator from '../../components/collaborator/collaborator.component';
import DeleteCollaborator from '../../components/collaborator/delete.component';

const Project = () => {
  const params = useParams();

  const { getProject, project, loading, handleModalTask, alert } = useProject();

  useEffect(() => {
    getProject(params.id);
  }, []);

  const { name } = project;

  return loading ? (
    <p>Loading...</p>
  ) : (
    <>
      <div className="flex justify-between">
        <h1 className="font-black text-4xl font-sansita">{name}</h1>
        <div className="flex items-center gap-2 text-gray-400 hover:text-black cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>

          <Link
            to={`/projects/edit/${params.id}`}
            className="uppercase font-bold"
          >
            Editar
          </Link>
        </div>
      </div>
      <button
        type="button"
        onClick={handleModalTask}
        className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-600 text-white text-center mt-5 flex gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Nueva tarea
      </button>

      <p className="font-bold text-xl mt-10">Tareas del proyecto</p>
      {alert.message && <Alert alert={alert} />}
      <div className="bg-white shadow mt-10 rounded-lg">
        {project.tasks?.length ? (
          project.tasks?.map((task) => <Task key={task._id} task={task} />)
        ) : (
          <p className="text-center my-5 p-10">
            No hay tareas en este proyecto.
          </p>
        )}
      </div>

      <div className="flex items-center justify-between mt-10">
        <p className="font-bold text-xl mt-10">Colaboradores</p>
        <Link
          to={`/projects/collaborator/${project._id}`}
          className="text-gray-400 hover:text-black uppercase font-bold"
        >
          Añadir
        </Link>
      </div>

      <div className="bg-white shadow mt-10 rounded-lg">
        {project.collaborators?.length ? (
          project.collaborators?.map((collaborator) => <Collaborator key={collaborator._id} collaborator={collaborator} />)
        ) : (
          <p className="text-center my-5 p-10">
            No hay colaboradores en este proyecto.
          </p>
        )}
      </div>

      <ModalTask />
      <DeleteTask />
      <DeleteCollaborator />
    </>
  );
};

export default Project;
