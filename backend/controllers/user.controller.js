import User from '../models/user.model.js'
import generateId from '../helpers/generateId.helper.js'

const register = async (req, res) => {

  try {

    const { email } = req.body
    const exist = User.findOne({ email })

    if(exist) {
      const error = new Error('Usuario ya registrado')
      return res.status(400).json({ message: error.message })
    }

    const user = new User(req.body)
    user.token = generateId()
    const result = await user.save()
    res.json(result)
  } catch (error) {
    console.log("🚀 ~ file: user.controller.js:8 ~ register ~ error", error)
  }
}

export {
  register
}