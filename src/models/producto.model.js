import db from '../config/firebase.js';
// 1. Importamos setDoc para setear el ID manualmente
import { collection, getDocs, getDoc, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';

const productsCollection = collection(db, 'productos');

// Traer todos los productos
export const getProducto = async (req, res) => {
  try {
    const snapshot = await getDocs(productsCollection);
    const productos = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    return res.json(productos);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Traer por ID directo (Sin hacer un find de todo)
export const getProductoById = async (req, res) => {
  const idParam = req.params.id; // Ej: "5" o "6lYIMFelp..."
  try {
    const docRef = doc(db, 'productos', idParam);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    return res.json({ id: docSnap.id, ...docSnap.data() });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Crear producto usando TU ID del Body como ID del documento
export const postProducto = async (req, res) => {
  try {
    // 2. Recibimos el id que mandás desde Thunder Client (ej: 5)
    const { id, name, price } = req.body; 

    if (!id) {
      return res.status(400).json({ error: 'El ID es obligatorio para crear el producto.' });
    }

    // 3. Creamos la referencia apuntando a ese ID específico (convertido a String)
    const docRef = doc(db, 'productos', String(id));
    
    // 4. Usamos setDoc en lugar de addDoc
    await setDoc(docRef, { name, price });

    return res.status(201).json({ id: String(id), name, price });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Actualizar producto (Ahora directo por ID)
export const putProducto = async (req, res) => {
  const idParam = req.params.id;
  try {
    const docRef = doc(db, 'productos', idParam);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const { name, price } = req.body;
    await updateDoc(docRef, { name, price });
    
    return res.json({ id: idParam, name, price });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Eliminar producto directo
export const deleteProducto = async (req, res) => {
  const idParam = req.params.id;
  try {
    const docRef = doc(db, 'productos', idParam);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    await deleteDoc(docRef);
    return res.json({ message: 'Producto eliminado' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};