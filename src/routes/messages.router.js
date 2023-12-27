import { Router } from "express";
import bodyParser from "body-parser";
import {getMessageById, getMessages, createMessage, updateMessage} from '../controllers/messages.controller.js'
// import messageModel from "../dao/dbManagers/models/model.messages.js";
// import { accessRolesEnum, passportStrategiesEnum } from '../config/emuns.js';

const router = Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', getMessages);
router.get('/:id', getMessageById);
router.post('/', createMessage);
router.put('/:id', updateMessage);

// router.post("/", [accessRolesEnum.USER], passportStrategiesEnum.JWT, async (req, res) => {
//   const { email, message } = req.body;
//   console.log(email);
//   console.log(message);
//   if (!email || !message) {
//     return res
//       .status(400)
//       .send({ status: "error", message: "incomplete values" });
//   }
//   try {
//     const result = await messageModel.create({ email, message });
//     return res.status(201).send({ status: "success", payload: result });
//   } catch (error) {
//     res.status(400).send({ status: "error", message: error.message });
//   }
// });

export default router;
