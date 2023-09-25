import express from "express";
import ProductManager from "./managers/ProductManager.js";

const app = express();

const manager = new ProductManager("./src/files/products.json");

app.get("/products", async (req, res) => {
  const productos = await manager.getProduct();
  res.send(productos);
});

app.get("/products/querys", async (req, res) => {
  const productos = await manager.getProduct();
  let limite = req.query.limite;
  console.log(limite);
  if (limite) {
    const productosLimitados = productos.slice(0, limite);
    res.send(productosLimitados);
  } else {
    res.send(productos);
  }
});

app.get("/products/:id", async (req, res) => {
  const productos = await manager.getProduct();
  let id = req.params.id;
  let filtrado = productos.find((p) => p.id == id);
  res.send(filtrado);
});

app.listen(8080, () => console.log("listening on port 8080"));
