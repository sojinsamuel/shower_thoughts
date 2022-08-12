const express = require('express');
const passport = require('passport');
const router = express.Router();

/////////////////////////////
// @descrip   Auth with google
// @route     GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

/////////////////////////////
// @descrip   google auth callback
// @route     GET /auth/google/callback
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dash')
  }
)

/////////////////////////////
// @descrip   Auth with anonymous
// @route     GET /auth/guest
router.get('/guest', passport.authenticate( 'anonymous', { session: false }),
  (req, res) => {
    res.redirect('/guest')
  });


/////////////////////////////
// @descrip   logout user
// @route     GET /auth/logout
router.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
})

module.exports = router