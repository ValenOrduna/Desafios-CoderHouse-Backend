const socket = io();
const input = document.getElementById("input-mensaje");
const boton = document.getElementById("boton-enviar");
const history = document.getElementById("history");
console.log("Hola");

let nombre = "";
let today = new Date();

Swal.fire({
  title: "Ingresa tu nombre",
  input: "text",
  inputAttributes: {
    autocapitalize: "off",
  },
  showCancelButton: true,
  confirmButtonText: "Ingresar",
  showLoaderOnConfirm: true,
}).then((resultado) => {
  nombre = resultado.value;
});

boton.addEventListener("click", () => {
  if (input.value) {
    const text = input.value;
    const hora = today.toLocaleString();
    const message = { hour: hora, name: nombre, message: text };
    socket.emit("message", message);
  }
});

socket.on("history", (data) => {
  let messages = "";
  data.forEach((message) => {
    messages += `<p>${message.hour} <span class="font-bold">${message.name}</span>: ${message.message} </p>`;
  });
  history.innerHTML = messages;
});
