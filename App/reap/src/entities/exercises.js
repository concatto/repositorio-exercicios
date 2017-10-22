import { loadAll, toObject } from "./entityUtils";

const Exercises = {
  key: "exercises",
  actions: {
    loadAll: () => dispatch => {
      loadAll(dispatch, Exercises, "exercise");
    }
  },
  actionNames: {
    loadAll: "LOAD_EXERCISES"
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
