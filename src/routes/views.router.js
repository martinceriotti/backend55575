import { Router } from "express";
const router = Router();

const publicAccess = (req, res, next) => {
  
  if (req.session?.user) return res.redirect("/api/views/profile");
  next();
};
const privateAccess = (req, res, next) => {
  if (!req.session?.user) return res.redirect("/api/views/login");
  next();
};

router.get("/register", publicAccess, (req, res) => {
  res.render("register");
});

router.get("/login", publicAccess, (req, res) => {
  res.render("login");
});

router.get("/profile", privateAccess, (req, res) => {
  
  res.render("profile", {
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

router.get("/", async (req, res) => {
  let prods = [];

  async function fetchProductsJSON() {
    let method = req.method;
    let hostname = req.hostname;
    let protocol = req.protocol;

    const response = await fetch(
      `${protocol}://${hostname}:8080/api/products/`
    );
    const prods = await response.json();
    console.log(typeof(prods));
    return prods;
  }
  fetchProductsJSON().then((productos) => {
    const prods =  productos.result;
    console.log(prods);
    const user = req.session.user
    res.render("home", {prods, user});
  });
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

function auth(req, res, next) {
  if(req.session?.user.email === 'adminCoder@coder.com' && req.session?.user.role === 'admin') {
      return next();
  }
//adminCod3r123
  return res.status(401).send('Error de validación de permisos');
}

export default router;

