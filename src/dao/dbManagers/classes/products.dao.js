import { productsModel } from "../models/model.product.js";

export default class ProductsDao {
    getProducts = async () => {
        const result = await productsModel.find();
        return result;
    }
    getProductById = async (id) => {
        const result = await productsModel.findById(id);
        return result;
    }
    createProduct = async (product) => {
        const result = await productsModel.create(product);
        return result;
    }
    updateProduct = async (id, product) => {
        const result = await productsModel.findByIdAndUpdate(id, product);
        return result;
    }
}