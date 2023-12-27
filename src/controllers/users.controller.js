import * as userService from "../services/users.service.js";

const getUsers = async (req, res) => {
  try {
    const result = await userService.getUsers();
    res.send({ status: "success", result });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};

const getUsersById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await userService.getUsersById(id);
    res.send({ status: "success", result });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};

const getUsersByEmailPassword = async (req, res) => {
  try {
    const {email, password} = req.body;
    const result = await userService.getUsersByEmailPassword(email, password);
    if (!result) {
      return res.status(500).send({ status: "error", message: 'user not found' });
    }
    res.send({ status: "success", result });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;
    if (!first_name || !last_name || !email || !age || !password) {
      return res
        .status(422)
        .send({ status: "error", message: "incomplete values" });
    }
    const exists = await userService.getUsersByEmail(email);
   
    if (exists) {
      return res
        .status(400)
        .send({ status: "error", message: "User already exists" });
    }
    const user = {
      "first_name" : first_name,
      "last_name" : last_name,
      "email" : email,
      "age" : age,
      "password" : password
    }
    const result = await userService.createUser(user);
    res.status(201).send({ status: "success", result });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};

export { getUsers, getUsersById, createUser, getUsersByEmailPassword };
