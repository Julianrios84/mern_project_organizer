import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Alert from '../../../components/alert.component';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === '' || email.length < 6) {
      setAlert({
        message: 'El email es obligatorio',
        error: true
      });
      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/reset/password`,
        {
          email
        }
      );
      setAlert({
        message: data.message,
        error: false
      });
      setEmail('');
    } catch (error) {
      setAlert({
        message: error.response.data.message,
        error: true
      });
    }
  };

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl font-sansita">
        Recupera tu acceso y no pierdas tus {''}
        <span className="text-slate-700 font-sansita">projectos</span>
      </h1>

      {alert && <Alert alert={alert} />}

      <form
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
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
            placeholder="Email de registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Enviar Instrucciones"
          className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 text-sm"
          to="/register"
        >
          ¿Ya tienes una cuenta?, Inicia sesión
        </Link>
      </nav>
    </>
  );
};

export default ForgetPassword;
