import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <>
    <h1 className="text-sky-600 font-black text-6xl font-sansita">
      Crea tu cuenta y administra tus {''}
      <span className="text-slate-700 font-sansita">projectos</span>
    </h1>
    <form className="my-10 bg-white shadow rounded-lg p-10">
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
          placeholder="Nombre de registro"
          className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
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
          placeholder="Email de registro"
          className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
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
          placeholder="Contaseña"
          className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
        />
      </div>
      <div className="my-5">
        <label
          className="capitalize text-gray-600 block text-xl font-bold"
          htmlFor="password2"
        >
          Confirmar Contraseña
        </label>
        <input
          id="password2"
          type="password"
          placeholder="Confirma tu contraseña"
          className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
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
        ¿Ya tienes una cuenta?, Inicia sesión
      </Link>

    </nav>
  </>
  )
}

export default Register