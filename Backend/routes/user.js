const express = require("express");
const auth = require("../auth");
const User = require("../entities/user");
const pick = require("lodash/pick");
const Membership = require("../entities/membership");
const { sendError } = require("../utils");
const router = express.Router();

/**
 * Retrieves information about yourself.
 */
router.get("/", auth.authenticate(), (req, res) => {
  Promise.all([
    User.retrieve(req.user),
    Membership.retrieveRoomsFor(req.user)
  ]).then(results => {
    let [user, rooms] = results;

    user = pick(user, "id", "name", "username", "registered_at", "email");
    user.rooms = rooms;

    res.status(200).json(user);
  }).catch(sendError(res));
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
  }).catch(sendError(res));
});

/**
 * Validates an account with a previously signed token.
 */
router.post("/verify", (req, res) => {
  User.verify(req.body).then(result => {
    res.status(200).send(result);
  }).catch(sendError(res))
});

module.exports = router;
