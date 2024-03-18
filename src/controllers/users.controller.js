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
    const { email, password } = req.body;
    const user = await userService.getUsersByEmailPassword(email, password);
    if (!user) {
      return res
        .status(500)
        .send({ status: "error", message: "user not found" });
    }
    req.session.user = {
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      age: user.age,
      role: user.role,
      _id: user._id
    };

    return res.send({ status: "success", message: "login success" });
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
      first_name: first_name,
      last_name: last_name,
      email: email,
      age: age,
      password: password,
      role: "usuario"
    };
    const result = await userService.createUser(user);
    res.status(201).send({ status: "success", result });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await userService.deleteUser(id);
    res.send({ status: "success", result });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
}

const updateRoleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const role = req.body.role;
    let user = {"_id": id,
                "role": role}
    const result = await userService.updateRoleUser(id, user);
    res.send({ status: "success", result });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
}
export { getUsers, getUsersById, createUser, getUsersByEmailPassword, deleteUser, updateRoleUser };
