import { loadAll, toObject } from "./entityUtils";

class Exercises {
  getKey() {
    return "exercises";
  }

  getActions() {
    return {
      loadAll: () => dispatch => {
        loadAll(dispatch, this, "exercise");
      }
    };
  }

  getActionNames() {
    return {
      loadAll: "LOAD_EXERCISES"
    };
  }
};

const initialState = {
  data: {}
};

export const reducer = (state=initialState, action) => {
  switch (action.type) {
    case "LOAD_EXERCISES_SUCCEEDED":
      return {data: toObject(action.payload)};
    default:
      return state;
  }
}

export default new Exercises();
