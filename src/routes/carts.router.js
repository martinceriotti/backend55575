import { Router } from "express";
import CartManager from "../managers/CartManager.js";
import { check, validationResult } from "express-validator";
import bodyParser from "body-parser";

const routerCarts = Router();
const cart = new CartManager("../src/files/carts.json");

routerCarts.use(bodyParser.json());
routerCarts.use(bodyParser.urlencoded({ extended: true }));
routerCarts.use(function (err, req, res, callback) {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    res.status(403).send({
      error: false,
      message: "Wrong Body of json",
      response: null,
    });
    res.end();
  }
});

routerCarts.get("/", async (req, res) => {
  let cartx = await cart.getCarts();
  if (cartx) {
    res.send(cartx);
  }
});

routerCarts.get("/:cid", async (req, res) => {
  let cartfound = await cart.getCartById(req.params.cid);
  res.send(cartfound);
});

routerCarts.post("/", async (req, res) => {
  let carti = await cart.addCart().then((e) => {
    res.send({ status: "sucess", message: "Cart Created ." });
  });;
  res.send(carti);
});

routerCarts.post("/:cid/product/:pid", async (req, res) => {
  let cid = req.params.cid
  let pid = req.params.pid
  let qt = 1

  await cart.updateCartProducts(cid, pid, qt).then((e) => {
    res.send({ status: "sucess", message: "Cart Updated ." });
  }).catch((e) => {
    res.send({ status: "error", message: "Update Cancelled ." });
  });
     
});

export default routerCarts;
