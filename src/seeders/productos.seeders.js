import db from '../config/firebase.js';
// 1. Cambiamos addDoc por doc y setDoc
import { collection, doc, setDoc } from "firebase/firestore";

const productsColection = collection(db, "productos");
//usamos este array para crear los productos en la base de datos
const productos = [
  { id: 1, name: 'manzana', price: 1500.99 },
  { id: 2, name: 'pera', price: 1900.99 },
  { id: 3, name: 'uva', price: 500.99 },
  { id: 4, name: 'banana', price: 1000.99 },
]

const createProductos = async() => {
    for (const producto of productos) {
        // 2. Creamos la referencia usando el id del array (como string)
        const docRef = doc(db, "productos", String(producto.id));
        
        // 3. Guardamos los datos con setDoc (sacando el id de adentro si no querés duplicarlo en los campos)
        await setDoc(docRef, { name: producto.name, price: producto.price });
    }
};

createProductos();
