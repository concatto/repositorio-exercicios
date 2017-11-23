const db = require("../db");
const _ = require("lodash/core");

const table = "exercise";

module.exports = {
  retrieveFrom(params) {
    const { room_id } = params;
    return db.select("*").from(table).where({room_id});
  },
};
