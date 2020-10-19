const express = require('express');
const passport = require('passport');
const router = express.Router();

const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');

// Get a register form
router.get('/register', (req, res) => {
  res.render('users/register');
});

// Create a user
router.post(
  '/register',
  catchAsync(async (req, res, next) => {
    try {
      const { email, username, password } = req.body;
      const user = new User({ email, username });
      const registeredUser = await User.register(user, password);
      req.login(registeredUser, (err) => {
        if (err) return next();
        req.flash('success', 'Welcome to YelpCamp!!');
        res.redirect('/campgrounds');
      });
    } catch (err) {
      req.flash('error', err.message);
      res.redirect('/register');
    }
  })
);

// Get a login form
router.get('/login', (req, res) => {
  res.render('users/login');
});

//  Login
router.post(
  '/login',
  passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login',
  }),
  (req, res) => {
    req.flash('success', 'Welcome back!!');
    res.redirect('/campgrounds');
  }
);

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Goodnye!!');
  res.redirect('/campgrounds');
});

module.exports = router;
