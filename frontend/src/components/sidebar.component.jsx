import { Link } from 'react-router-dom'
import useAuth from '../hooks/auth.hook'

const Sidebar = () => {

  const { auth } = useAuth()

  return (
    <aside className='md:w-80 lg:w-96 px-5 py-10'>
      <p className='text-xl font-bold'>
        Hola: Admin
        <Link to='/projects/create' className='bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-md'>
          Nuevo proyecto
        </Link>
      </p>
    </aside>
  )
}

export default Sidebar