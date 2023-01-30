import { useState, useEffect, createContext } from 'react';
import clientAxios from '../config/axios.config';

const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {

  const [projects, setProjects] = useState([]);
  const [alert, setAlert] = useState(false);

  const showAlert = (data) => {
    setAlert(data)
    setTimeout(() => {
      setAlert({})
    }, 5000);
  }

  const submitProject = async (project) => {
    console.log(project)
  }

  return (
    <ProjectContext.Provider value={{projects, alert, showAlert, submitProject}}>{children}</ProjectContext.Provider>
  );
};

export { ProjectProvider };
export default ProjectContext;
