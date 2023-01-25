import User from '../models/user.model.js'

const register = async (req, res) => {

  try {
    const user = new User(req.body)
    const result = await user.save()
    res.json(result)
  } catch (error) {
    console.log("🚀 ~ file: user.controller.js:8 ~ register ~ error", error)
  }
}

export {
  register
}