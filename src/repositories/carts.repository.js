import CartsDao from "../dao/dbManagers/classes/carts.dao.js";

export default class CartsRepository{
    constructor() {
        this.dao = new CartsDao();
    }
    getCarts = async () => {
        const result = await this.dao.getCarts();
        return result;
    }
    getCartById = async (id) => {
        const result = await this.dao.getCartById(id);
        return result;
    }
    createCart = async (cart) => {
        const result = this.dao.createCart(cart);
        return result;
    }
    updateCart = async (id, cart) => {
        const result = this.dao.updateCart(id, cart);
        return result;
    }
    deleteCartProductsArray = async (cid) => {
        const result = this.dao.deleteCartProductsArray(cid);
        return result;
      };
    deleteCartProduct = async (cid, pid) => {
        const result = this.dao.deleteCartProduct(cid, pid);
        return result;
      };      
} 
