const db = require('../db');
const Exercise = require('./exercise');
const Membership = require('./membership');
const _ = require('lodash/core');

const table = 'room';

module.exports = {
  retrieve(params) {
    const { room_id, id: user_id } = params;
    const cols = ['user_id', 'privilege', 'experience', 'joined_at'];

    // Check if the user belongs to the room
    return Membership.retrieveUser(room_id, user_id, cols).then(result => {
      if (result === undefined) return false;

      // Forward the membership status of the user within the room
      const membership = Promise.resolve(result);

      // Retrieve the members of the room
      const users = Membership.retrieveUsers(params);

      // Retrieve the exercises of the room
      const exercises = Exercise.retrieveFrom(params);

      // Retrieve the details about the room
      const room = db.first('*').from(table).where({id: room_id});

      return Promise.all([membership, users, exercises, room]);
    }).then(result => {
      if (result === false) return false;

      const [membership, users, exercises, room] = result;
      return {...room, users, exercises, membership};
    });
  },

  create(params) {
    const { id, name, invitations, destinationUrl, tokenKey } = params;
    console.log(invitations);
    return db.transaction(trx => {
      const vals = {creator_id: id, name};

      // First, create the room
      return db.insert(vals).into(table).returning('id').transacting(trx)
        .then(result => {
          // Then, join the newly created room with highest privilege
          const joinVals = {id, room_id: result[0], privilege: 0};
          
          return Membership.join(joinVals).transacting(trx);
        }).then(trx.commit)
            .then(result => {
              
              const inviteAllVals = {id, room_id: joinVals.room_id, invitations, destinationUrl, tokenKey };
              return Membership.inviteAll(inviteAllVals);
            })
          .catch(trx.rollback);
    });
  },
  
  teste(params)
  {
	  const {room_id} = params;
  }
};
