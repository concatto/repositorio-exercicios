import { loadAll, create } from "./entityUtils";
import { toObject } from '../utils';

const Exercises = {
  key: "exercises",
  actions: {
    loadAll: () => dispatch => {
      loadAll(dispatch, Exercises, "exercise");
    },
    create: (name, difficulty, reward, description) => dispatch => {
      create(dispatch, Exercises, "exercise", {name, difficulty, reward, description});
    }
  },
  actionNames: {
    loadAll: "LOAD_EXERCISES",
    create: "CREATE_EXERCISE",
  }
};

const initialState = {
  data: {}
};

export const reducer = (state = initialState, action) => {
  const { loadAll } = Exercises.actionNames;

  switch (action.type) {
    case loadAll + "_SUCCEEDED":
      return {data: toObject(action.payload)};
    default:
      return state;
  }
}

export default Exercises;
