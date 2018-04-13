const db = require("../db");
const bcrypt = require("bcrypt");
const keyring = require("../keyring");
const _ = require("lodash/core");
const mailer = require("../mailer");

const saltRounds = 10;
const table = "reap_user";

module.exports = {
  authenticate(params) {
    const vals = _.pick(params, "username", "password");
    const criteria = {username: vals.username};

    return db.first("*").from(table).where(criteria).then(row => {
      if (row === undefined) return false;

      return bcrypt.compare(vals.password, row.password).then(equal => {
        return equal === true ? row : false;
      });
    });
  },

  register(params) {
    const vals = _.pick(params, "name", "username", "password", "email");
    const { username, email } = vals;

    return bcrypt.hash(vals.password, saltRounds).then(hash => {
      vals.password = hash;
        
      console.log(hash);

      return db.select("*").from(table).where({username}).orWhere({email});
    }).then(rows => {
      if (rows.length > 0) {
        rows.forEach(console.log);
        // TODO remove if the users are not verified and were created more than a day ago
        return false;
      }

      return db.insert(vals).into(table).returning("id");
    }).then(id => {
      console.log("Before creating token:", id);
      // This token must be presented to verify the user's account. Don't lose it
      const tokenData = {id: id[0], name: vals.name, username: vals.username};
      const token = keyring.createToken(tokenData, {expiresIn: "1d"});
      const destinationUrl = `${params.destinationUrl}?${params.tokenKey}=${token}`;

      return mailer.sendRegistrationConfirmation(destinationUrl, params.email);

      console.log("Should be in an email, please save somewhere:", token);
      return true;
    }).catch(console.log);
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
