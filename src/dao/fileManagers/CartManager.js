import fs from "fs";

class CartManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }

  addCart = async () => {
    this.id = Date.now();
    this.products = [];
    let cart = { id: this.id, products: this.products };

    try {
      let carts = await this.getCarts();

      if (carts) {
        console.log(carts);
        carts.push(cart);
        console.log(carts);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(carts, null, "\t")
        );
      } else {
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(cart, null, "\t")
        );
      }

      return cart;
    } catch (error) {
      console.log(error);
      return { status: "error", error: "Cant write file." };
    }
  };
  //Obtener los productos del archivo products.json.
  getCarts = async () => {
    try {
      if (fs.existsSync(this.path)) {
        //en caso de que exista voy a leer su contenido
        const data = await fs.promises.readFile(this.path, "utf-8");
        const carts = JSON.parse(data);
        return carts;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  };
  getCartById = async (idx) => {
    let id = Number(idx);
    const carts = await this.getCarts();
    console.log(carts);
    return carts.find((e) => e.id === id) ?? [];
  };

  updateCartProducts = async (cid, pid, qt) => {
    try {
      let allcarts = await this.getCarts();
      let cidz = allcarts.findIndex((e) => e.id === Number(cid));

      if (allcarts[cidz].products.find((x) => x.id == Number(pid))) {
        //el producto ya existe
        let id = allcarts[cidz].products.findIndex((x) => x.id == Number(pid));
        allcarts[cidz].products[id].qt = Number(allcarts[cidz].products[id].qt) + 1;
      } else {
        //no existe el producto
        //validar el producto
        console.log("oks");
        let product = { id: `${Number(pid)}`, qt: `${Number(qt)}` };
        allcarts[cidz].products.push(product);
      }
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(allcarts, null, "\t")
      );
    } catch (error) {
      console.log(error);
    }
  };
}

export default CartManager;
