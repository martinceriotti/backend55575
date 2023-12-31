import * as cartService from "../services/carts.service.js";

const getCarts = async (req, res) => {
  try {
    const result = await cartService.getCarts();
    res.send({ status: "success", result });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};

const getCartById = async (req, res) => {
  try {
    const cid = req.params.cid;
    const result = await cartService.getCartById(cid);
    res.send({ status: "success", result });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};

const createCart = async (req, res) => {
  const cartProducts = req.body.products;
  const cart = {
    products: cartProducts,
  };
  console.log(cart);
  try {
    const result = await cartService.createCart(cart);
    res.status(201).send({ status: "success", result });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const id = req.params;
    const cart = req.body;
    const result = await cartService.updateCart(id, cart);
    res.send({ status: "success", result });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};

const deleteCartProduct = async(req, res) => {
  try {
    const {cid, pid} = req.params;
    const result = await cartService.deleteCartProduct(cid, pid);
    res.send({ status: "success", result });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
}

const deleteCartProductsArray = async(req, res) => {
  try {
    const {cid} = req.params;
    const result = await cartService.deleteCartProductsArray(cid);
    res.send({ status: "success", result });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
}
export { createCart, updateCart, getCartById, getCarts, deleteCartProduct, deleteCartProductsArray};
