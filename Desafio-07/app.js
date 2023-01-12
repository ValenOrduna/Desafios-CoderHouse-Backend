const _PORT = 8080;
const express = require("express");
const handlebars = require("express-handlebars");
const mainRoute = require("./routes/main.routes");
const { Server } = require("socket.io");
const chatCrud = require("./classes/chatCRUD.js");
const ClassChat = new chatCrud();
const app = express();

app.engine("handlebars", handlebars.engine());
app.set("views", "./views");
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", mainRoute);
app.use("/content", express.static("public"));

const server = app.listen(_PORT, () => console.log("Server Up"));

const io = new Server(server);

let chat = [];

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");
  const chatSelect = ClassChat.readChat();
  chatSelect.then((data) => {
    console.log(chat);
    chat = data;
  });
  socket.emit("history", chat);
  socket.on("message", (message) => {
    ClassChat.insertMessage(message);
    const chatSelect = ClassChat.readChat();
    chatSelect.then((data) => {
      chat = data;
      io.emit("history", chat);
    });
  });
});
