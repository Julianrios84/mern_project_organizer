import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import database from './config/db.js'
import userRoutes from './routes/user.route.js'
import projectRoutes from './routes/project.route.js'
import taskRoutes from './routes/task.route.js'

const app = express()
const port = process.env.PORT || 4000

app.use(express.json())

dotenv.config()

// Base de datos
database();

// Configuracion CORS
const whiteList = [process.env.CORS_ORIGINS]

const corsOptions = {
  origin: function(origin, callback) {
    if(whiteList.includes(origin)){
      // Origenes autorizados
      callback(null, true)
    }else {
      // Origenes no autorizados
      callback(new Error('Origen no autorizado'))
    }
  }
}

app.use(cors(corsOptions))

// Routing
app.use('/api/users', userRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/tasks', taskRoutes)

app.listen(port, () => {
  console.log(`Server running in port ${port}`)
})


