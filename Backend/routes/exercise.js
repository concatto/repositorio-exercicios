const express = require('express');
const auth = require('../auth');
const { sendError } = require('../utils');
const Exercise = require('../entities/exercise');
const compiler = require('../compiler');
const Constants = require('../constants');

const router = express.Router({mergeParams: true});
// All routes come with a param named "room_id" from the parent.

// router.get("/:exercise_id", auth.authenticate(), (req, res) => {
//   res.status(200).send("NYI");
// });

/**
 * Retrieves all exercises of the current room. The user must be a member of
 * the room. Students only see visible exercises.
 */
router.get('/', auth.authenticate(), (req, res) => {
  Exercise.retrieveFrom({...req.params, ...req.user}).then(result => {
    if (result === false) {
      res.status(403).send(Constants.Forbidden);
    } else {
      res.status(200).json(result);
    }
  }).catch(sendError(res));
});

/**
 * Creates a new exercise in the current room. The user must be a member of the
 * room and needs to be either its owner, an administrator or a teacher. You must
 * specify the exercise's name, difficulty, base reward and description.
 */
router.post('/', auth.authenticate(), (req, res) => {
  Exercise.create({...req.params, ...req.user, ...req.body}).then(result => {
    if (result === false) {
      res.status(403).send(Constants.Forbidden);
    } else {
      res.status(200).json(result);
    }
  }).catch(sendError(res));
});

/**
 * Checks the submitted program for lexical, syntactic and semantic errors,
 * using the native compiler of the language. Any user may invoke this method;
 * it requires the source code and the extension of the file as parameters.
 */
router.post('/compile', auth.authenticate(), (req, res) => {
  compiler.compile(req.body.code, req.body.extension).then(result => {
    res.status(200).send(result);
  }).catch(sendError(res));
});

/**
 * Compiles and then executes the specified program, comparing against the
 * stored test cases. Requires the program and the extension.
 */
router.post('/execute/:exercise_id', (req, res) => {
  Exercise.retrieveCases(req.params.exercise_id).then(testCases => {
    console.log(testCases);
    return compiler.compareCaseTest(req.body.code, req.body.extension, testCases).then(result => {
      res.status(200).send(result);
    }).catch(sendError(res));
  });
});

module.exports = router;
