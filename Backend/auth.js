const passport = require("passport");
const passportJWT = require("passport-jwt");
const jwt = require("jsonwebtoken");
const config = require("./config.js");
const User = require("./entities/user");

const params = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken()
};

function create() {
  const strategy = new passportJWT.Strategy(params, function(payload, done) {
    console.log("Token:", payload);
    User.exists(payload).then(exists => {
      if (exists) {
        return done(null, {id: payload.id});
      } else {
        return done(null, false, "User no longer exists.");
      }
    }).catch(err => done(err));
  });

  passport.use(strategy);
  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate("jwt", config.jwtConfig)
  };
}

function createToken(data, options = {}) {
  console.log("Signing a token with data:", data);
  return jwt.sign(data, config.jwtSecret, options);
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}

function generate(req, res) {
  User.authenticate(req.body).then(id => {
    if (id === false) {
      res.status(401).send("Invalid credentials.");
    } else {
      res.status(200).json({token: createToken({id: id})});
    }
  }).catch(err => {
    res.status(500).send(err);
  });
}

const manager = create();

module.exports = {
  generate: generate,
  initialize: manager.initialize,
  authenticate: manager.authenticate,
  createToken: createToken,
  verifyToken: verifyToken,
};
