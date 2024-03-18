import express from "express";
import bodyParser from "body-parser";
import cors from 'cors'
import routerProducts from "./routes/products.router.js";
import routerCarts from "./routes/carts.router.js";
import routerMessages from "./routes/messages.router.js";
import routerUsers from "./routes/users.router.js"
import handlebars from "express-handlebars";
import {__dirname, __mainDirname} from "./utils.js";
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
import { addLogger } from "./middlewares/logger.js";
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

const app = express();
initializePassport();

const swaggerOptions = {
  definition: {
      openapi: '3.0.1',
      info: {
          title: 'Ecommerce APP Documentation. By Martin Ceriotti.',
          description: 'API about an ecommerce app. You will love it!'
      }
  },
  apis: [`${__mainDirname}/docs/**/*.yaml`] 
}
console.log(`${__mainDirname}/docs/**/*.yaml`)
const specs = swaggerJsdoc(swaggerOptions);

app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
app.use(cors());
app.engine("handlebars", handlebars.engine());
app.set("views", `${__mainDirname}\\views`);
app.set("view engine", "handlebars");
app.use(bodyParser.json());
app.use(express.static(`${__dirname}\\public`));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  store: MongoStore.create({
      mongoUrl : config.mongoUrl,
      ttl: 3600
  }),
  secret: config.lakey,
  resave: true, 
  saveUninitialized: true,
}));
app.use(addLogger);
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);
app.use("/api/messages", routerMessages);
app.use("/api/views", routerViews);
app.use("/api/users", routerUsers);
app.use('/api/sessions', routerSessions);
app.use(errorHandler);
app.use(passport.initialize());

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
console.log(__mainDirname)
console.log(__dirname)