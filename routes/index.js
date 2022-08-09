const express = require('express')
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

/////////////////////////////
// @descrip   Login / Landing Page
// @route     GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login'
  })
})

/////////////////////////////
// @descrip   Dashboard
// @route     GET /dash
router.get('/dash', ensureAuth, (req, res) => {
  res.render('dashboard', {
    name: req.user.firstName,
  })
})


module.exports = router