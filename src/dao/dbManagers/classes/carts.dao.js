import { cartModel } from "../models/model.cart.js";

export default class CartsDao {
    getCarts = async () => {
        const result = await cartModel.find();
        return result;
    }
    getCartById = async (id) => {
        const result = await cartModel.findById(id);
        return result;
    }
    createCart = async (cart) => {
        const result = await cartModel.create(cart);
        return result;
    }
    updateCart = async (id, cart) => {
        const result = await producModel.findIdAndUpdate(id, cart);
        return result;
    }
}
