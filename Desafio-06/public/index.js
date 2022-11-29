const socket = io();
const input = document.getElementById("input-mensaje");
const boton = document.getElementById("boton-enviar");
const history = document.getElementById("history");

let nombre = "";
let hoy = new Date();
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
    const texto = input.value;
    const hora = hoy.toLocaleString();
    const message = { hora: hora, nombre: nombre, mensaje: texto };
    socket.emit("message", message);
  }
});

socket.on("history", (data) => {
  let messages = "";
  data.forEach((message) => {
    messages += `<p>${message.hora} <span class="font-bold">${message.nombre}</span>: ${message.mensaje} </p>`;
  });
  history.innerHTML = messages;
});
