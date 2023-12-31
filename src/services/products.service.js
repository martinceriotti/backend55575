import ProductsRepository from "../repositories/products.repository.js";

const producsRepository = new ProductsRepository();

const getProducts = async(page, limit, ascdesc, query) =>{
    const result = await producsRepository.getProducts(page, limit, ascdesc, query);
    return result;
    //logica del negocio
}

const getProductById = async (id) => {
    const result = await producsRepository.getProductById(id);
    return result;
}

const createProduct = async (product) => {
    const result = await producsRepository.createProduct(product);
    return result;
}

const updateProduct = async (id, product) => {
    const result = await producsRepository.updateProduct(id, product);
    return result;
}

export {
    getProductById,
    getProducts,
    createProduct,
    updateProduct
}

