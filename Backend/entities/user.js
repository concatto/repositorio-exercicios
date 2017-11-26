const db = require("../db");
const bcrypt = require("bcrypt");
const _ = require("lodash/core");

const saltRounds = 10;
const table = "reap_user";

module.exports = {
  authenticate(params) {
    const vals = _.pick(params, "username", "password");
    const criteria = {username: vals.username};

    return db.first("id", "password").from(table).where(criteria).then(row => {
      const hash = row ? row.password : "";

      return bcrypt.compare(vals.password, hash).then(equal => {
        return equal === true ? row.id : false;
      });
    });
  },

  register(params) {
    const vals = _.pick(params, "name", "username", "password", "email");

    return bcrypt.hash(vals.password, saltRounds).then(hash => {
      vals.password = hash;
      return db.insert(vals).into(table).returning("id");
    });
  },

  retrieve(params) {
    const criteria = _.pick(params, "id");
    return db.first("*").from(table).where(criteria);
  },

  exists(params) {
    return this.retrieve(params).pluck("id").then(result => result !== undefined);
  },
};
