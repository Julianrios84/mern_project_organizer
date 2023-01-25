import User from '../models/user.model.js';
import generateId from '../helpers/generateId.helper.js';
import generateToken from '../helpers/generateToken.helper.js';

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
  const { email, password } = req.body;

  const user = User.findOne({ email });
  if (!user) {
    const error = new Error('El usuario no existe');
    return res.status(404).json({ message: error.message });
  }

  if (!user.confirm) {
    const error = new Error('Tu cuenta no a sido confirmada');
    return res.status(403).json({ message: error.message });
  }

  if (!(await user.checkPassword(password))) {
    const error = new Error('Contraseña incorrecta');
    return res.status(403).json({ message: error.message });
  }

  return res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken({ id: user._id })
  });
};

const confirm = async (req, res) => {
  try {
    const { token } = req.params;
    const user = User.findOne({ token });
    if (!user) {
      const error = new Error('Token no valido');
      return res.status(403).json({ message: error.message });
    }
    user.confirm = true;
    user.token = '';
    await user.save();
    res.status(200).json({ message: 'Usuario confirmado correctamente' });
  } catch (error) {
    console.log('🚀 ~ file: user.controller.js:53 ~ confirm ~ error', error);
  }
};

const reset = async (req, res) => {
  try {
    const { email } = req.body
    const user = User.findOne({ email })
    if(!user) {
      const error = new Error('El usuario no existe')
      return res.status(404).json({ message: error.message })
    }
    user.token = generateId()
    await user.save()
    res.status(200).json({ message: 'Hemos enviado un email con las instrucciones' })
  } catch (error) {
    console.log("🚀 ~ file: user.controller.js:70 ~ reset ~ error", error)
  }
}

export { register, autenticate, confirm, reset };
