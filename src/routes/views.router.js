import { Router } from "express";
const routerViews = Router();

routerViews.get("/", async (req, res) => {
   let prods = []
  
   async function fetchProductsJSON() {
	let method = req.method
	let hostname = req.hostname
	let protocol = req.protocol
	console.log()
	const response = await fetch(`${protocol}://${hostname}:8080/api/products/`);
	const prods = await response.json();
		return prods;
  }
    fetchProductsJSON().then(prods => {
	res.render("home", {prods} );
  });

  
});

routerViews.get('/realtimeproducts', (req, res) => {
	//no entendi el ejemplo
})
export default routerViews;
