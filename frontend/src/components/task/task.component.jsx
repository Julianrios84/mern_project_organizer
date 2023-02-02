import { formatterDate } from '../../helpers/formatterdate.helper';
import useAdmin from '../../hooks/admin.hook';
import useProject from '../../hooks/project.hook';

const Task = ({ task }) => {
  const { handleUpdateTask, handleDeleteTask, completedTask } = useProject();
  const admin = useAdmin();

  const { _id, name, description, priority, delivery, status, completed } = task;

  return (
    <div className="border-b p-5 flex justify-between items-center gap-4">
      <div className="flex flex-col items-start">
        <p className="mb-1 text-xl">{name}</p>
        <p className="mb-1 text-sm text-gray-500">{description}</p>
        <p className="mb-1 text-sm">{formatterDate(delivery)}</p>
        <p className="mb-1 text-xl">Prioridad: {priority}</p>
        { status && <p className='text-xs bg-green-600 p-1 rounded-lg text-white'>Completado por {completed.name}</p>}
      </div>

      <div className="flex gap-2">
        {admin && (
          <button
            className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={() => handleUpdateTask(task)}
          >
            Editar
          </button>
        )}

        <button
          className={`${status ? 'bg-sky-600' : 'bg-gray-600'} px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
          onClick={() => completedTask(_id)}
        >
          {status ? 'Completa' : 'Incompleta'}
        </button>

        {admin && (
          <button
            className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={() => handleDeleteTask(task)}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};

export default Task;
