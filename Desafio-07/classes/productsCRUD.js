const options = require("../options/mysql.config");
const faker = require("faker/locale/es_MX");
const knex = require("knex");
const database = knex(options);

module.exports = class Products {
  async readProducts() {
    let products = [];
    await database
      .from("products")
      .select("*")
      .then((res) => (products = JSON.parse(JSON.stringify(res))))
      .catch((err) => console.log(err));
    return products;
  }

  insertProduct(product) {
    if (product.name != "" && product.price != "" && product.url != "") {
      database("products")
        .insert(product)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  }

  async generateProduct() {
    const tittle = faker.commerce.product();
    const price = faker.commerce.price();
    const url = faker.internet.url();
    const photo = faker.image.business();

    const product = { tittle, price, url, photo };

    return product;
  }
};
