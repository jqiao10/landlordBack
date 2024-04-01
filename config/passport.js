const PassportJWT = require('passport-jwt');
const config = require('./config');
const jwtOptions = {};
const passport = require('passport');
const Userlandlords = require('../models/userlandlords.js');

jwtOptions.jwtFromRequest = PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = config.jwtSecret;

passport.use(
  new PassportJWT.Strategy(jwtOptions, (payload, done) => {
    Userlandlords.findOne({ _id: payload.id }, (err, Userlandlords) => {
      if (err) {
        return done(err, false);
      }
      if (Userlandlords) {
        return done(null, Userlandlords);
      }
      return done(null, false);
    });
  })
);
