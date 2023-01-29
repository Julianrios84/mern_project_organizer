import Project from '../models/project.model.js';
import Task from '../models/task.model.js';

const getProjects = async (req, res) => {
  try {
    let projects = await Promise.resolve(Project.find().where('creator').equals(req.user))
    es.json(projects);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    project.creator = req.user._id;
    const result = await project.save();
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Promise.resolve(Project.findById(id));

    if (!project) {
      const error = new Error('Proyecto no encontrado');
      return res.status(404).json({ message: error.message });
    }

    if (project.creator.toString() !== req.user._id.toString()) {
      const error = new Error('Acción no valida');
      return res.status(401).json({ message: error.message });
    }

    const tasks = await Promise.resolve(Task.find().where('project').equals(project._id));
    res.json({project, tasks});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Promise.resolve(Project.findById(id));

    if (!project) {
      const error = new Error('Proyecto no encontrado');
      return res.status(404).json({ message: error.message });
    }

    if (project.creator.toString() !== req.user._id.toString()) {
      const error = new Error('Acción no valida');
      return res.status(401).json({ message: error.message });
    }

    project.name = req.body.name || project.name;
    project.description = req.body.description || project.description;
    project.delivery = req.body.delivery || project.delivery;
    project.client = req.body.client || project.client;

    const result = await project.save();
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const removeProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Promise.resolve(Project.findById(id));

    if (!project) {
      const error = new Error('Proyecto no encontrado');
      return res.status(404).json({ message: error.message });
    }

    if (project.creator.toString() !== req.user._id.toString()) {
      const error = new Error('Acción no valida');
      return res.status(401).json({ message: error.message });
    }

    project.deleteOne();
    res.json({ message: 'Projecto eliminado' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addCollaboration = async (req, res) => {};

const removeCollaboration = async (req, res) => {};


export {
  getProjects,
  createProject,
  getProject,
  updateProject,
  removeProject,
  addCollaboration,
  removeCollaboration,
};
