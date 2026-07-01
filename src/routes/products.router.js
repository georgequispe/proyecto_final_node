import { Router } from 'express';
import { auth } from '../middlewars/auth.middlewars.js';
import { getProducto,
         getProductoById, 
         postProducto, 
         putProducto,
         deleteProducto } from '../controllers/controller.productos.js';
const router = Router();
//pedimos autenticacion para las rutas que modifican datos, es decir, POST, PUT y DELETE
router.get('/', getProducto);
router.get('/:id', getProductoById);
router.post('/',auth, postProducto);
router.put('/:id', auth, putProducto);
router.delete('/:id', auth, deleteProducto);

export default router;