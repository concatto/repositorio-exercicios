const jwt = require("jsonwebtoken");

module.exports = {
  jwtSecret: "a25eea2094554f58a87471e3bc9815c4", //md5("REAP-UNIVALI")
  jwtConfig: {session: false},

  createToken(data, options = {}) {
    console.log("Signing a token with data:", data);
    return jwt.sign(data, this.jwtSecret, options);
  },

  verifyToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.jwtSecret, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  }
}
