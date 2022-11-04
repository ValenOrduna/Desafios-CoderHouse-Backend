const insertarProductos = require("./FuncionInsertar/insertarProductos.js");
const Container = require("./Class/container.js");
const container = new Container();
const express = require("express");
const app = express();

insertarProductos();

const server = app.listen(8080, () => console.log("Server Up"));

app.get("/", (request, response) => {
  response.send("Bienvenido al Desafio 03 Backend de CoderHouse");
});
app.get("/productos", (request, response) => {
  response.send(container.getAll());
});

app.get("/productoRandom", (request, response) => {
  const numRandom = Math.ceil(Math.random() * container.getAll().length);
  const productoRandom = container.getById(numRandom);
  response.send(productoRandom);
});
