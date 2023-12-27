import * as messageService from "../services/messages.service.js";

const getMessages = async (req, res) => {
  try {
    const result = await messageService.getMessages();
    res.send({ status: "success", result });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};

const getMessageById = async (req, res) => {
  try {
    const id = req.params;
    const result = await messageService.getMessageById(id);
    res.send({ status: "success", result });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};

const createMessage = async (req, res) => {
  try {
    const message = req.body;
    const result = await messageService.createMessage(message);
    res.status(201).send({ status: "success", result });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};

const updateMessage = async (req, res) => {
  try {
    const id = req.params;
    const message = req.body;
    const result = await messageService.updateMessage(id, message);
    res.send({ status: "success", result });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};

export {
  getMessageById,
  getMessages,
  createMessage,
  updateMessage
}