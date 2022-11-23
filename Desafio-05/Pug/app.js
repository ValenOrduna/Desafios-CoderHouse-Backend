const _PORT = 8080;
const express = require("express");
const products = require("./routes/products.routes.js");
const app = express();
app.use(express.urlencoded({ extended: true }));

const server = app.listen(_PORT, () => console.log("Server Up"));

app.use("/api/productos", products);
app.set("views", "./views");
app.set("view engine", "pug");
