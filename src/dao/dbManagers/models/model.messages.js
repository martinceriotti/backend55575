import mongoose from "mongoose";

const messagesCollection = "messages";

//definir el esquema de nuestro documento, atributos del usuario

const messagesSchema = new mongoose.Schema({
  user: String,
  message: String,
});

// Parte funcionalde modelo.
const messagesModel = mongoose.model(messagesCollection, messagesSchema);
export { messagesModel};
