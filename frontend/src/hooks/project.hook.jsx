import { useContext } from 'react';
import ProjectContext from '../context/project.context';

const useProject = () => {
  return useContext(ProjectContext);
};

export default useProject;
