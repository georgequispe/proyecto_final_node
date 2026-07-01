//aqui me valida mi token, si no es valido me devuelve un error 401
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const auth = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'token no enviado o formato inválido' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'necesita token' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'secret_key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'token inválido o expirado' });
    }

    req.user = user;
    next();
  });
};
