import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import clientAxios from '../config/axios.config';

const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate()

  useEffect( () => {
    const getProjects = async () => {
      try {
        const token = localStorage.getItem('token')
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }; 
        const { data } = await clientAxios('/project', config);
        setProjects(data)
      } catch (error) {
        console.log("🚀 ~ file: project.context.jsx:25 ~ getProjects ~ error", error)
        
      } 
    }
     getProjects()
  }, [])


  const showAlert = (data) => {
    setAlert(data);
    setTimeout(() => {
      setAlert({});
    }, 5000);
  };

  const submitProject = async (project) => {
    try {
      const token = localStorage.getItem('token')
      if(!token) return
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }; 
      await clientAxios.post('/project', project, config);
      setAlert({
        message: 'Proyecto creado correctamente.',
        error: false
      })
      setTimeout(() => {
          setAlert({})
          navigate('/projects')
      }, 2000);
    } catch (error) {
      setAlert({
        message: error.response.data.message,
        error: false
      })
    }
  };

  return (
    <ProjectContext.Provider
      value={{ projects, alert, showAlert, submitProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectProvider };
export default ProjectContext;
