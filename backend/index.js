import express from 'express'
import dotenv from 'dotenv'
import database from './config/db.js'
import userRoutes from './routes/user.route.js'

const app = express()
const port = process.env.PORT || 4000

dotenv.config()

database();

// Routing
app.use('/api/users', userRoutes)

app.listen(port, () => {
  console.log(`Server running in port ${port}`)
})


