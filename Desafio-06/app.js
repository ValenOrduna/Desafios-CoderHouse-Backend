const _PORT = 8080;
const express = require("express");
const handlebars = require("express-handlebars");
const products = require("./routes/main.routes.js");
const { Server } = require("socket.io");
const app = express();
const server = app.listen(_PORT, () => console.log("Server Up"));

app.engine("handlebars", handlebars.engine());
app.set("views", "./views");
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));
app.use("/", products);
app.use(express.json());
app.use("/content", express.static("public"));
const io = new Server(server);

let messages = [];

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");
  socket.emit("history", messages);
  socket.on("message", (message) => {
    messages = [...messages, message];
    io.emit("history", messages);
  });
});
