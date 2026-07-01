import { generateToken } from '../../utils/token.generator.js';

const datos_cliente = {
    id: 1,
    name: 'Aro',
    email: 'aro@gmail.com',
    password: 'password123',
    admin: true,
};

const token = generateToken(datos_cliente);
export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (email === datos_cliente.email && password === datos_cliente.password) {
    res.json({ message: `Login exitoso con email: ${email}`, token });
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
}