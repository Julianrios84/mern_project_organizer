import { useState } from 'react';
import useProject from '../../hooks/project.hook';
import Alert from '../alert.component';

const FormCollaborator = () => {
  const [email, setEmail] = useState('');

  const { showAlert, alert, submitCollaborator } = useProject()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(email === '') {
      showAlert({
        message: 'El email es obligatorio',
        error: true
      })
      return;
    }

    await submitCollaborator(email);


  }

  return (
    <form className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow" onSubmit={handleSubmit}>
      {alert.message && <Alert alert={alert} />}
      <div className="mb-5">
        <label htmlFor="email" className="text-gray-700 font-bold text-sm">
          Email colaborador
        </label>
        <input
          type="email"
          id="email"
          placeholder="Email colaborador"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <input
        type="submit"
        className="bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded text-sm"
        value={'Buscar'}
      />
    </form>
  );
};

export default FormCollaborator;
