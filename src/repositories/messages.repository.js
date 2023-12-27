import MessagesDao from "../dao/dbManagers/classes/messages.dao.js";

export default class MessagesRepository{
    constructor() {
        this.dao = new MessagesDao();
    }
    getMessages = async () => {
        const result = await this.dao.getMessages();
        return result;
    }
    getMessagesById = async (id) => {
        const result = await this.dao.getMessagesById(id);
        return result;
    }
    createMessage = async (message) => {
        const result = this.dao.createMessage(message);
        return result;
    }
    updateMessage = async (id, message) => {
        const result = this.dao.updateMessage(id, message);
        return result;
    }
} 