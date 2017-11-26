const db = require("../db");
const _ = require("lodash/core");
const Room = require("./room");
const Util = require("./utility");
const Constants = require("../constants");
const table = "exercise";

module.exports = {
  retrieveFrom(params) {
    const { room_id, id: user_id } = params;

    return Room.retrieveUser(room_id, user_id).then(result => {
      if (result === undefined) return false;

      return db.select("*").from(table).where({room_id});
    });
  },

  create(params) {
    const vals = _.pick(params, "id", "name", "room_id", "difficulty",
      "base_reward", "description", "visible");

    return Util.isMorePrivilegedThan(Constants.Student, vals.room_id, vals.id).then(res => {
      if (res === true) {
        vals.creator_id = vals.id;
        delete vals.id;

        return db.insert(vals).into(table).returning("id");
      } else {
        return false;
      }
    });
  }
};
