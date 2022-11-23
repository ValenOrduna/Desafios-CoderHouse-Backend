const _PORT = 8080;
const express = require("express");
const handlebars = require("express-handlebars");
const products = require("./routes/products.routes.js");

const app = express();
app.use(express.urlencoded({ extended: true }));
const server = app.listen(_PORT, () => console.log("Server Up"));

app.engine("handlebars", handlebars.engine());
app.set("views", "./views");
app.set("view engine", "handlebars");
app.use("/api/productos", products);
