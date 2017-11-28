const db = require("../db");
const bcrypt = require("bcrypt");
const keyring = require("../keyring");
const _ = require("lodash/core");

const saltRounds = 10;
const table = "reap_user";

module.exports = {
  authenticate(params) {
    const vals = _.pick(params, "username", "password");
    const criteria = {username: vals.username};

    return db.first("id", "password", "verified").from(table).where(criteria).then(row => {
      if (row === undefined) return false;

      return bcrypt.compare(vals.password, row.password).then(equal => {
        return equal === true ? _.pick(row, "id", "verified") : false;
      });
    });
  },

  register(params) {
    const vals = _.pick(params, "name", "username", "password", "email");

    return bcrypt.hash(vals.password, saltRounds).then(hash => {
      vals.password = hash;

      return db.first("id").from(table).where({username: vals.username});
    }).then(id => {
      if (id !== undefined) return false;

      return db.insert(vals).into(table).returning("id");
    }).then(id => {
      // This token must be presented to verify the user's count. Don't lose it
      const tokenData = {id: id[0], name: vals.name, username: vals.username};
      const token = keyring.createToken(tokenData);

      console.log("Should be in an email, please save somewhere:", token);
      return true;
    });
  },

  verify(params) {
    const { token } = params;

    return keyring.verifyToken(token).then(data => {
      // Ok, the user presented a valid token.
      const { id } = data;

      console.log(data);
      return db(table).update({verified: true}).where({id}).returning("id");
    });
  },

  retrieve(params, cols = "*") {
    const criteria = _.pick(params, "id");
    return db.first(cols).from(table).where(criteria);
  },

  exists(params) {
    return this.retrieve(params).pluck("id").then(result => result !== undefined);
  },
};
