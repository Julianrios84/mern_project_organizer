import FormProject from '../../components/project/form.component'

const CreateProject = () => {
  return (
    <>
      <h1 className='text-4xl font-black'>Crear proyecto</h1>
      <div className='mt-10 flex justify-center'>
        <FormProject />
      </div>
    </>
  )
}

export default CreateProject