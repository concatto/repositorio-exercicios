const db = require("../db");
const _ = require("lodash/core");
const Membership = require("./membership");
const Constants = require("../constants");
const table = "exercise";

module.exports = {
  retrieveCaseTestsById(params) {
    const { room_id, id: exercise_id } = params;
    return db.select("*").from("test_case").where({exercise_id});
  },

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

    return Membership.isMorePrivilegedThan(Constants.Student, vals.room_id, vals.id).then(res => {
      if (res !== true) return false;

      vals.creator_id = vals.id;
      delete vals.id;

      return db.transaction(trx => {
        // First, insert the exercise itself

        return trx.insert(vals).into(table).returning("id").then(res => {
          // Second, insert the categories and forward the id
          const exercise_id = res[0];
          categories = categories.map(category_id => {exercise_id, category_id});

          return trx.insert(categories).into("exercise_category").then(() => exercise_id);
        }).then(exercise_id => {
          // Third, insert the test cases
          test_cases = test_cases.map(({input, output}) => ({exercise_id, input, output}));

          return trx.insert(test_cases).into("test_case").then(() => exercise_id);
        });
      });
    });
  }
};
