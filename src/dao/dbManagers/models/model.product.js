import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
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

productSchema.plugin(mongoosePaginate);
const productsModel = mongoose.model(productsCollection, productSchema);
export {productsModel}
