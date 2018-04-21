const express = require('express');
const auth = require('../auth');
const { sendError } = require('../utils');
const compiler = require('../compiler');
const Exercise = require('../entities/exercise');

const router = express.Router();


router.post('/run', auth.authenticate(), (req, res) => {
  compiler.compileAndRun(req.body.code, req.body.extension).then(result => {
    res.status(200).send(result);
  }).catch(err => {
    res.status(500).send(err);
  });
});

router.post('/runTests', (req, res) => {
  Exercise.retrieveCases(req.body.exercise_id).then(testCases => {
    return compiler.compareCaseTest(req.body.code, req.body.extension, testCases).then(result => {
      res.status(200).send(result);
    }).catch(err => {
      res.status(500).send(err);
    });
  });
});

module.exports = router;