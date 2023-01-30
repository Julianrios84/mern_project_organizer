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
      const { data } = await clientAxios.post('/project', project, config);
      setProjects([...projects, data]);
      setAlert({
        message: 'Proyecto creado correctamente.',
        error: false
      });
      setTimeout(() => {
        setAlert({});
        navigate('/projects');
      }, 2000);
    } catch (error) {
      setAlert({
        message: error.response.data.message,
        error: false
      });
    }
  };

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
