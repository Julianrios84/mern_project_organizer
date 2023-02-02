import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import clientAxios from '../config/axios.config';

const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalTask, setModalTask] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false);
  const [task, setTask] = useState({});
  const [collaborator, setCollaborator] = useState({});
  const [deleteCollaborator, setDeleteCollaborator] = useState(false);

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

      if (project.id !== '') {
        await updateProject(project, config);
      } else {
        await createProject(project, config);
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
  };

  const updateProject = async (project, config) => {
    const { data } = await clientAxios.put(
      `/project/${project.id}`,
      project,
      config
    );
    const updatedProjects = projects.map((state) =>
      state._id === data._id ? data : state
    );
    setProjects(updatedProjects);
    setAlert({
      message: 'Proyecto actualizado correctamente.',
      error: false
    });
  };

  const deleteProject = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      await clientAxios.delete(`/project/${id}`, config);
      const updatedProjects = projects.filter((state) => state._id !== id);
      setProjects(updatedProjects);
      setAlert({
        message: 'Proyecto eliminado correctamente.',
        error: false
      });

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

  const getProject = async (id) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) return;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      const { data } = await clientAxios.get(`/project/${id}`, config);
      setProject(data);
    } catch (error) {
      setAlert({
        message: error.response.data.message,
        error: true
      });
    } finally {
      setLoading(false);
    }
  };

  const handleModalTask = () => {
    setModalTask(!modalTask);
    setTask({});
  };

  const submitTask = async (task) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      if (task.id !== '') {
        await updateTask(task, config);
      } else {
        await createTask(task, config);
      }

      setTimeout(() => {
        setAlert({});
        setModalTask(false);
      }, 1000);
    } catch (error) {
      setAlert({
        message: error.response.data.message,
        error: false
      });
    }
  };

  const createTask = async (task, config) => {
    const { data } = await clientAxios.post('/task', task, config);
    const updateProject = { ...project };
    updateProject.tasks = [...project.tasks, data];
    setProject(updateProject);
    setAlert({
      message: 'Tarea creado correctamente.',
      error: false
    });
  };

  const updateTask = async (task, config) => {
    const { data } = await clientAxios.put(`/task/${task.id}`, task, config);
    const updateProject = { ...project };
    updateProject.tasks = updateProject.tasks.map((state) =>
      state._id === data._id ? data : state
    );
    setProject(updateProject);
    setAlert({
      message: 'Tarea actualizado correctamente.',
      error: false
    });
  };

  const handleUpdateTask = async (task) => {
    setTask(task);
    setModalTask(true);
  };

  const handleDeleteTask = async (task) => {
    setTask(task);
    setDeleteTask(!deleteTask);
  };

  const removeTask = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      await clientAxios.delete(`/task/${task._id}`, config);

      setAlert({
        message: 'Tarea eliminado correctamente.',
        error: false
      });

      const updateProject = { ...project };
      updateProject.tasks = updateProject.tasks.filter(
        (state) => state._id !== task._id
      );
      setProject(updateProject);
      setDeleteTask(false);
      setTask({});
      setTimeout(() => {
        setAlert({});
      }, 1000);
    } catch (error) {
      setAlert({
        message: error.response.data.message,
        error: false
      });
    }
  };

  const submitCollaborator = async (email) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) return;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const { data } = await clientAxios.post(
        `project/collaborator`,
        { email },
        config
      );

      setCollaborator(data);
      setAlert({});
    } catch (error) {
      setAlert({
        message: error.response.data.message,
        error: false
      });
    } finally {
      setLoading(false);
    }
  };

  const addCollaborator = async (email) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const { data } = await clientAxios.post(
        `project/collaborator/${project._id}`,
        { email },
        config
      );

      setAlert({
        message: data.message,
        error: false
      });
      setCollaborator({});
    } catch (error) {
      setAlert({
        message: error.response.data.message,
        error: true
      });
    } finally {
      setTimeout(() => {
        setAlert({});
      }, 1500);
    }
  };

  const handleDeleteCollaborator = async (collaborator) => {
    setCollaborator(collaborator);
    setDeleteCollaborator(!deleteCollaborator);
  };

  const removeCollaborator = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const { data } = await clientAxios.post(
        `project/collaborator/delete/${project._id}`,
        { id: collaborator._id },
        config
      );

      const updateProject = { ...project };
      updateProject.collaborators = updateProject.collaborators.filter(
        (state) => state._id !== collaborator._id
      );
      setProject(updateProject);

      setAlert({
        message: data.message,
        error: false
      });
      setCollaborator({});
      setDeleteCollaborator(false);
    } catch (error) {
      setAlert({
        message: error.response.data.message,
        error: true
      });
    } finally {
      setTimeout(() => {
        setAlert({});
      }, 1500);
    }
  };

  const completedTask = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const { data } = await clientAxios.post(
        `task/status/${id}`,
        { id: collaborator._id },
        config
      );

      setAlert({
        message: data.message,
        error: false
      });
    } catch (error) {
      setAlert({
        message: error.response.data.message,
        error: true
      });
    } finally {
      setTimeout(() => {
        setAlert({});
      }, 1500);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        project,
        alert,
        loading,
        showAlert,
        submitProject,
        getProject,
        deleteProject,
        modalTask,
        handleModalTask,
        submitTask,
        handleUpdateTask,
        task,
        deleteTask,
        handleDeleteTask,
        removeTask,
        submitCollaborator,
        collaborator,
        addCollaborator,
        handleDeleteCollaborator,
        deleteCollaborator,
        removeCollaborator,
        completedTask
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectProvider };
export default ProjectContext;
