module.exports = {
	allExercises: function() {
		return "SELECT *, 1 as status FROM exercise";
	},
  createExercise: function() {
    return "INSERT INTO exercise (name, difficulty, reward, description) VALUES " +
            "(${name}, ${difficulty}, ${reward}, ${description})";
  }
};
