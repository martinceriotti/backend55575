import { productsModel } from "../models/model.product.js";

export default class ProductsDao {
  getProducts = async (pagex, limit, ascdesc, query) => {
    let page = !pagex ? 1 : pagex;
    limit = !limit ? 10 : limit;
    const sort = !ascdesc ? {} : { price: +ascdesc };
    query = !query ? {} : query;
    console.log(page);
    ascdesc = Number.parseInt(ascdesc);
    let {
      docs,
      totalDocs,
      limita,
      pagea,
      totalPages,
      hasNextPage,
      nextPage,
      hasPrevPage,
      prevPage,
      pagingCounter,
    } = await productsModel.paginate(query, {
      limit,
      page,
      lean: true,
      sort,
    }); //filtro y opciones
    console.log(nextPage);
    return {
      payload:docs,
      hasPrevPage,
      hasNextPage,
      nextPage,
      prevPage,
      totalPages,
      totalDocs,
    };
  };
  getProductById = async (id) => {
    const result = await productsModel.findById(id);
    return result;
  };
  createProduct = async (product) => {
    const result = await productsModel.create(product);
    return result;
  };
  updateProduct = async (id, product) => {
    const result = await productsModel.findByIdAndUpdate(id, product);
    return result;
  };
}
