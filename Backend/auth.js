const passport = require("passport");
const passportJWT = require("passport-jwt");
const jwt = require("jsonwebtoken");
const keyring = require("./keyring");
const User = require("./entities/user");

const params = {
  secretOrKey: keyring.jwtSecret,
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
    authenticate: () => passport.authenticate("jwt", keyring.jwtConfig)
  };
}

function generate(req, res) {
  User.authenticate(req.body).then(result => {
    if (result === false) {
      res.status(401).send("Invalid credentials.");
    } else if (result.verified === false) {
      res.status(403).send("Please verify your account.");
    } else {
      res.status(200).json({token: keyring.createToken({id: result.id})});
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
};
