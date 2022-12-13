const express = require("express");
const router = express.Router();
const productsCrud = require("../classes/productsCRUD.js");
const ProductClass = new productsCrud();

let products = [];

router.get("/", (req, res) => {
  const productsSelect = ProductClass.readProducts();
  productsSelect.then((data) => {
    products = data;
    return res.render("form", { products: products });
  });
});

router.post("/", (req, res) => {
  let product = req.body;
  ProductClass.insertProduct(product);
  const productsSelect = ProductClass.readProducts();
  productsSelect.then((data) => {
    products = data;
    return res.render("form", { products: products });
  });
});

module.exports = router;
