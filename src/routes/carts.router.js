import { Router } from "express";
import toAsyncRouter from 'async-express-decorator';
import {getCarts, getCartById, createCart, updateCart, deleteCartProduct, deleteCartProductsArray} from '../controllers/carts.controller.js'
import bodyParser from "body-parser";


const router =  toAsyncRouter(Router());

// const cart = new CartManager("../src/files/carts.json");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use(function (err, req, res, callback) {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    res.status(403).send({
      error: false,
      message: "Wrong Body of json",
      response: null,
    });
    res.end();
  }
});

router.get('/', getCarts);
router.delete('/:cid/products/:pid', deleteCartProduct); //elimina del carrito el producto
router.delete('/:cid', deleteCartProductsArray); //elimina todos los productos del carrito
router.post('/', createCart);
router.put('/:cid', updateCart); //actualiza el arreglo completo de productos
router.put('/:cid/products/:pid', updateCart); //solo cant del producto seleccionado
router.get('/:cid', getCartById);
 
export default router;
