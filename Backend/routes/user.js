const express = require("express");
const auth = require("../auth");
const User = require("../entities/user");
const router = express.Router();

/**
 * Retrieves information about yourself.
 */
router.get("/", auth.authenticate(), (req, res) => {
  User.retrieve(req.user).then(result => {
    res.status(200).json(result);
  }).catch(err => {
    res.status(500).send(err);
  });
});

/**
 * Registers a new user. Requires a name, an email, a username and a password
 * (in plaintext).
 */
router.post("/", (req, res) => {
  User.register(req.body).then(val => {
    if (val !== false) {
      res.status(200).send(val);
    } else {
      res.status(400).send("Already exists.");
    }
  }).catch(err => {
    res.status(500).send(err);
  });
});

/**
 * Validates an account with a previously signed token.
 */
router.post("/verify", (req, res) => {
  User.verify(req.body).then(result => {
    res.status(200).send(result);
  }).catch(err => {
    res.status(500).send(err);
  })
});

module.exports = router;
