import mongoose from "mongoose";

const productsCollection = "products";

//definir el esquema de nuestro documento, atributos del usuario

const productSchema = new mongoose.Schema({
  title: String,
  descripcion: String,
  price: Number,
  thumbnail: String,
  code: { type: String, unique: true  },
  stock: Number,
});

// Parte funcionalde modelo.
const productsModel = mongoose.model(productsCollection, productSchema);
export default productsModel
