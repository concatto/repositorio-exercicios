const db = require("../db");
const _ = require("lodash/core");

const table = "room";

module.exports = {
  retrieveFor(params) {
    return db.select("*").from("user_room").where({user_id: params.id})
      .innerJoin(table, {"room.id": "user_room.room_id"});
  },

  retrieveUsers(params) {
    const { room_id } = params;
    const cols = ["user_id"];

    return db.select(cols).from("user_room").where({room_id});
  },

  retrieve(params) {
    const { room_id } = params;

    return Promise.all([
      this.retrieveUsers(params),
      db.first("*").from(table).where({id: room_id})
    ]).then(result => {
      const [users, room] = result;
      return {...room, users};
    });
  },

  create(params) {
    const { id, name } = params;

    return db.transaction(trx => {
      const vals = {creator_id: id, name};

      // First, create the room
      return db.insert(vals).into(table).returning("id").transacting(trx).then(result => {
        // Then, join the newly created room with highest privilege
        const joinVals = {id, room_id: result[0], privilege: 0};

        return this.join(joinVals).transacting(trx);
      }).then(trx.commit)
        .catch(trx.rollback);
    });
  },

  join(params) {
    const vals = _.pick(params, "room_id", "privilege");

    return db.insert({user_id: params.id, ...vals}).into("user_room");
  },

  leave(params) {
    // TODO
    return Promise.reject("NYI");
  }
};
