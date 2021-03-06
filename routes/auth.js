const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );
  
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/'); // to home page?
    }
  );
  
  app.get('/api/logout', (req, res) => {
    req.logout();
    req.session = null; // this is actually needed to clear the cookie session
    
    res.redirect('/');
  });
  
  app.get('/api/current_user', (req, res) => {
    console.log('current user');
    console.log(req.user);
    
    res.json(req.user || null); // req.user generated from cookie session and passport
  });
};

