const _PORT = 8080;
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
const products = require("./routes/products.routes.js");

const server = app.listen(_PORT, () => console.log("Server Up"));

app.set("views", "./views");
app.set("view engine", "ejs");
app.use("/api/productos", products);
