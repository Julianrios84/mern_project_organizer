import { useState, useEffect, createContext } from 'react';
import clientAxios from '../config/axios.config';

const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {

  const [projects, setProjects] = useState([]);

  return (
    <ProjectContext.Provider value={{projects}}>{children}</ProjectContext.Provider>
  );
};

export { ProjectProvider };
export default ProjectContext;
