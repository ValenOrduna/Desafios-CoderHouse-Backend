export class User {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }
  getFullName() {
    return `${this.nombre} ${this.apellido}`;
  }
  addMastcota(mascota) {
    return (this.mascotas = [...this.mascotas, mascota]);
  }
  countMascotas() {
    return this.mascotas.length;
  }
  addBook(nombre, autor) {
    return (this.libros = [...this.libros, { nombre: nombre, autor: autor }]);
  }
  getBookNames() {
    let nombresLibros = [];
    this.libros.map((libro) => {
      nombresLibros = [...nombresLibros, libro.nombre];
    });
    return nombresLibros;
  }
}
