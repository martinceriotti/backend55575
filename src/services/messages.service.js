import MessageRepository from "../repositories/messages.repository.js";

const messageRepository = new MessageRepository();

const getMessages = async() =>{
    const result = await messageRepository.getMessages();
    return result;
    //logica del negocio
}

const getMessagesById = async (id) => {
    const result = await messageRepository.getMessagesById(id);
    return result;
}

const createMessage = async (message) => {
    const result = await messageRepository.createMessage(message);
    return result;
}

const updateMessage = async (id, message) => {
    const result = await messageRepository.updateMessage(id, message);
    return result;
}

export {
    getMessages,
    getMessagesById,
    createMessage,
    updateMessage
}

