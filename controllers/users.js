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
      req.flash('success', 'Welcome to YelpCamp!!');
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
  req.flash('success', 'Welcome back!!');
  const redirectUrl = req.session.returnTo || '/campgrounds';
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

// Logout
module.exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'Goodnye!!');
  res.redirect('/campgrounds');
};
