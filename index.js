
import express from 'express';
import {auth} from './src/middlewars/auth.middlewars.js';
import authRouter from './src/routes/auth.router.js';
//levanta las variables de entorno desde el archivo .env
import dotenv from 'dotenv';
dotenv.config();
//importo las rutas
import productosRouter from './src/routes/products.router.js';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.get('/', (req, res) => {
  res.json({
    message: "¡Bienvenido a la API de Productos de Verduleria y Fruteria!",
    status: "Online",
    version: "1.0.0"
  });
});

// Middleware de aplicación
app.use((req, res, next) => { 
console.log(`Datos recibidos: ${req.method} ${req.url}`); 
next(); // Pasa el control al siguiente middleware o ruta 
}); 

//prefijo: /api/productos
//para GET http://localhost:3000/api/productos
//para GET http://localhost:3000/api/productos/:id
//para POST http://localhost:3000/api/productos
//para PUT http://localhost:3000/api/productos/:id
//para DELETE http://localhost:3000/api/productos/:id
app.use('/api/productos', productosRouter);
app.use('/api/auth', authRouter);
 //en la terminal me pude conectar a la base de datos,
//pero con node src/seeders/productos.seeders.js
//no tiene nada que ver con mi servidor local  
app.use((req, res) => {
  res.status(404).send('Ruta no encontrada');
});
// En tu index.js, antes de levantar el app.listen

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
 




