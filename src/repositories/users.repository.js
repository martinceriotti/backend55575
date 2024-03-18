import UsersDao from "../dao/dbManagers/classes/users.dao.js";

export default class UsersRepository{
    constructor() {
        this.dao = new UsersDao();
    }
    getUsers = async () => {
        const result = await this.dao.getUsers();
        return result;
    }
    getUsersById = async (id) => {
        const result = await this.dao.getUSerById(id);
        return result;
    }
    getUsersByEmail = async (email) => {
        const result = await this.dao.getUSerByEmail(email);
        return result;
    }
    getUsersByEmailPassword = async (email, password) => {
        const result = await this.dao.getUSerByEmailPassword(email, password);
        return result;
    }
    createUser = async (user) => {
        const result = this.dao.createUser(user);
        return result;
    }
    updateUser = async (id, user) => {
        const result = this.dao.updateUser(id, user);
        return result;
    }
    deleteUser = async (id) => {
        const result = this.dao.deleteUser(id);
        return result;
    }
    updateRoleUser = async (id, user) => {
        const result = this.dao.updateRoleUser(id, user);
        return result;
    }
    
} 
