const express = require("express");
const router = express.Router();

let products = [];

router.get("/", (req, res) => {
  res.send(products);
});

router.get("/:id", (req, res) => {
  const idProducto = req.params.id;
  if (products[idProducto - 1]) {
    res.send(products[idProducto - 1]);
  } else {
    res.send({ error: "Producto no encontrado" });
  }
});

router.post("/", (req, res) => {
  let product = req.body;
  product = { ...product, id: products.length + 1 };
  products = [...products, product];
  res.send({ message: "Producto Creado!", product, products });
});

router.delete("/:id", (req, res) => {
  const idProducto = req.params.id;
  if (products[idProducto - 1]) {
    const newProducts = products.filter((product) => product.id != idProducto);
    products = newProducts;
    res.send({ message: "Producto Eliminado" });
  } else {
    res.send({ error: "Producto no encontrado" });
  }
});

router.put("/:id", (req, res) => {
  const idProducto = req.params.id;
  const loadProduct = req.body;
  if (products[idProducto - 1]) {
    products[idProducto - 1] = loadProduct;
    res.send({ message: "Producto Actualizado", products });
  } else {
    res.send({ error: "Producto no encontrado" });
  }
});

module.exports = router;
