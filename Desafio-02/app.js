const ClassProduct = require("./Class/products.js");
const Container = require("./Class/container.js");
const product1 = new ClassProduct("Microfono", 25000, "microfono.com");
const product2 = new ClassProduct("Monitor", 40000, "monitor.com");
const product3 = new ClassProduct("Placa de Audio", 15000, "placaaudio.com");

const container = new Container();

const ejecutarMetodos = () => {
  container.save([product1, product2, product3]);
  container.getById(3);
  container.getAll();
  // ELIMINA UN ARCHIVO ESPECIFICO CON ESTE METODO (container.deleteById(3))
  // ELIMINA TODOS LOS ARCHIVOS CON ESTE METODO (container.deleteAll())
};

ejecutarMetodos();
