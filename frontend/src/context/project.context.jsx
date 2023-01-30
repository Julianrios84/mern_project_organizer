import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import clientAxios from '../config/axios.config';

const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        };
        const { data } = await clientAxios('/project', config);
        setProjects(data);
      } catch (error) {
        console.log(
          '🚀 ~ file: project.context.jsx:25 ~ getProjects ~ error',
          error
        );
      }
    };
    getProjects();
  }, []);

  const showAlert = (data) => {
    setAlert(data);
    setTimeout(() => {
      setAlert({});
    }, 5000);
  };

  const submitProject = async (project) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      if(project.id !== '') {
        await updateProject(project, config)
      }else {
       await createProject(project, config)
      }

      
      setTimeout(() => {
        setAlert({});
        navigate('/projects');
      }, 1000);
    } catch (error) {
      setAlert({
        message: error.response.data.message,
        error: false
      });
    }
  };

  const createProject = async (project, config) => {
    const { data } = await clientAxios.post('/project', project, config);
    setProjects([...projects, data]);
    setAlert({
      message: 'Proyecto creado correctamente.',
      error: false
    });
  }

  const updateProject = async (project, config) => {
    const { data } = await clientAxios.put(`/project/${project.id}`, project, config);
    const updatedProjects = projects.map(state => state._id === data._id ? data : state);
    setProjects(updatedProjects)
    setAlert({
      message: 'Proyecto actualizado correctamente.',
      error: false
    });
  }

  const getProject = async (id) => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token');
      if (!token) return;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      const { data } = await clientAxios.get(`/project/${id}`, config);
      setProject(data)
    } catch (error) {
      setAlert({
        message: error.response.data.message,
        error: false
      });
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <ProjectContext.Provider
      value={{ projects, project, alert, loading, showAlert, submitProject, getProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectProvider };
export default ProjectContext;
