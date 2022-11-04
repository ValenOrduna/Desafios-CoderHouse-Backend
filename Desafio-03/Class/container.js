const fs = require("fs");
module.exports = class Container {
  _UBICATION = "./Archive/productos.txt";
  _ID_PRODUCTS = 0;

  idGenerator(productos) {
    let arrayProducts = [];
    productos.map((producto) => {
      this._ID_PRODUCTS += 1;
      const product = { ...producto, id: this._ID_PRODUCTS };
      arrayProducts = [...arrayProducts, product];
    });
    return arrayProducts;
  }

  async save(productos) {
    const products = this.idGenerator(productos);
    try {
      await fs.promises.appendFile(this._UBICATION, JSON.stringify(products));
      console.log("---------- Productos Añadidos Exitosamente ----------");
    } catch (error) {
      console.log(error);
    }
  }

  getById(id) {
    try {
      const registros = this.getAll();
      const registro = registros.find((registro) => registro.id === id);
      if (!registro) {
        console.log("No se encontro un producto con el ID proporcionado");
      } else {
        return registro;
      }
    } catch (error) {
      console.log(error);
    }
  }

  getAll() {
    try {
      const archivo = JSON.parse(fs.readFileSync(this._UBICATION, "utf-8"));
      return archivo;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      const registros = JSON.parse(fs.readFileSync(this._UBICATION, "utf-8"));
      const registrosNuevo = registros.filter((registro) => registro.id != id);
      await fs.promises.writeFile(
        this._UBICATION,
        JSON.stringify(registrosNuevo)
      );
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this._UBICATION, "");
    } catch (error) {
      console.log(error);
    }
  }
};
