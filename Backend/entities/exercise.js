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
      const vals = _.pick(params, "id", "name", "difficulty", "base_reward", "description", "room_id", "visible");
      vals.creator_id = vals.id;
      const id_testCase = {id: 0}

      db.select("id").from(table).orderBy('id', 'desc').first().then( res => {
        vals.id = res.id + 1;
      })

      db.select("id").from("test_case").orderBy('id', 'desc').first().then( res => {
        id_testCase.id = res.id + 1;
      })



      vals.base_reward = params.reward;

      let categories = params.tags;
      let test_cases = params.testCase;

  //  console.log(categories, test_cases);

    return Membership.isMorePrivilegedThan(Constants.Student, vals.room_id, vals.id).then(res => {
      if (res !== true) return false;

      return db.transaction(trx => {
        // First, insert the exercise itself

        return trx.insert(vals).into(table).returning("id").then(res => {
          // Second, insert the categories and forward the id

          const exercise_id = res[0];

          //SUBSTITUIR O 1 PELO ID CORRETO (recebido pelo params)!!!
          categories = categories.map(category_id => {return {exercise_id, category_id:1}});
          console.log(categories);
          return trx.insert(categories).into("exercise_category").then(() => exercise_id);
        }).then(exercise_id => {
          // Third, insert the test cases
          test_cases = test_cases.map((valuesTC, index) => {
              return {
                id:id_testCase.id + index,
                exercise_id,
                input:valuesTC.input,
                output:valuesTC.output
              }
          });
          console.log(test_cases);
          return trx.insert(test_cases).into("test_case").then(() => exercise_id);
        });
      });
    });
  },

  retrieveCases(exercise_id) {
    return db.select("*").from("test_case").where({exercise_id});
  }
};
