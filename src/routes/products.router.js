import { Router } from "express";
import toAsyncRouter from 'async-express-decorator';
import {getProducts, getProductById, createProduct, updateProduct, mockingProducts} from '../controllers/products.controller.js'
import { check, validationResult } from "express-validator";
import bodyParser from "body-parser";
import { io } from "socket.io-client";
const router =  toAsyncRouter(Router());

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

router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.post('/', createProduct);
router.get('/test/mockingProducts', mockingProducts);

export default router;
