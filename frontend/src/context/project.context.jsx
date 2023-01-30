import { useState, useEffect, createContext } from 'react';
import clientAxios from '../config/axios.config';

const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {
  return (
    <ProjectContext.Provider value={{}}>{children}</ProjectContext.Provider>
  );
};

export { ProjectProvider };
export default ProjectContext;
