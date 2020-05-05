const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const passport = require('passport');
const cookieSession = require('cookie-session');

const app = express();

app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

// Set up connection to MongoDB / Atlas
mongoose.connect(keys.mongodb.dburi, { useNewUrlParser: true, useUnifiedTopology: true });

// Set up routes from files
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// Create home route
app.get('/', (req, res) => {
    res.render('home', { user: req.user });
});

app.listen(3690, ()=> {});