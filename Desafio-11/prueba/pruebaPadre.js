import { fork } from "child_process";
import path from "path";
console.log("Desde Prueba Padre");

const forked = fork("./pruebaHijo.js");
forked.send("prueba");
forked.on("message", (data) => {
  console.log(data);
});
