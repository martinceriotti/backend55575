const { ProductManager } = require("./managers/ProductManager.js");
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
const manager = new ProductManager("./files/products.json");

const env = async () => {
  const products = await manager.getProduct();
  console.log(products);

  await manager.addProduct(prenda1)
  await manager.addProduct(prenda2)
  const prod = await manager.getProductById(1)
  console.log(prod)
  await manager.deleteProduct(1)
  const prod2 = await manager.getProductById(2)
  console.log(prod2)
  await manager.updateProduct(2, prenda3)
  const prod3 = await manager.getProductById(2)
  console.log(prod3)
  await manager.deleteProduct(2)
  }


env();
