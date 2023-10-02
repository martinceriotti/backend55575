import express from "express";
import bodyParser from "body-parser";
import routerProducts from "./routes/products.router.js"
import routerCarts from "./routes/carts.router.js"

const app = express();

app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts)

app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.listen(8080, () => console.log("listening on port 8080"));