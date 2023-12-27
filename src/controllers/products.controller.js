import * as productService from "../services/products.service.js";

const getProducts = async (req, res) => {
  try {
    const result = await productService.getProducts();
    res.send({ status: "success", result });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};

const getProductById = async (req, res) => {
    try {
    const id = req.params.id;
    const result = await productService.getProductById(id) ;
    res.send({ status: "success", result });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = req.body;
    const result = await productService.createProduct(product);

    var io = req.app.get('socketio');
    const products = await productService.getProducts()
    io.emit("messageProduct", products)

    res.status(201).send({ status: "success", result });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = req.body;
    const result = await productService.updateProduct(id, product);
    res.send({ status: "success", result });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};

export {
  getProductById,
  getProducts,
  createProduct,
  updateProduct
}