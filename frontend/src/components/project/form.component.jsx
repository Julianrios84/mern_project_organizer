import { useState } from 'react';

const FormProject = () => {
  const [project, setProject] = useState({
    name: '',
    description: '',
    delivery: '',
    client: ''
  });

  const [alert, setAlert] = useState({});

  const handleChange = (e) => {
    setUser({ ...createProject, [e.target.name]: e.target.value });
  };

  return (
    <form className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">
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
        value="Crear proyecto"
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
      />
    </form>
  );
};

export default FormProject;
