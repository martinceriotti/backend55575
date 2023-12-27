import CartsRepository from "../repositories/carts.repository.js";

const cartsRepository = new CartsRepository();

const getCarts = async() =>{
    const result = await cartsRepository.getCarts();
    return result;
    //logica del negocio
}

const getCartById = async (id) => {
    const result = await cartsRepository.getCartById(id);
    return result;
}

const createCart = async (cart) => {
    const result = await cartsRepository.createCart(cart);
    return result;
}

const updateCart = async (id, cart) => {
    const result = await cartsRepository.updateCart(id, cart);
    return result;
}

export {
    getCartById,
    getCarts,
    createCart,
    updateCart
}

