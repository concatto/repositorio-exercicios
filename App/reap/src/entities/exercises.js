class Exercises {
  getKey() {
    return "exercises";
  }

  getActions() {
    return {
      loadAll: () => dispatch => {
        console.log(dispatch);
        dispatch({type: "LOAD_EXERCISES"});
      }
    };
  }
};

export default new Exercises();
