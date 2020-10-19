const express = require('express');
const router = express.Router();

const User = require('../models/user');

// Get a register form
router.get('/register', (req, res) => {
  res.render('users/register');
});

// Create a user
router.post('/register', async (req, res) => {
  res.send(req.body);
});

module.exports = router;
