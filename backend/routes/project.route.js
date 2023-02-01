import express from 'express';

import {
  getProjects,
  createProject,
  getProject,
  updateProject,
  removeProject,
  searchCollaborators,
  addCollaborator,
  removeCollaborator
} from '../controllers/project.controller.js';

import checkAuth from '../middlewares/check.auth.middleware.js';

const router = express.Router();

router.route('/').get(checkAuth, getProjects).post(checkAuth, createProject);

router
  .route('/:id')
  .get(checkAuth, getProject)
  .put(checkAuth, updateProject)
  .delete(checkAuth, removeProject);

router.post('/collaborator', checkAuth, searchCollaborators);

router
  .route('/collaborator/:id')
  .post(checkAuth, addCollaborator)
  .delete(checkAuth, removeCollaborator);

export default router;
