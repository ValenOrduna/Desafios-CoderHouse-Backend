const options = {
  client: "sqlite3",
  connection: {
    filename: "./db/chat.sqlite",
  },
  useNullAsDefault: true,
};

module.exports = options;
