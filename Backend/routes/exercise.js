const express = require("express");
const auth = require("../auth");
const Exercise = require("../entities/exercise");
const router = express.Router();

router.get("/:exercise_id", auth.authenticate(), (req, res) => {
  res.status(200).send("NYI");
});

router.post("/", (req, res) => {
  console.log(req.body);
  res.status(200).end();
});

module.exports = router;
