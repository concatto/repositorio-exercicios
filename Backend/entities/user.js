const db = require("../db");
const bcrypt = require("bcrypt");
const _ = require("lodash/core");

const saltRounds = 10;

module.exports = {
  authenticate: (params) => {
    const vals = _.pick(params, ["username", "password"]);
    const criteria = {username: vals.username};

    return db.first("id", "password").from("reap_user").where(criteria).then(row => {
      const hash = row ? row.password : "";
      
      return bcrypt.compare(vals.password, hash).then(equal => {
        if (equal) {
          return Promise.resolve(row.id);
        } else {
          return Promise.reject("Invalid credentials.");
        }
      });
    });
  },
  register: (params) => {
    const vals = _.pick(params, ["name", "username", "password", "email"]);

    return bcrypt.hash(vals.password, saltRounds).then(hash => {
      vals.password = hash;
      return db.insert(vals).into("reap_user").returning("id");
    });
  }
};
