const express = require('express')
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

const Thought = require('../models/Thought')

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
router.get('/dash', ensureAuth, async (req, res) => {
  try {
    const thoughts = await Thought.find({ user: req.user.id }).lean()
      res.render('dashboard', {
        name: req.user.firstName,
        thoughts
      })
  } catch (error) {
    console.error(error)
    res.render('error/500')
  }
})




module.exports = router