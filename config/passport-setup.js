const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleid: profile.id }).then((currentUser) => {
            if(currentUser){
                User.updateOne({ googleid: profile.id }, { $set: { newlogintime: Date().toString() } }).then(() => { done(null, currentUser); });
            } else {
                new User({
                    firstname: profile.name.givenName,
                    lastname: profile.name.familyName,
                    googleid: profile.id,
                    profilepicture: profile.photos[0].value,
                    lastlogintime: Date().toString(),
                    newlogintime: ''
                }).save().then((newUser) => { done(null, newUser); });
            }
        });
    })
)   