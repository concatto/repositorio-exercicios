const Membership = require("./membership");

module.exports = {
  isMorePrivilegedThan(value, room_id, user_id) {
    return Membership.retrieveUser(room_id, user_id, "privilege").then(row => {
      return Promise.resolve(row.privilege < value);
    });
  }
};
