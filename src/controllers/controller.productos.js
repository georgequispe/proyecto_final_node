// controlador: delega la lógica al modelo (Firestore)
import { getProducto as getProductoModel,
         getProductoById as getProductoByIdModel, 
         postProducto as postProductoModel, 
         putProducto as putProductoModel,
         deleteProducto as deleteProductoModel } from '../models/producto.model.js';

export const getProducto = (req, res) => getProductoModel(req, res);

export const getProductoById = (req, res) => getProductoByIdModel(req, res);

export const postProducto = (req, res) => postProductoModel(req, res);

export const putProducto = (req, res) => putProductoModel(req, res);

export const deleteProducto = (req, res) => deleteProductoModel(req, res);