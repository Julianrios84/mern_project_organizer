import express from 'express';

import {
  getProjects,
  createProject,
  getProject,
  updateProject,
  removeProject,
  addCollaboration,
  removeCollaboration,
  getTask
} from '../controllers/project.controller.js';

import checkAuth from '../middlewares/check.auth.middleware.js';

const router = express.Router();

router.route('/').get(checkAuth, getProjects).post(checkAuth, createProject);

router
  .route('/:id')
  .get(checkAuth, getProject)
  .put(checkAuth, updateProject)
  .delete(checkAuth, removeProject);

router.get('/task/:id', checkAuth, getTask);

route
  .route('/collaboration/:id')
  .post(checkAuth, addCollaboration)
  .delete(checkAuth, removeCollaboration);

export default router;