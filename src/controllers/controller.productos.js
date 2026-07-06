import {
  getProductos,
  getProductoById as getProductoByIdModel,
  createProducto,
  updateProducto,
  deleteProducto as deleteProductoModel,
} from '../models/producto.model.js';

const handleError = (res, error) => {
  const statusCode = error.statusCode || 500;
  return res.status(statusCode).json({ error: error.message });
};

export const getProducto = async (req, res) => {
  try {
    const productos = await getProductos();
    return res.json(productos);
  } catch (error) {
    return handleError(res, error);
  }
};

export const getProductoById = async (req, res) => {
  try {
    const producto = await getProductoByIdModel(req.params.id);
    return res.json(producto);
  } catch (error) {
    return handleError(res, error);
  }
};

export const postProducto = async (req, res) => {
  try {
    const producto = await createProducto(req.body);
    return res.status(201).json(producto);
  } catch (error) {
    return handleError(res, error);
  }
};

export const putProducto = async (req, res) => {
  try {
    const producto = await updateProducto(req.params.id, req.body);
    return res.json(producto);
  } catch (error) {
    return handleError(res, error);
  }
};

export const deleteProducto = async (req, res) => {
  try {
    const resultado = await deleteProductoModel(req.params.id);
    return res.json(resultado);
  } catch (error) {
    return handleError(res, error);
  }
};