import db from '../config/firebase.js';
import { collection, getDocs, getDoc, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';

const productsCollection = collection(db, 'productos');

const createHttpError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export const getProductos = async () => {
  const snapshot = await getDocs(productsCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getProductoById = async (id) => {
  const docRef = doc(db, 'productos', id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw createHttpError('Producto no encontrado', 404);
  }

  return { id: docSnap.id, ...docSnap.data() };
};

export const createProducto = async ({ id, name, price }) => {
  if (!id) {
    throw createHttpError('El ID es obligatorio para crear el producto.', 400);
  }

  const docRef = doc(db, 'productos', String(id));
  await setDoc(docRef, { name, price });

  return { id: String(id), name, price };
};

export const updateProducto = async (id, data) => {
  const docRef = doc(db, 'productos', id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw createHttpError('Producto no encontrado', 404);
  }

  await updateDoc(docRef, data);
  return { id, ...data };
};

export const deleteProducto = async (id) => {
  const docRef = doc(db, 'productos', id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw createHttpError('Producto no encontrado', 404);
  }

  await deleteDoc(docRef);
  return { message: 'Producto eliminado' };
};