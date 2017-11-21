const knex = require("knex")({
  client: "postgres",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "123456",
    database: "reap"
  }
});

module.exports = knex;