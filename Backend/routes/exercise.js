const express = require("express");
const auth = require("../auth");
const router = express.Router();

router.get("/", auth.authenticate(), (req, res) => {
  console.log(req.body);
  res.status(200).end();
});

router.post("/", (req, res) => {
  console.log(req.body);
  res.status(200).end();
});

module.exports = router;
