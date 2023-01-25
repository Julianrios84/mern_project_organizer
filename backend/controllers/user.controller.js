import User from '../models/user.model.js';
import generateId from '../helpers/generateId.helper.js';

const register = async (req, res) => {
  try {
    const { email } = req.body;
    const exist = User.findOne({ email });
    if (exist) {
      const error = new Error('Usuario ya registrado');
      return res.status(400).json({ message: error.message });
    }
    const user = new User(req.body);
    user.token = generateId();
    const result = await user.save();
    res.json(result);
  } catch (error) {
    console.log('🚀 ~ file: user.controller.js:8 ~ register ~ error', error);
  }
};

const autenticate = async (req, res) => {
  const { email, password } = req.body

  const user = User.findOne({ email })
  if(!user) {
    const error = new Error('El usuario no existe')
    return res.status(404).json({ message: error.message })
  }

  if(!user.confirm) {
    const error = new Error('Tu cuenta no a sido confirmada')
    return res.status(403).json({ message: error.message })
  }
};

export { register, autenticate };
