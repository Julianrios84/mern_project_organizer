import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FormProject from '../../components/project/form.component';
import useProject from '../../hooks/project.hook';

const UpdateProject = () => {

  const params = useParams();
  const { getProject, project, loading } = useProject();

  useEffect(() => {
    getProject(params.id);
  }, []);

  const { name } = project;

  return loading ? (
    <p>Loading...</p>
  ) : (
    <>
      <h1 className='font-black text-4xl font-sansita'>Editando proyecto : {name}</h1>
      <div className='mt-10 flex justify-center'>
        <FormProject />
      </div>
    </>
  )
}

export default UpdateProject