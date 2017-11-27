const db = require("../db");
const _ = require("lodash/core");

const table = "user_room";

module.exports = {
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

    return db.insert({user_id: params.id, ...vals}).into(table);
  },

  leave(params) {
    // TODO
    return Promise.reject("NYI");
  }
}
