import mongoose from 'mongoose'

const taskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: Boolean,
    default: false
  },
  delivery: {
    type: Date,
    required: true,
    default: Date.now()
  },
  priority: {
    type: String,
    required: true,
    enum: ['Short', 'Medium', 'High']
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  }
}, { timestamps: true })

const Task = mongoose.model("Task", taskSchema)
export default Task