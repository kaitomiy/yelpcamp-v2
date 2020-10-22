const User = require('../models/user');

// Get a register form
module.exports.renderRegister = (req, res) => {
  res.render('users/register');
};

// Create a user
module.exports.register = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next();
      req.flash('success', `Welcome to YelpCamp, ${username}!`);
      res.redirect('/campgrounds');
    });
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/register');
  }
};

// Get a login form
module.exports.renderLogin = (req, res) => {
  res.render('users/login');
};

// Login
module.exports.login = (req, res) => {
  const redirectUrl = req.session.returnTo || '/campgrounds';
  delete req.session.returnTo;
  const { username } = req.user;
  req.flash('success', `Welcome back, ${username}!`);
  res.redirect(redirectUrl);
};

// Logout
module.exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'Goodbye...');
  res.redirect('/campgrounds');
};
