const express = require("express");
const products = require("./routes/products.js");

const app = express();
const server = app.listen(8080, () => console.log("SeverUp"));
app.use(express.json());
app.use(express.static("public"));
app.use("/api/productos", products);
