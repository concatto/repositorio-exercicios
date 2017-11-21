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
    console.log(payload);
    return done(null, {test: "Hello world"});
  });

  passport.use(strategy);
  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate("jwt", config.jwtConfig)
  };
}

function createToken(id) {
  return jwt.sign({id: id}, config.jwtSecret);
}

function generate(req, res) {
  User.authenticate(req.body).then(id => {
    console.log("Signing a token for User", id);
    res.status(200).json({token: createToken(id)});
  }).catch(err => {
    res.status(401).send(err);
  })
}

const manager = create();

module.exports = {
  generate: generate,
  initialize: manager.initialize,
  authenticate: manager.authenticate,
  createToken: createToken
};
