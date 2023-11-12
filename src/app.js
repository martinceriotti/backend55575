import express from "express";
import bodyParser from "body-parser";
import routerProducts from "./routes/products.router.js"
import routerCarts from "./routes/carts.router.js"
import handlebars from 'express-handlebars'
import __dirname  from "./utils.js";
import routerViews from "./routes/views.router.js";
import { Server } from "socket.io";
import mongoose from "mongoose";

const app = express();

app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);
app.use('/api/views', routerViews);

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}\\views`);
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({extended:true}));

const httpServer = app.listen(8080, () => console.log("listening on port 8080"));
const io = new Server(httpServer);

io.on('connection', socket =>{
    console.log('nuevo cliente conectado');
    socket.on('messageProduct', data => {
        io.emit("messageProduct", data );
    })
})

app.set('socketio', io);

try {
    const stringConn = 'mongodb+srv://mceriotti:numark123@sandbox.vbfffqu.mongodb.net/ecommerce?retryWrites=true&w=majority'
    await mongoose.connect(stringConn)
    console.log("DB Connected")
} catch (error) {
    console.log(error.message)
}

