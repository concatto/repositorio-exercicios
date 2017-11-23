const express = require("express");
const auth = require("../auth");
const User = require("../entities/user");
const Room = require("../entities/room");
const Exercise = require("../entities/exercise");
const router = express.Router();

router.get("/", auth.authenticate(), (req, res) => {
  Room.retrieveFor(req.user).then(result => {
    res.status(200).json(result);
  }).catch(err => {
    res.status(500).send(err);
  });
});

router.get("/:room_id", auth.authenticate(), (req, res) => {
  Room.retrieve({...req.params, ...req.user}).then(result => {
    res.status(200).json(result);
  }).catch(err => {
    res.status(500).send(err);
  });
})

router.get("/:room_id/exercises", auth.authenticate(), (req, res) => {
  Exercise.retrieveFrom({...req.params, ...req.user}).then(result => {
    res.status(200).json(result);
  }).catch(err => {
    res.status(500).send(err);
  })
});

// name: o nome da sala
router.post("/", auth.authenticate(), (req, res) => {
  Room.create({...req.body, ...req.user}).then(result => {
    res.status(200).send("Room created.");
  }).catch(err => {
    res.status(500).send(err);
  });
});

router.post("/join/:room_id", auth.authenticate(), (req, res) => {
  Room.join({...req.params, ...req.user}).then(result => {
    res.status(200).send("Joined room " + req.params.room_id);
  }).catch(err => {
    res.status(500).send(err);
  });
})

module.exports = router;
