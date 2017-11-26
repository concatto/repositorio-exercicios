const express = require("express");
const auth = require("../auth");
const User = require("../entities/user");
const Room = require("../entities/room");
const exerciseRouter = require("./exercise");
const Constants = require("../constants");
const router = express.Router();

router.use("/:room_id/exercises", exerciseRouter);

/**
 * Retrieves all rooms that the user is a member of.
 */
router.get("/", auth.authenticate(), (req, res) => {
  Room.retrieveFor(req.user).then(result => {
    res.status(200).json(result);
  }).catch(err => {
    res.status(500).send(err);
  });
});

/**
 * Retrieves details about the specified room. The user must be a member of the
 * room.
 */
router.get("/:room_id", auth.authenticate(), (req, res) => {
  Room.retrieve({...req.params, ...req.user}).then(result => {
    if (result === false) {
      res.status(403).send(Constants.Forbidden);
    } else {
      res.status(200).json(result);
    }
  }).catch(err => {
    res.status(500).send(err);
  });
})

/**
 * Creates a new room. The user will automatically become the owner of the
 * newly created room.
 */
router.post("/", auth.authenticate(), (req, res) => {
  Room.create({...req.body, ...req.user}).then(result => {
    res.status(200).send("Room created.");
  }).catch(err => {
    res.status(500).send(err);
  });
});

/**
 * Joins a room. The user will be assigned a privilege level of 3 (Student).
 */
router.post("/join/:room_id", auth.authenticate(), (req, res) => {
  Room.join({...req.params, ...req.user}).then(result => {
    res.status(200).send("Joined room " + req.params.room_id);
  }).catch(err => {
    res.status(500).send(err);
  });
})

module.exports = router;
