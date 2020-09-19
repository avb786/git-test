const passport = require('passport')
const localStratergy = require('passport-local').Strategy;
const User = require('./models/user');

passport.use(new localStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());