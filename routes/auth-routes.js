const router = require('express').Router();
const passport = require('passport');
const User = require('../models/user-model');

// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
    User.updateOne({ googleid: req.user.googleid }, { $set: { lastlogintime: req.user.newlogintime } }).then(() => {
        req.logOut();
        res.redirect('/');
    });
});

// auth with google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile/');
});

module.exports = router;