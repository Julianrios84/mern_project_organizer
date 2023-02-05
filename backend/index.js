import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import database from './config/db.js';
import userRoutes from './routes/user.route.js';
import projectRoutes from './routes/project.route.js';
import taskRoutes from './routes/task.route.js';

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

dotenv.config();

// Base de datos
database();

// Configuracion CORS
const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      // Origenes autorizados
      callback(null, true);
    } else {
      // Origenes no autorizados
      callback(new Error('Origen no autorizado'));
    }
  }
};

app.use(cors(corsOptions));

// Routing
app.use('/api/user', userRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/task', taskRoutes);

const applisten = app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});

// Server Socket.io
import { Server } from 'socket.io';

const io = new Server(applisten, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.FRONTEND_URL
  }
});

io.on('connection', (socket) => {
  console.log('Conectado a socket.io');

  // Definir los eventos de socket
  socket.on('open project', (project) => {
    socket.join(project);
  });

  socket.on('create task', (task) => {
    const project = task.project;
    socket.to(project).emit('added task', task);
  });

  socket.on('remove task', (task) => {
    const project = task.project.hasOwnProperty('_id') ? task.project._id : task.project;
    socket.to(project).emit('deleted task', task);
  });

  socket.on('update task', (task) => {
    const project = task.project._id;
    socket.to(project).emit('updated task', task);
  });

  socket.on('completed task', (task) => {
    const project = task.project._id;
    socket.to(project).emit('task done', task);
  })
});
