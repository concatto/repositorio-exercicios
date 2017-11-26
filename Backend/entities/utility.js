const Room = require("./room");

module.exports = {
  isMorePrivilegedThan(value, room_id, user_id) {
    return Room.retrieveUser(room_id, user_id, ["privilege"]).then(row => {
      return Promise.resolve(row.privilege < value);
    });
  }
};
