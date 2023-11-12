import mongoose from "mongoose";

const cartsCollection = 'carts';

//definir el esquema de nuestro documento, atributos del usuario

const cartSchema = new mongoose.Schema({
	products: Array
})

// Parte funcionalde modelo.

export const cartModel = mongoose.model(cartsCollection, cartSchema)