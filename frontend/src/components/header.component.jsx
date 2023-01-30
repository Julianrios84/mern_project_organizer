import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='px-4 py-5 bg-white border-b'>
      <div className='md:flex md:justify-between'>
        <h2 className='text-4xl text-sky-600 font-black text-center font-sansita'>
          Project Manager
        </h2>

        <input type="search" placeholder='Buscar proyecto' className='rounded-lg lg:w-96 block p-2 border' />

        <div className='flex items-center gap-4'>
          <Link to='/projects' className='font-bold uppercase'>
            Proyectos
          </Link>
          <button className='text-white text-sm bg-sky-600 p-3 rounded-md uppercase' type='button'>Cerrar Sesión</button>
        </div>
      </div>
    </header>
  )
}

export default Header