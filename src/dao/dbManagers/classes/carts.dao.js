import { cartModel } from "../models/model.cart.js";

export default class CartsDao {
  getCarts = async () => {
    const result = await cartModel.find();
    return result;
  };
  getCartById = async (cid) => {
    const result = await cartModel.findById(cid);
    const popu = await result.populate('products.product');
    console.log(popu.products);
    return popu;
  };
  createCart = async (cart) => {
    const result = await cartModel.create(cart);
    return result;
  };
  updateCart = async (id, cart) => {
    const result = await cartModel.findIdAndUpdate(id, cart);
    return result;
  };
  deleteCartProductsArray = async (cid) => {
    const cart = {
      products: [],
    };
    const result = await cartModel.findByIdAndUpdate(cid, cart);
    return result;
  };
  deleteCartProduct = async (cid, pid) => {
    const cartaux = await cartModel.findById(cid);
    const index = cartaux.products.findIndex((e) => e._id == pid);
    cartaux.products[index].quantity = 0;
    const result = await cartModel.findByIdAndUpdate(cid, cartaux);
//    const result = await cartModel.updateOne({ _id: cid }, { $pull: { products: { product: { _id:  pid } } } })
    return result;
  };
}
