const db = require("../db");
const Exercise = require("./exercise");
const Membership = require("./membership");
const _ = require("lodash/core");

const table = "room";

module.exports = {
  retrieve(params) {
    const { room_id, id: user_id } = params;

    // Check if the user belongs to the room
    return Membership.retrieveUser(room_id, user_id, "user_id").then(result => {
      if (result === undefined) return false;

      // Retrieve the members of the room
      const users = Membership.retrieveUsers(params);

      // Retrieve the exercises of the room
      const exercises = Exercise.retrieveFrom(params);

      // Retrieve the details about the room
      const room = db.first("*").from(table).where({id: room_id});

      return Promise.all([users, exercises, room]);
    }).then(result => {
      if (result === false) return false;

      const [users, exercises, room] = result;
      return {...room, users, exercises};
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
};
