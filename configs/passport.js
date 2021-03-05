const passport = require('passport');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user-model');
const bcrypt = require('bcryptjs');

//Sets user in session
passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id);
});

//Gets the user from the session -> allows access thro req.user
passport.deserializeUser((userIdFromSession, cb) => {
  User.findById(userIdFromSession, (err, userDocument) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, userDocument);
  });
});

//Local authentication
passport.use(
  new LocalStrategy((username, password, next) => {
    User.findOne({ username }, (err, foundUser) => {
      if (err) {
        next(err);
        return;
      }
      if (!foundUser) {
        next(null, false, { message: 'Invalid login.' });
        return;
      }
      if (!bcrypt.compareSync(password, foundUser.password)) {
        next(null, false, { message: 'Invalid login.' });
        return;
      }
      next(null, foundUser);
    });
  })
);

//Passport - Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })
        .then(user => {
          if (user) {
            //Authenticate and persist in session
            done(null, user);
            return;
          }
          User.create({ googleId: profile.id, username: profile.displayName })
            .then(newUser => {
              //Authenticate and persist in session
              done(null, newUser);
            })
            .catch(err => done(err)); // closes User.create()
        })
        .catch(err => done(err)); // closes User.findOne()
    }
  )
);
