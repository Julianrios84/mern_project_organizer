import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/auth.hook';
import useProject from '../hooks/project.hook'
import Search from './search.component';

const Header = () => {

  const { signOffAuth } = useAuth()
  const { handleSeeker, signOffProject } = useProject()

  const handleSignOff = async() => {
    signOffProject();
    signOffAuth();
    localStorage.removeItem('token');
  }

  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl text-sky-600 font-black text-center font-sansita mb-5 md:mb-0">
          Project Manager
        </h2>
      

        <div className="flex flex-col md:flex-row items-center gap-4">

          <button type='button' className='font-bold uppercase' onClick={handleSeeker}>
            Buscar proyectos
          </button>

          <Link to="/projects" className="font-bold uppercase">
            Proyectos
          </Link>
          <button
            className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase"
            type="button"
            onClick={handleSignOff}
          >
            Cerrar Sesión
          </button>

          <Search />
        </div>
      </div>
    </header>
  );
};

export default Header;
