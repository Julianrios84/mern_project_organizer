
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/auth.hook'

const PreviewProject = ({project}) => {
  const { auth } = useAuth()
  const { _id, name, client, creator } = project
  return (
    <div className='border-b p-5 flex flex-col md:flex-row justify-between'>
      <div className='flex items-center'>
      <div className='flex-1 '>
       <div className='flex justify-between'>
        <p className='font-sansita'> {name}</p>
          <span className='flex text-sm text-gray-500 capitalize'>
          Cliente  {client}
          </span>
       </div>
      </div>

      {auth._id !== creator && (
        <p className='p-1 text-sm rounded-lg text-white bg-green-500 font-bold'>Colaborador</p>
      ) } 
      </div>
     
      <Link to={`${_id}`} className='flextext-gray-600 w-40 hover:text-gray-800 uppercase text-sm text-end font-bold'>
      Ver proyecto</Link>
    </div>
  )
}

export default PreviewProject
