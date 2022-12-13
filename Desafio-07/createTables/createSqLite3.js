const options = require("../options/sqlite3.config");
const knex = require("knex");

const database = knex(options);

database.schema
  .createTable("chat", (table) => {
    table.string("hour");
    table.string("name");
    table.string("message");
  })
  .then(() => console.log("Table Created!"))
  .catch((err) => console.log(err))
  .finally(() => database.destroy());
