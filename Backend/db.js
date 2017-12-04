const humps = require("humps");

const knex = require("knex")({
  client: "postgres",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "123456",
    database: "reap"
  },
  postProcessResponse: result => {
    return humps.camelizeKeys(result);
  }
});

module.exports = knex;
