import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Alert from '../../../components/alert.component';

const ResetPassword = () => {
  const [alert, setAlert] = useState({});
  const [tokenValid, setTokenValid] = useState(false);
  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const checkToken = async () => {
      try {
        await axios(
          `${import.meta.env.VITE_BACKEND_URL}/api/reset/password/${token}`
        );
        setTokenValid(true);
      } catch (error) {
        setAlert({
          message: error.response.data.message,
          error: true
        });
      }
    };

    checkToken();
  }, []);

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl font-sansita">
        Reestablece tu password y no pierdas tus {''}
        <span className="text-slate-700 font-sansita">projectos</span>
      </h1>

      {alert && <Alert alert={alert} />}

      {tokenValid && (
        <form className="my-10 bg-white shadow rounded-lg p-10">
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
            />
          </div>

          <input
            type="submit"
            value="Guardar cambios"
            className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </form>
      )}
    </>
  );
};

export default ResetPassword;
