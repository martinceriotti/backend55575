import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";
import { check, validationResult } from "express-validator";
import bodyParser from "body-parser";

const routerProducts = Router();
const manager = new ProductManager("../src/files/products.json");

routerProducts.use(bodyParser.json());
routerProducts.use(bodyParser.urlencoded({ extended: true }));
routerProducts.use(function (err, req, res, callback) {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    res.status(403).send({
      error: false,
      message: "Wrong Body of json",
      response: null,
    });
    res.end();
  }
});

routerProducts.get("/", async (req, res) => {
  const productos = await manager.getProduct();
  res.send(productos);
});

routerProducts.get("/querys", async (req, res) => {
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

routerProducts.get("/:id", async (req, res) => {
  const productos = await manager.getProduct();
  let id = req.params.id;
  let filtrado = productos.find((p) => p.id == id);
  if (filtrado) {
    res.send(filtrado);
  } else {
    res.send({ error: "error" });
  }
});

routerProducts.post(
  "/",
  [
    check("price").isDecimal(),
    check("title").notEmpty(),
    check("descripcion").notEmpty(),
    check("code").notEmpty(),
    check("stock").isDecimal(),
    check("category").notEmpty(),
  ],
  async (req, res) => {
    let product = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    if (
      !product.title ||
      !product.descripcion ||
      !product.code ||
      !product.price ||
      !product.stock ||
      !product.category
    ) {
      return res
        .status(400)
        .send({ status: "error", error: "incomplete values" });
    }
    await manager.addProduct(product).then((e) => {
      if (!e.status) {
        res.send({ status: "sucess", message: "Product Created." });
      } else {
        res.send({ status: `${e.status}`, message: `${e.error}` });
      }
    });
  }
);

routerProducts.put(
  "/:id",
  [
    check("price").isDecimal(),
    check("title").notEmpty(),
    check("descripcion").notEmpty(),
    check("code").notEmpty(),
    check("stock").isDecimal(),
    check("category").notEmpty(),
  ],
  async (req, res) => {
    let product = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    if (
      !product.title ||
      !product.descripcion ||
      !product.code ||
      !product.price ||
      !product.stock ||
      !product.category
    ) {
      return res
        .status(400)
        .send({ status: "error", error: "incomplete values" });
    }

    await manager.updateProduct(product.id, product).then((e) => {
      res.send({ status: "sucess", message: "Product Updated ." });
    });
  }
);

routerProducts.delete("/:id", async (req, res) => {
  let id = Number.parseInt(req.params.id);

  await manager.deleteProduct(id).then((e) => {
    res.send({ status: "sucess", message: "Product Deleted ." });
  });
});

export default routerProducts;
