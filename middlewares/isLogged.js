const isLoggedIn = redirectTo => (req, res, next) => {
  if (req.user) return next();
  req.flash('error', 'you have no access! please login');
  req.session.returnTo = req.url;
  res.redirect(redirectTo);
}

const isLoggedOut = redirectTo => (req, res, next) => {
  if (!req.user) return next();
  req.flash('error', 'you are logged in already!');
  delete req.session.returnTo;
  res.redirect(redirectTo);
}

export {
  isLoggedIn,
  isLoggedOut
}
