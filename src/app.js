import express from "express";
import bodyParser from "body-parser";
import cors from 'cors'
import routerProducts from "./routes/products.router.js";
import routerCarts from "./routes/carts.router.js";
import routerMessages from "./routes/messages.router.js";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import routerViews from "./routes/views.router.js";
import routerSessions from "./routes/sessions.router.js";
import { Server } from "socket.io";
import "./dao/dbConfig.js";
import passport from 'passport';
import initializePassport from './config/passport.js'; 
import session from 'express-session'
import MongoStore from 'connect-mongo';
import config from './config/config.js';
import errorHandler from './middlewares/errors/index.js';

const app = express();
initializePassport();

app.use(cors());
app.use(passport.initialize());
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}\\views`);
app.set("view engine", "handlebars");

app.use(bodyParser.json());
app.use(express.static(`${__dirname}\\public`));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  store: MongoStore.create({
      mongoUrl : config.mongoUrl,
      ttl: 3600
  }),
  secret: 'numark123A',
  resave: true, 
  saveUninitialized: true,
}));

app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);
app.use("/api/messages", routerMessages);
app.use("/api/views", routerViews);
app.use('/api/sessions', routerSessions);
app.use(errorHandler);



const httpServer = app.listen(8080, () =>
  console.log("listening on port 8080")
);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("nuevo cliente conectado");
  socket.on("messageProduct", (data) => {
    io.emit("messageProduct", data);
  });
});

app.set("socketio", io);
