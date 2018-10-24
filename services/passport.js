var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
var mongoose = require("mongoose");
var keys = require("../config/keys");

var User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }
      // if no record is provided
      const user = await new User({
        googleId: profile.id
      }).save();
      done(null, user);
    }
  )
);
