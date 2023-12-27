import { usersModel } from "../models/model.users.js";

export default class UsersDao {
    getUsers = async () => {
        const result = await usersModel.find();
        return result;
    }
    getUSerById = async (id) => {
        const result = await usersModel.findById(id);
        return result;
    }
    getUSerByEmail = async (email) => {
        const result = await usersModel.findOne({email});
        return result;
    } 
    
    getUSerByEmailPassword = async (email, password) => {
        const result = await usersModel.findOne({email, password});
        return result;
    }    
    createUser = async (user) => {
        const result = await usersModel.create(user);
        return result;
    }
    updateUser = async (id, user) => {
        const result = await usersModel.findIdAndUpdate(id, user);
        return result;
    }
}