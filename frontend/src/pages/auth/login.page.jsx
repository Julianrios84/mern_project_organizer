import { useState } from 'react';
import { Link } from 'react-router-dom';
import clientAxios from '../../config/axios.config';
import Alert from '../../components/alert.component';
import useAuth from '../../hooks/auth.hook';

const Login = () => {
  const { setAuth } = useAuth();

  const [alert, setAlert] = useState({});
  const [user, setUser] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([user.email, user.password].includes('')) {
      setAlert({
        message: 'Todos los campose son obligatorios.',
        error: true
      });
      return;
    }
    await loginUser();
  };

  const loginUser = async () => {
    try {
      const { data } = await clientAxios.post(`/user/login`, {
        email: user.email,
        password: user.password
      });

      localStorage.setItem('token', data.token);
      setAlert({});
      setAuth(data);
      setUser({ email: '', password: '' });
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
        Inicia sesión y administra tus {''}
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
            placeholder="Contaseña de registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={user.password}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 text-sm"
          to="/register"
        >
          ¿No tienes una cuenta?, Registrate
        </Link>

        <Link
          className="block text-center my-5 text-slate-500 text-sm"
          to="/reset"
        >
          Olvide mi constraseña
        </Link>
      </nav>
    </>
  );
};

export default Login;
