import { formatterDate } from "../../helpers/formatterdate.helper";
import useProject from "../../hooks/project.hook";

const Task = ({task}) => {

  const { handleUpdateTask, handleDeleteTask } = useProject();

  const { _id, name, description, priority, delivery, status } = task;


  return (
    <div className="border-b p-5 flex justify-between items-center gap-4">
      <div className="">
        <p className="mb-1 text-xl">{name}</p>
        <p className="mb-1 text-sm text-gray-500">{description}</p>
        <p className="mb-1 text-sm">{formatterDate(delivery)}</p>
        <p className="mb-1 text-xl">Prioridad: {priority}</p>
      </div>

      <div className="flex gap-2">
        <button className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg" onClick={() => handleUpdateTask(task)}>Editar</button>
        {status ? (<button className="bg-sky-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">Completa</button>) : (<button className="bg-gray-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">Incompleta</button>)}
        <button className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg" onClick={() => handleDeleteTask(task)}>Eliminar</button>
      </div>

    </div>
  )
}

export default Task