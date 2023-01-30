import { useState } from 'react';
import useProject from '../../hooks/project.hook';
import Alert from '../../components/alert.component'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const FormProject = () => {
  const [projectId, setProjectId] = useState(null)
  const [project, setProject] = useState({
    name: '',
    description: '',
    delivery: '',
    client: ''
  });

  const { showAlert, alert, submitProject, project: update } = useProject();
  const params = useParams();

  useEffect(() => {
    if(params.id) {
      setProjectId(update._id)
      setProject({
        name: update.name,
        description: update.description,
        delivery: update.delivery?.split('T')[0],
        client: update.client
      })
    }
  }, [params])

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if([project.name, project.description, project.delivery, project.client].includes('')) {
      showAlert({
        message: 'Todos los campos son obligatorios.',
        error: true
      })
      return;
    }

    await submitProject(project)
    setProject({
      name: '',
      description: '',
      delivery: '',
      client: ''
    })
  }

  return (
    <form className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow" onSubmit={handleSubmit}>

      {alert.message && <Alert alert={alert} />}

      <div className="mb-5">
        <label htmlFor="name" className="text-gray-700 font-bold text-sm">
          Nombre proyecto
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Nombre del proyecto"
          value={project.name}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="description"
          className="text-gray-700 font-bold text-sm"
        >
          Descripción proyecto
        </label>
        <textarea
          type="text"
          name="description"
          id="description"
          rows={5}
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Descripción del proyecto"
          value={project.description}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="delivery" className="text-gray-700 font-bold text-sm">
          Entrega proyecto
        </label>
        <input
          type="date"
          name="delivery"
          id="delivery"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Entrega del proyecto"
          value={project.delivery}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="client" className="text-gray-700 font-bold text-sm">
          Nombre cliente
        </label>
        <input
          type="text"
          name="client"
          id="client"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Cliente del proyecto"
          value={project.client}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <input
        type="submit"
        value={projectId ? 'Actualizar' : 'Crear'}
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
      />
    </form>
  );
};

export default FormProject;
