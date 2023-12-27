import fs from "fs";
import productsModel from "./models/model.product.js";

class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
    this.status = 1;
  }

  addProduct = async (product) => {
    try {
      const result = await productsModel.create(product); 
      return result;
    } catch (error) {
      return error;
    }
  };
  getProduct = async () => {
    try {
      const result = await productsModel.find();
      return result;
    } catch (error) {
      return error;
    }
  };
  getProductById = async (id) => {
    const products = await this.getProduct();
    return products.find((e) => e.id === id) ?? [];
  };
  updateProduct = async (id, dataToUpdate) => {
    const products = await this.getProduct();
    const updatePrd = products.find((e) => e.id === id);
    updatePrd.title = dataToUpdate.title;
    updatePrd.description = dataToUpdate.description;
    updatePrd.thumbnail = dataToUpdate.thumbnail;
    updatePrd.price = dataToUpdate.price;
    updatePrd.code = dataToUpdate.code;
    updatePrd.stock = dataToUpdate.stock;
    updatePrd.category = dataToUpdate.category;
    updatePrd.status = dataToUpdate.status;
    products.slice(id, 1, updatePrd);
    const result =  await productsModel.updateOne()
    // await fs.promises.writeFile(
    //   this.path,
    //   JSON.stringify(products, null, "\t")
    // );
  };
  deleteProduct = async (id) => {
    try {
      let result = await productsModel.deleteOne({ _id: id });
      console.log(result);
    } catch (error) {
      return error;
    }
  };
}

export default ProductManager;
