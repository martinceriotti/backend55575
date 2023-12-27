import { messagesModel } from "../models/model.messages.js";

export default class MessagesDao {
    getMessages = async () => {
        const result = await messagesModel.find();
        return result;
    }
    getMessagesById = async (id) => {
        const result = await messagesModel.findById(id);
        return result;
    }
    createMessage = async (message) => {
        const result = await messagesModel.create(message);
        return result;
    }
    updateMessage = async (id, message) => {
        const result = await messageModel.findIdAndUpdate(id, message);
        return result;
    }
}