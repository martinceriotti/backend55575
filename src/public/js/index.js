const socket = io();
let product;
let products = [];
socket.on("messageProduct", (data) => {
  let newProducts = document.getElementById("newProducts");
  let productsToDisplay = "";
  data.forEach((e) => {
    productsToDisplay =
      productsToDisplay +
      `</br> Nuevo Producto:</br> Código: ${e._id} </br>
Title: ${e.title} </br>
descripcion: ${e.descripcion} </br>`;
  });
  newProducts.innerHTML = productsToDisplay;
});
