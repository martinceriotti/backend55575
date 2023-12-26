import mongoose from "mongoose";

const messagesCollection = "messages";

//definir el esquema de nuestro documento, atributos del usuario

const messagesSchema = new mongoose.Schema({
  email: String,
  message: String,
});

// Parte funcionalde modelo.
const messageModel = mongoose.model(messagesCollection, messagesSchema);
export default messageModel;
