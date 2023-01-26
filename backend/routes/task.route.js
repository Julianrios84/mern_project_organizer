import express from 'express';

import {
  addTask, getTask,  updateTask, removeTask, changeStatus
} from '../controllers/task.controller.js'

import checkAuth from '../middlewares/check.auth.middleware.js';

const router = express.Router();

router.post('/', checkAuth, addTask)
router
  .route('/:id')
  .get(checkAuth, getTask)
  .put(checkAuth, updateTask)
  .delete(checkAuth, removeTask)

router.post('/status/:id', checkAuth, changeStatus)

export default router;
