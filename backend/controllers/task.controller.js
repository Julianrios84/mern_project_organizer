import Project from '../models/project.model.js';
import Task from '../models/task.model.js';

const addTask = async (req, res) => {
  try {
    const { project } = req.body;
    const existProject = Project.findById(project);

    if (!existProject) {
      const error = new Error('El Proyecto no existe');
      return res.status(404).json({ message: error.message });
    }

    if (existProject.creator.toString() !== req.user._id.toString()) {
      const error = new Error('No tienes los permisos para añadir tareas');
      return res.status(404).json({ message: error.message });
    }

    const result = await Task.create(req.body);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getTask = async (req, res) => {};

const updateTask = async (req, res) => {};

const removeTask = async (req, res) => {};

const changeStatus = async (req, res) => {};

export { addTask, getTask, updateTask, removeTask, changeStatus };
