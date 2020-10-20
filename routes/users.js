const express = require('express');
const passport = require('passport');
const router = express.Router();

const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/users');

// Get a register form
router.get('/register', users.renderRegister);

// Create a user
router.post('/register', catchAsync(users.register));

// Get a login form
router.get('/login', users.renderLogin);

//  Login
router.post(
  '/login',
  passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login',
  }),
  users.login
);

// Logout
router.get('/logout', users.logout);

module.exports = router;
