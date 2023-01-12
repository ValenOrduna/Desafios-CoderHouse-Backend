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

router.get("/productos-test", async (req, res) => {
  let products = [];
  try {
    for (let i = 1; i <= 5; i++) {
      let product = await ProductClass.generateProduct();
      product = { id: i, ...product };
      products = [...products, product];
    }
    res.json(products);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
