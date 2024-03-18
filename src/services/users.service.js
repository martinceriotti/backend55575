import UsersRepository from "../repositories/users.repository.js";

const usersRepository = new UsersRepository();

const getUsers = async() =>{
    const result = await usersRepository.getUsers();
    return result;
    //logica del negocio
}

const getUsersById = async (id) => {
    const result = await usersRepository.getUsersById(id);
    return result;
}

const getUsersByEmail = async (email) => {
    const result = await usersRepository.getUsersByEmail(email);
    return result;
}

const getUsersByEmailPassword = async (email, password) => {
    const result = await usersRepository.getUsersByEmailPassword(email, password);
    return result;
}

const createUser = async (user) => {
    const result = await usersRepository.createUser(user);
    return result;
}

const updateUser = async (id, user) => {
    const result = await usersRepository.updateUser(id, user);
    return result;
}

const deleteUser = async (id) => {
    const result = await usersRepository.deleteUser(id);
    return result;
}

const updateRoleUser = async (id, user) => {
    const result = await usersRepository.updateRoleUser(id, user);
    return result;
}

export {
    getUsers,
    getUsersById,
    createUser,
    updateUser,
    getUsersByEmail,
    getUsersByEmailPassword,
    deleteUser,
    updateRoleUser
}

