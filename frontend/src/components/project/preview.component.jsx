
import { Link } from 'react-router-dom'

const PreviewProject = ({project}) => {
  const { _id, name, client } = project
  return (
    <div className='border-b p-5 flex'>
      <div className='flex-1 '>
       <div className='flex justify-between'>
        <p className='font-sansita'> {name}</p>
          <span className='flex text-sm text-gray-500 capitalize'>
          Cliente  {client}
          </span>
       </div>
      </div>
     
      <Link to={`${_id}`} className='flextext-gray-600 w-40 hover:text-gray-800 uppercase text-sm text-end font-bold'>
      Ver proyecto</Link>
    </div>
  )
}

export default PreviewProject
