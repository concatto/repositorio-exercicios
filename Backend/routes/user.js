const express = require("express");
const auth = require("../auth");
const User = require("../entities/user");
const router = express.Router();

router.get("/", auth.authenticate(), (req, res) => {
  User.retrieve(req.user).then(result => {
    res.status(200).json(result);
  }).catch(err => {
    res.status(403).send("Stop snooping around!");
  });
});

/**
 * Registers a new user. Requires a name, an email, a username and a password
 * (in plaintext).
 */
router.post("/", (req, res) => {
  User.register(req.body).then(val => {
    res.status(200).send(val);
  }).catch(err => {
    res.status(400).send(err);
  });
});

module.exports = router;
