class ProductManager {
  constructor() {
    this.products = [];
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
    if (this.products.some((e) => e.code === product.code) === false)  
      { if (validateFields(product) )
          {  
            product.id = this.products.length + 1;
            this.products.push(product);
          } else {console.log(`Some fields are incompleted`)}
    }
    else {console.log(`Product already in db. Code: , ${product.code}`)}; 
    
  }
  getProduct() {
    return this.products
  }
  getProductById(id) {
    return this.products.find((e)=> (e.id === id)) ?? []
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

let managerRopa = new ProductManager();

console.log(managerRopa.getProduct());
managerRopa.addProduct(prendaPrueba);
console.log(managerRopa.getProduct());
managerRopa.addProduct(prendaPrueba)
managerRopa.addProduct(prendaX)


// managerRopa.addProduct(prenda1);
// managerRopa.addProduct(prenda3);
// managerRopa.addProduct(prenda2);
// managerRopa.addProduct(prendaX);
 
// console.log(managerRopa.getProductById(1).length === 0 ? 'Not found' : 'Found')
// console.log(managerRopa.getProductById(999).length === 0 ? 'Not found' : 'Found')



