class Exercises {
  getKey() {
    return "exercises";
  }

  getActions(dispatch) {
    return {
      loadAll: dispatch => {
        console.log(dispatch);
        console.log("Loading...");
      }
    };
  }
};

export default new Exercises();
