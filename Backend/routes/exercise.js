const express = require("express");
const auth = require("../auth");
const Exercise = require("../entities/exercise");
const Constants = require("../constants");
const router = express.Router({mergeParams: true});
// All routes come with a param named "room_id" from the parent.

// router.get("/:exercise_id", auth.authenticate(), (req, res) => {
//   res.status(200).send("NYI");
// });

/**
 * Retrieves all exercises of the current room. The user must be a member of
 * the room. Students only see visible exercises.
 */
router.get("/", auth.authenticate(), (req, res) => {
  Exercise.retrieveFrom({...req.params, ...req.user}).then(result => {
    if (result === false) {
      res.status(403).send(Constants.Forbidden);
    } else {
      res.status(200).json(result);
    }
  }).catch(err => {
    res.status(500).send(err);
  })
});

/**
 * Creates a new exercise in the current room. The user must be a member of the
 * room and needs to be either its owner, an administrator or a teacher.
 */
router.post("/", auth.authenticate(), (req, res) => {
  Exercise.create({...req.params, ...req.user, ...req.body}).then(result => {
    if (result === false) {
      res.status(403).send(Constants.Forbidden);
    } else {
      res.status(200).json(result);
    }
  }).catch(err => {
    res.status(500).send(err);
  });
});

module.exports = router;
