import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../../../components/alert.component';
import clientAxios from '../../../config/axios.config';

const ResetPassword = () => {
  const [alert, setAlert] = useState({});
  const [password, setPassword] = useState('');
  const [passwordModifed, setPasswordModifed] = useState(false);
  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const checkToken = async () => {
      try {
        await clientAxios(`/reset/password/${token}`);
        setPasswordModifed(true);
      } catch (error) {
        setAlert({
          message: error.response.data.message,
          error: true
        });
      }
    };

    checkToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlert({
        message: 'La contraseña debe ser minimo de 6 caracteres',
        error: true
      });
      return;
    }

    try {
      const { data } = await clientAxios.post(`/reset/password/${token}`, {
        password
      });
      setAlert({
        message: data.message,
        error: false
      });
      setPassword('');
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
        Reestablece tu password y no pierdas tus {''}
        <span className="text-slate-700 font-sansita">projectos</span>
      </h1>

      {alert && <Alert alert={alert} />}

      {tokenValid && (
        <form
          className="my-10 bg-white shadow rounded-lg p-10"
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label
              className="capitalize text-gray-600 block text-xl font-bold"
              htmlFor="password"
            >
              Nueva contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="Contaseña"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Guardar cambios"
            className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </form>
      )}

      {passwordModifed && (
        <Link className="block text-center my-5 text-slate-500 text-sm" to="/">
          Inicia sesión
        </Link>
      )}
    </>
  );
};

export default ResetPassword;
