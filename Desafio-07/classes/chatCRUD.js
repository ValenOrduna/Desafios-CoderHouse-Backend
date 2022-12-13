const options = require("../options/sqlite3.config.js");
const knex = require("knex");
const database = knex(options);

module.exports = class Chat {
  async readChat() {
    let chat = [];
    await database
      .from("chat")
      .select("*")
      .then((res) => (chat = JSON.parse(JSON.stringify(res))))
      .catch((err) => console.log(err));
    return chat;
  }
  insertMessage(message) {
    database("chat")
      .insert(message)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
};
