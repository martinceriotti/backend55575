class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }
  addProduct(product) {
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
    if (this.products.some((e) => e.code === product.code) === false) {
      if (validateFields(product)) {
        product.id = this.products.length + 1;
        this.products.push(product);
      } else {
        console.log(`Some fields are incompleted`);
      }
    } else {
      console.log(`Product already in db. Code: , ${product.code}`);
    }
  }
  getProduct() {
    return this.products;
  }
  getProductById(id) {
    return this.products.find((e) => e.id === id) ?? [];
  }
  updateProduct(id, dataToUpdate) {
    const updatePrd = this.products.find((e) => e.id === id);
    const i = this.products.findIndex((e) => e.id === id);
    updatePrd.title = dataToUpdate.title;
    updatePrd.description = dataToUpdate.description;
    updatePrd.thumbnail = dataToUpdate.thumbnail;
    updatePrd.price = dataToUpdate.price;
    updatePrd.code = dataToUpdate.code;
    updatePrd.stock = dataToUpdate.stock;
    this.products.slice(id, 1, updatePrd);
  }
  deleteProduct(id) {
    const i = this.products.findIndex((e) => e.id === id);
    this.products.splice(i, 1);
  }
}
const prendaPrueba = {
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25,
};

const prenda1 = {
  title: "Remera",
  description: "Remera Caballero",
  price: 110,
  thumbnail: "http://urlropa1.jpg",
  code: "AA001",
  stock: 12,
};
const prenda3 = {
  title: "Remera Small",
  description: "Remera Niño",
  price: 50,
  thumbnail: "http://urlropa2.jpg",
  code: "AA001",
  stock: 10,
};
const prenda2 = {
  title: "Pantalon",
  description: "Pantalo Caballero",
  price: 500,
  thumbnail: "http://urlropa3.jpg",
  code: "BB001",
  stock: 5,
};
const prendaX = {
  title: "",
  description: "Pantalo Caballero",
  price: 500,
  thumbnail: "http://urlropa3.jpg",
  code: "BB001",
  stock: 5,
};

let managerRopa = new ProductManager('./');

managerRopa.addProduct(prenda1);
managerRopa.addProduct(prendaPrueba);
managerRopa.addProduct(prenda3);
managerRopa.addProduct(prendaX);

console.log(managerRopa);

//Actualiza los datos del producto id = 1 con los datos de prenda2, dejando el id intacto.
managerRopa.updateProduct(1, prenda2);
console.log(managerRopa);
managerRopa.deleteProduct(2);
console.log(managerRopa);