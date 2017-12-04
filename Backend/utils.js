module.exports = {
  sendError(res) {
    return err => {
      console.log(err);
      res.status(500).send(err);
    }
  },
};
