import {getCartById} from '../controllers/carts.controller.js'
import { Router } from "express";
import toAsyncRouter from 'async-express-decorator';

const router =  toAsyncRouter(Router());

const publicAccess = (req, res, next) => {
  if (req.session?.user) return res.redirect("/api/views/profile");
  next();
};
const privateAccess = (req, res, next) => {
  if (!req.session?.user  ) return res.redirect("/api/views/login");
  next();
};
const adminAccess = (req, res, next) => {
  console.log(req.session?.user.role) 
  if (req.session?.user.role != 'ADMIN') return res.redirect("/api/views/login");
  next();
};

router.get("/register", publicAccess, (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/profile", privateAccess, (req, res) => {
  res.render("profile", {
    user: req.session.user,
  });
});

router.get("/delete", adminAccess, (req, res) => {
  res.render("delete", {
    user: req.session.user,
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error)
      return res.status(500).send({ status: "error", message: error.message });
    res.redirect("/api/views/login");
  });
});

router.get("/testview", (req, res) => {
  console.log(req.session?.user.role);
  res.render("testview")
})
router.get("/carts/:cid", getCartById  => {
  fetch(getCartById).then(function(response) {
    return response.text();
  }).then(function(text) {
    console.log(text.substring(0, 30));
  });
}) 
router.get("/products", async (req, res) => {
  let query = req.query
  query.page = !query.page ? 1 : query.page ;
  let uri = "http://localhost:8080/api/products/?page=" + query.page;
  let productos = await fetch(uri, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
  }).then((result) => result.json());

  let prods = productos.result.payload;
  let hasPrevPage = productos.result.hasPrevPage;
  let hasNextPage = productos.result.hasNextPage;
  let nextPage = productos.result.nextPage;
  let prevPage = productos.result.prevPage;
  let totalPages = productos.result.totalPages;
  let totalDocs = productos.result.totalDocs;
  let user = req.session.user;
  console.log(uri);
  console.log(nextPage);
  res.render("home", {
    prods,
    user,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
    totalPages,
    totalDocs,
  });
});

 

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

function auth(req, res, next) {
  if (
    req.session?.user.email === "adminCoder@coder.com" &&
    req.session?.user.role === "admin"
  ) {
    return next();
  }
  //adminCod3r123
  return res.status(401).send("Error de validación de permisos");
}

export default router;
