import { Router } from "express";
const router = Router();
const publicAccess = (req, res, next) => {
  if (req.session?.user) return res.redirect("/");
  next();
};
const privateAccess = (req, res, next) => {
  if (!req.session?.user) return res.redirect("/login");
  next();
};

router.get("/register", publicAccess, (req, res) => {
  res.render("register");
});

router.get("/login", publicAccess, (req, res) => {
  res.render("login");
});

router.get("/", privateAccess, (req, res) => {
  res.render("profile", {
    user: req.session.user,
  });
});

router.get("/", async (req, res) => {
  let prods = [];

  async function fetchProductsJSON() {
    let method = req.method;
    let hostname = req.hostname;
    let protocol = req.protocol;
    console.log();
    const response = await fetch(
      `${protocol}://${hostname}:8080/api/products/`
    );
    const prods = await response.json();
    return prods;
  }
  fetchProductsJSON().then((prods) => {
    res.render("home", { prods });
  });
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});
export default router;
