import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Alert from '../../components/alert.component';

const Confirm = () => {
  const [alert, setAlert] = useState({});
  const [accountConfirm, setAccountConfirm] = useState(false);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const { data } = await axios(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/confirm/${id}`
        );
        setAlert({
          message: data.message,
          error: false
        });
        setAccountConfirm(true);
      } catch (error) {
        setAlert({
          message: error.response.data.message,
          error: true
        });
      }
    };

    confirmAccount();
  }, []);

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl font-sansita">
        Confirma tu cuenta y comienza a crear tus {''}
        <span className="text-slate-700 font-sansita">projectos</span>
      </h1>
      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
        {alert && <Alert alert={alert} />}

        {accountConfirm && (
          <Link
            className="block text-center my-5 text-slate-500 text-sm"
            to="/"
          >
            Inicia sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default Confirm;
