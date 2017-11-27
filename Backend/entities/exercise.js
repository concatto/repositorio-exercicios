const db = require("../db");
const _ = require("lodash/core");
const Util = require("./utility");
const Membership = require("./membership");
const Constants = require("../constants");
const table = "exercise";

module.exports = {
  retrieveFrom(params, cols) {
    const { room_id, id: user_id } = params;
    cols = cols || ["id", "name", "difficulty", "base_reward", "visible"];

    return Membership.retrieveUser(room_id, user_id, "privilege").then(result => {
      if (result === undefined) return false;

      const criteria = {room_id};
      if (result.privilege === Constants.Student) {
        criteria.visible = true;
      }

      return db.select("*").from(table).where(criteria);
    });
  },

  create(params) {
    const vals = _.pick(params, "id", "name", "room_id", "difficulty",
      "base_reward", "description", "visible");

    let {
      categories = [],
      test_cases = [],
    } = params;

    return Util.isMorePrivilegedThan(Constants.Student, vals.room_id, vals.id).then(res => {
      if (res !== true) return false;

      vals.creator_id = vals.id;
      delete vals.id;

      return db.transaction(trx => {
        // First, insert the exercise itself

        return db.insert(vals).into(table).returning("id").then(res => {
          // Second, insert the categories
          const exercise_id = res[0];
          categories = categories.map(category_id => {exercise_id, category_id});

          return db.insert(categories).into("exercise_category").then(() => exercise_id);
        }).then(exercise_id => {
          // Third, insert the test cases
          test_cases = test_cases.map(({input, output}) => ({exercise_id, input, output}));

          return db.insert(test_cases).into("test_case").then(() => exercise_id);
        }).then(trx.commit)
          .catch(trx.rollback);
      });
    });
  }
};
