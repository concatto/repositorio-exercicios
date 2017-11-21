const passport = require("passport");
const passportJWT = require("passport-jwt");
const jwt = require("jsonwebtoken");
const config = require("./config.js");

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

function generate(req, res) {
  if (req.body.username && req.body.password) {
    const token = jwt.sign({username: req.body.username, test: "Hello"}, config.jwtSecret);
    res.status(200).json({token: token});
  } else {
    res.status(401).send("Especifique usuário e senha.");
  }
}

module.exports = {
  create: create,
  generate: generate
};