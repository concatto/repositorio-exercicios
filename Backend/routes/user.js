const express = require("express");
const auth = require("../auth");
const User = require("../entities/user");
const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.body);
  res.status(200).end();
});

// name: o nome
// email: o email
// username: o nome de usuário
// password: a senha, em plaintext
router.post("/", (req, res) => {
  User.register(req.body).then(val => {
    res.status(200).send(val);
  }).catch(err => {
    res.status(400).send(err);
  });
});

module.exports = router;
