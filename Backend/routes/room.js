const express = require("express");
const auth = require("../auth");
const User = require("../entities/user");
const Room = require("../entities/room");
const Membership = require("../entities/membership");
const exerciseRouter = require("./exercise");
const Constants = require("../constants");
const router = express.Router();

router.use("/:room_id/exercises", exerciseRouter);

/**
 * Retrieves all rooms that the user is a member of.
 */
router.get("/", auth.authenticate(), (req, res) => {
  Membership.retrieveRoomsFor(req.user).then(result => {
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

// /**
//  * Joins a room. The user will be assigned a privilege level of 3 (Student).
//  */
// router.post("/join/:room_id", auth.authenticate(), (req, res) => {
//   Membership.join({...req.params, ...req.user}).then(result => {
//     res.status(200).send("Joined room " + req.params.room_id);
//   }).catch(err => {
//     res.status(500).send(err);
//   });
// });
// Not so easy!

/**
 * Invites someone to join the room. The person's email and intended privilege
 * level must be specified, as well as the destination URL and token key (which
 * will be sent in an email. The client must handle the request to the specified
 * URL by themselves.)
 */
router.post("/invite/:room_id", auth.authenticate(), (req, res) => {
  Membership.invite({...req.params, ...req.body, ...req.user}).then(result => {
    if (result === false) {
      res.status(400).send("Could not invite.");
    } else {
      res.status(200).send("Invited.");
    }
  }).catch(err => {
    res.status(500).send(err);
  })
});

/**
 * Accepts a previously sent invitation. The token generated during the invitation
 * process must be presented to gain access to the room.
 */
router.post("/accept", auth.authenticate(), (req, res) => {
  Membership.acceptInvitation({...req.body, ...req.user}).then(result => {
    res.status(200).json(result);
  }).catch(err => {
    res.status(500).send(err);
  });
});

/**
 * Verifies the validity of an invitation token.
 */
router.post("/verify", (req, res) => {
  Membership.verifyInvitation(req.body).then(result => {
    res.status(200).json(result);
  }).catch(err => {
    res.status(500).send(err);
  });
});

module.exports = router;
