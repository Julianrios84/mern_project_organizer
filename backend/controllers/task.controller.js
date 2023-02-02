import Task from '../models/task.model.js';
import Project from '../models/project.model.js';

const addTask = async (req, res) => {
  try {
    const { project } = req.body;
    const existProject = await Project.findById(project);

    if (!existProject) {
      const error = new Error('El Proyecto no existe');
      return res.status(404).json({ message: error.message });
    }

    if (existProject.creator.toString() !== req.user._id.toString()) {
      const error = new Error('No tienes los permisos para añadir tareas');
      return res.status(403).json({ message: error.message });
    }

    const result = await Task.create(req.body);
    existProject.tasks.push(result._id);
    await existProject.save();
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id).populate('project');

    if (!task) {
      const error = new Error('Tarea no encontrada');
      return res.status(404).json({ message: error.message });
    }

    if (task.project.creator.toString() !== req.user._id.toString()) {
      const error = new Error('Acción no válida');
      return res.status(401).json({ message: error.message });
    }

    res.json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id).populate('project');

    if (!task) {
      const error = new Error('Tarea no encontrada');
      return res.status(404).json({ message: error.message });
    }
    console.log(task);
    if (task.project.creator.toString() !== req.user._id.toString()) {
      const error = new Error('Acción no válida');
      return res.status(401).json({ message: error.message });
    }

    task.name = req.body.name || task.name;
    task.description = req.body.description || task.description;
    task.priority = req.body.priority || task.priority;
    task.delivery = req.body.delivery || task.delivery;

    const result = await task.save();
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const removeTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id).populate('project');
    if (!task) {
      const error = new Error('Tarea no encontrada');
      return res.status(404).json({ message: error.message });
    }

    if (task.project.creator.toString() !== req.user._id.toString()) {
      const error = new Error('Acción no válida');
      return res.status(401).json({ message: error.message });
    }

    const project = await Project.findById(task.project);
    await Promise.allSettled([await project.tasks.pull(task._id), await task.deleteOne()])
    res.json({ message: 'Tarea eliminada' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const changeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id).populate('project');
    if (!task) {
      const error = new Error('Tarea no encontrada');
      return res.status(404).json({ message: error.message });
    }

    if (
      task.project.creator.toString() !== req.user._id.toString() &&
      !task.collaborators.some(
        (collaborator) =>
          collaborator._id.toString() === req.user._id.toString()
      )
    ) {
      const error = new Error('Acción no válida');
      return res.status(401).json({ message: error.message });
    }

    task.status = !task.status;
    task.completed = req.user._id;
    await task.save();

    const result = await Task.findById(id).populate('project').populate('completed');

    res.json(result)
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { addTask, getTask, updateTask, removeTask, changeStatus };
