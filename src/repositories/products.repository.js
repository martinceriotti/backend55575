import ProductsDao from '../dao/dbManagers/classes/products.dao.js'

export default class ProductsRepository {
    constructor() {
        this.dao = new ProductsDao();
    }
    getProducts = async () => {
        const result = await this.dao.getProducts();
        return result;
    }
    getProductById = async (id) => {
        const result = await this.dao.getProductById(id);
        return result;
    }
    createProduct = async (product) => {
        const result = this.dao.createProduct(product);
        return result;
    }

    updateProduct = async (id, product) => {
        const result = this.dao.updateProduct(id, product);
        return result;
    }
} 