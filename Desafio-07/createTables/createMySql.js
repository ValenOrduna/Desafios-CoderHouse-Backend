const options = require("../options/mysql.config");
const knex = require("knex");

const database = knex(options);

database.schema
  .createTable("products", (table) => {
    table.increments("id");
    table.string("name", 20);
    table.integer("price");
    table.string("url");
  })
  .then(() => console.log("Table Created!"))
  .catch((err) => console.log(err))
  .finally(() => database.destroy());
