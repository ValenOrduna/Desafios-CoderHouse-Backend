const express = require("express");
const router = express.Router();

let products = [];

router.get("/", (req, res) => {
  return res.render("form", { products: products });
});

router.post("/", (req, res) => {
  console.log("Se ingreso producto");
  let product = req.body;
  if (product.nombre != "" && product.precio != "" && product.url != "") {
    product = { ...product, id: products.length + 1 };
    products = [...products, product];
    res.render("form", { products: products });
  } else {
    res.render("form", { products: products });
  }
});

module.exports = router;
