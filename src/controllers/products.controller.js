import * as productService from "../services/products.service.js";
import { generateProducts } from "../utils.js";
import config from "../config/config.js";

const getProducts = async (req, res) => {
  try {
    const { page, limit, ascdesc, query } = req.query;
    const result = await productService.getProducts(
      page,
      limit,
      ascdesc,
      query
    );
    config.entorno == "desarrollo"
    ? req.logger.debug("getProducts")
    : req.logger.info("getProducts");
    res.send({ status: "success", result });
  } catch (error) {
    config.entorno == "desarrollo"
    ? req.logger.debug("getProducts error")
    : req.logger.info("getProducts error");
    res.status(500).send({ status: "error", message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await productService.getProductById(id);
    res.send({ status: "success", result });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = req.body;
    const result = await productService.createProduct(product);

    var io = req.app.get("socketio");
    const products = await productService.getProducts();
    io.emit("messageProduct", products);
    config.entorno == "desarrollo"
      ? req.logger.debug("createProduct")
      : req.logger.info("createProduct");
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

const mockingProducts = async (req, res) => {
  try {
    const result = generateProducts();
    res.send({ status: "success", result });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};

export {
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
  mockingProducts,
};
