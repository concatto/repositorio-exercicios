const db = require("../db");
const _ = require("lodash/core");
const keyring = require("../keyring");
const User = require("./user");
const mailer = require("../mailer");
const Constants = require("../constants");
const table = "user_room";

module.exports = {
  isMorePrivilegedThan(value, room_id, user_id) {
    return this.retrieveUser(room_id, user_id, "privilege").then(row => {
      return Promise.resolve(row !== undefined && row.privilege < value);
    });
  },

  retrieveRoomsFor(params) {
    const { id: user_id } = params;

    return db.select("*").from(table).where({user_id})
      .innerJoin("room", {"room.id": `${table}.room_id`})
      .innerJoin("room_stats", {"room_stats.room_id": `${table}.room_id`});
  },

  retrieveUser(room_id, user_id, cols) {
    return this.retrieveUsers({room_id}, cols).where({user_id}).first();
  },

  retrieveUsers(params, cols) {
    const { room_id } = params;
    cols = cols || ["id", "name", "experience", "privilege", "joined_at"];

    return db.select(cols).from(table).where({room_id})
      .innerJoin("reap_user", {"id": "user_id"});
  },

  join(params) {
    const vals = _.pick(params, "room_id", "privilege");

    // TODO check if the user already belongs to the room.
    return db.insert({user_id: params.id, ...vals}).into(table);
  },
    
  inviteAll(params){
      const vals = _.pick(params, "room_id", "id", "invitations");
      
      const inviteVals = vals.invitations.map(function(value, index, arr) {
          arr[index].email = db.select("email").from("reap_user").where({"username": value.username})
      });

      return inviteVals.forEach(function(value) {
          const result = {
              room_id: vals.room_id,
              id: vals.id,
              email: value.email,
              privilege: value.privilege,
              destinationUrl: params.destinationUrl,
              tokenKey: params.tokenKey
          }
          invite(result);
      });
  },

  leave(params) {
    // TODO
    return Promise.reject("NYI");
  },

  invite(params) {
    const tokenData = _.pick(params, "room_id", "id", "email", "privilege");

    return this.isMorePrivilegedThan(Constants.Student, params.room_id, params.id).then(result => {
      if (result === false) return false;

      const user = User.retrieve({id: params.id});
      const room = db.first("name").from("room").where({id: params.room_id});

      return Promise.all([user, room]);
    }).then(result => {
      if (result == false) return false;

      const [user, room] = result;

      tokenData.roomName = room.name;
      tokenData.inviter = user.name;
      const token = keyring.createToken(tokenData, {expiresIn: "7d"});

      let { destinationUrl, tokenKey = "token" } = params;
      destinationUrl += `?${tokenKey}=${token}`;

      return mailer.sendInvitation(destinationUrl, params.email, user.name, room.name);
    });
  },

  // The user must already be registered to accept an invitation.
  // Clients should handle the registration process if needs be.
  acceptInvitation(params) {
    const { token, id } = params;

    return keyring.verifyToken(token).then(data => {
      return User.retrieve({id}).then(user => {
        if (user.email !== data.email) return false;

        return this.join({...data, id});
      });
    });
  },

  verifyInvitation(params) {
    // TODO maybe get the updated room and inviter name?
    return keyring.verifyToken(params.token);
  }
}
