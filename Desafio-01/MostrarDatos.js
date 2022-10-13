import { User } from "./Class/ClassUser.js";
import { datos } from "./Data/Datos.js";

const MostrarDatos = () => {
  const { nombre, apellido, libros, mascotas } = datos;
  const setUser = new User(nombre, apellido, libros, mascotas);
  setUser.addMastcota("Maiden");
  setUser.addBook("Encuentros El Lado B Del Amor", "Gabriel Rolon");
  const user = {
    nombreCompleto: setUser.getFullName(),
    cantidadDeMascotas: setUser.countMascotas(),
    nombreDeLibros: setUser.getBookNames(),
  };
  console.log(user);
};

MostrarDatos();
