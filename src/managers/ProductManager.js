import fs from 'fs';

class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }

  addProduct = async (product) => {
    try {
      const products = await this.getProduct();

      if (products.some((e) => e.code === product.code) === false) {
        if (validateFields(product)) {
          product.id = products.length + 1;
          products.push(product);

          //una vez hecho el procesamiento hay que guardar en el archivo.
          await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))
          return product;

        } else {
          console.log(`Some fields are incompleted`);
        }
      } else {
        console.log(`Product already in db. Code: , ${product.code}`);
      }
    } catch (error) {
      console.log(error);
    }
    function validateFields(product) {
      if (
        product.title != "" &&
        product.description != "" &&
        product.price != 0 &&
        product.thumbnail != "" &&
        product.code != "" &&
        product.stock != 0
      ) {
        return true;
      } else {
        return false;
      }
    }
  };
  //Obtener los productos del archivo products.json.
  getProduct = async () => {
    try {
      if (fs.existsSync(this.path)) {
        //en caso de que exista voy a leer su contenido
        const data = await fs.promises.readFile(this.path, "utf-8");
        const products = JSON.parse(data);
        return products;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  };
  getProductById = async (id) => {
    const products = await this.getProduct();
    return products.find((e) => e.id === id) ?? [];
  }
  updateProduct = async (id, dataToUpdate) => {
    const products = await this.getProduct();
    const updatePrd = products.find((e) => e.id === id);
    const i = products.findIndex((e) => e.id === id);
    updatePrd.title = dataToUpdate.title;
    updatePrd.description = dataToUpdate.description;
    updatePrd.thumbnail = dataToUpdate.thumbnail;
    updatePrd.price = dataToUpdate.price;
    updatePrd.code = dataToUpdate.code;
    updatePrd.stock = dataToUpdate.stock;
    products.slice(id, 1, updatePrd);

    await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))

  }
  deleteProduct = async(id) => {
    const products = await this.getProduct();
    const i = products.findIndex((e) => e.id === id);
    products.splice(i, 1);
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))
  }
}

export default ProductManager;