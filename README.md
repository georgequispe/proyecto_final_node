# Proyecto Final - API Node.js & Firestore

Esta es una API REST desarrollada con Node.js y Express para la gestión de productos, integrada con Firebase Firestore como base de datos en la nube. Además, incluye autenticación mediante JWT para proteger las operaciones de creación, edición y eliminación de productos.

## 🚀 Tecnologías utilizadas

- Backend: Node.js, Express
- Base de datos: Firebase Firestore
- Autenticación: JWT (jsonwebtoken)
- Variables de entorno: dotenv
- Herramientas de prueba: Postman o Thunder Client

## ✨ Funcionalidades

- Obtener todos los productos
- Obtener un producto por su ID
- Crear productos
- Actualizar productos
- Eliminar productos
- Iniciar sesión y recibir un token JWT
- Proteger rutas de escritura con middleware de autenticación

## 📁 Estructura de carpetas

```bash
src/
├── config/
│   └── firebase.js
├── controllers/
│   ├── auth.controller.js
│   └── controller.productos.js
├── middlewars/
│   └── auth.middlewars.js
├── models/
│   └── producto.model.js
├── routes/
│   ├── auth.router.js
│   └── products.router.js
├── seeders/
│   └── productos.seeders.js
├── utils/
│   └── token.generator.js
index.js
package.json
README.md
vercel.json
```

## ⚙️ Requisitos previos

- Node.js instalado
- Cuenta en Firebase con un proyecto configurado
- Postman, Thunder Client o curl para probar las rutas

## 🔐 Variables de entorno

Crea un archivo llamado .env en la raíz del proyecto con las siguientes variables:

```env
PORT=3000
JWT_SECRET=mi_secreto_super_seguro
API_KEY=tu_api_key_de_firebase
AUTH_DOMAIN=tu_proyecto.firebaseapp.com
PROJECT_ID=tu_project_id
STORAGE_BUCKET=tu_proyecto.appspot.com
MESSAGING_SENDER_ID=tu_sender_id
APP_ID=tu_app_id
```

> Estas variables se utilizan para conectar la API con Firebase y para firmar los tokens JWT.

## 🛠️ Instalación

1. Clona el repositorio.
2. Instala las dependencias:

```bash
npm install
```

3. Crea el archivo .env con las variables indicadas.
4. Inicia el servidor:

```bash
npm run dev
```

## ▶️ Comandos disponibles

```bash
npm start      # inicia la API en modo producción
npm run dev    # inicia la API en modo desarrollo con reinicio automático
```

## 🌐 Rutas principales

### Ruta base

- GET /

Ejemplo:

```bash
curl http://localhost:3000/
```

Respuesta:

```json
{
  "message": "¡Bienvenido a la API de Productos de Verduleria y Fruteria!",
  "status": "Online",
  "version": "1.0.0"
}
```

### Autenticación

- POST /api/auth/login

Ejemplo de login:

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"aro@gmail.com","password":"password123"}'
```

Respuesta esperada:

```json
{
  "message": "Login exitoso con email: aro@gmail.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

> En la versión actual, el login funciona con un usuario de prueba predeterminado: correo "aro@gmail.com" y contraseña "password123".

### Productos

#### Obtener todos los productos

- GET /api/productos


http://localhost:3000/api/productos


#### Obtener un producto por ID

- GET /api/productos/:id


http://localhost:3000/api/productos/1


#### Crear un producto

- POST /api/productos
Requiere autenticación mediante JWT.

POST http://localhost:3000/api/productos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN" \
  -d '{"id":"100","name":"Manzana","price":2500}'

#### Actualizar un producto

- PUT /api/productos/:id

 PUT http://localhost:3000/api/productos/100 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN" \
  -d '{"name":"Manzana Roja","price":2800}'


#### Eliminar un producto

- DELETE /api/productos/:id

 DELETE http://localhost:3000/api/productos/100 \
  -H "Authorization: Bearer TU_TOKEN"


## 🔑 Uso del token JWT

Después de hacer login, debes enviar el token en el encabezado de autorización:

```http
Authorization: Bearer <token>
```

El middleware de autenticación valida que el token sea válido y no haya expirado. Si falta o es inválido, la API responde con estado 401 o 403.

## 🧪 Ejemplo completo de uso

1. Inicia sesión:

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"arianaquispe41@gmail.com","password":"pedirme por mi email"}'
```

2. Copia el token recibido.
3. Crea un producto enviando el token en el encabezado:

```bash
curl -X POST http://localhost:3000/api/productos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN" \
  -d '{"id":"200","name":"Pera","price":1800}'
```

## 🔍 Deploy

- API base en Vercel: https://proyecto-final-node-one.vercel.app
- Endpoint de productos: https://proyecto-final-node-one.vercel.app/api/productos

## 📝 Notas

- La API actualmente usa un usuario de prueba para el login.
- Los productos se almacenan en Firestore en la colección llamada productos.
- Este proyecto es una demostración funcional de una API REST con autenticación JWT y conexión a Firestore. Está pensado para mostrar la arquitectura, el flujo de trabajo y la integración entre backend y base de datos en un entorno de prueba. No está diseñado para uso en producción con datos reales ni para exponer información sensible.



