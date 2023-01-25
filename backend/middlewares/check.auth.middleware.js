import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const checkAuth = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.stratsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = User.findById(decoded.id).select(
        '-password -confirm -token -createdAt -updatedAt -__v'
      );
      return next();
    } catch (error) {
      return res.status(404).json({ message: 'Hubo un error' });
    }
  }

  if (!token) {
    const error = new Error('Token no valido');
    return res.status(404).json({ message: error.message });
  }

  next();
};

export default checkAuth;
