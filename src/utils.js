import { fileURLToPath } from "url";
import { dirname } from "path";
import { fakerES as faker } from "@faker-js/faker";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const generateProducts = () => {
  let qtProducts = 100;
  let products = [];
  for (let i = 0; i < qtProducts; i++) {
    let prod = {
      title: faker.commerce.product(),
      descripcion: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      thumbnail: "",
      code: faker.commerce.isbn(10),
      stock: faker.commerce.price({ min: 100, max: 200, dec: 0 }),
    };
    console.log(prod);
    products.push(prod);
  }

  return products;
};
export default __dirname;
