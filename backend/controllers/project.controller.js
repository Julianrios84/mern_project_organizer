import Project from '../models/project.model.js'

const getProjects = async (req, res) => {
  const projects = await Project.find().where('creator').equals(req.user)
  res.json(projects)
};

const createProject = async (req, res) => {
  try {
    const project = new Project(req.body)
    project.creator = req.user._id
    const result = await project.save()
    res.json(result)
  } catch (error) {
    console.log("🚀 ~ file: project.controller.js:9 ~ createProject ~ error", error)
  }
};

const getProject = async (req, res) => {};

const updateProject = async (req, res) => {};

const removeProject = async (req, res) => {};

const addCollaboration = async (req, res) => {};

const removeCollaboration = async (req, res) => {};

const getTask = async (req, res) => {};

export {
  getProjects,
  createProject,
  getProject,
  updateProject,
  removeProject,
  addCollaboration,
  removeCollaboration,
  getTask
};
