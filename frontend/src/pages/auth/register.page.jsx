import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../../components/alert.component'

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirm: ''
  });

  const [alert, setAlert] = useState({});

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]:e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      [
        user.pet,
        user.owner,
        user.email,
        user.admission,
        user.symptom,
      ].includes('')
    ) {
      setAlert({
        message: 'Todos los campose son obligatorios.',
        error: true
      });
      return;
    }
  }

  const { message } = alert

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl font-sansita">
        Crea tu cuenta y administra tus {''}
        <span className="text-slate-700 font-sansita">projectos</span>
      </h1>

      { message && <Alert alert={alert} />}

      <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>
        <div className="my-5">
          <label
            className="capitalize text-gray-600 block text-xl font-bold"
            htmlFor="name"
          >
            Nombre
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Nombre de registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={user.name}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="my-5">
          <label
            className="capitalize text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email de registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={user.email}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="my-5">
          <label
            className="capitalize text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Contaseña"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={user.password}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="my-5">
          <label
            className="capitalize text-gray-600 block text-xl font-bold"
            htmlFor="confirm"
          >
            Confirmar Contraseña
          </label>
          <input
            id="confirm"
            type="password"
            name="confirm"
            placeholder="Confirma tu contraseña"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={user.confirm}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <input
          type="submit"
          value="Registrarse"
          className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link className="block text-center my-5 text-slate-500 text-sm" to="/">
          ¿Ya tienes una cuenta?, Inicia sesión
        </Link>
      </nav>
    </>
  );
};

export default Register;
