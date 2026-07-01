
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
//esta funcion genera un token para el usuario que se loguea
export const generateToken = (user) => {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    admin: Boolean(user.admin),
  };

  const secret = process.env.JWT_SECRET || 'secret_key';
  const options = { expiresIn: '1h' };

  return jwt.sign(payload, secret, options);
};
