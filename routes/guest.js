const express = require('express')
const router = express.Router();

const { ensureGuest } = require('../middleware/auth');

const Thought = require('../models/Thought')


/////////////////////////////
// @descrip   Guest Dashboard
// @route     GET /guest/dash
router.get('/', ensureGuest, async (req, res) => {
  try {
      res.render('guest/dashboard', {
        layout: 'guest',
      })
  } catch (error) {
    console.error(error)
    res.render('error/500')
  }
})

/////////////////////////////
// @descrip   Guest Public view thoughts
// @route     GET /guest/thoughts
router.get('/thoughts', ensureGuest, async (req, res) => {
  try {
    const thoughts = await Thought.find({ status: 'public' })
    .populate('user')
    .sort({ createdAt: 'desc'})
    .lean()
    
    res.render('guest/thoughts', {
      layout: 'guest',
      thoughts,
    })
  } catch (error) {
    console.error(error)
    res.render('error/500')
  }
})

module.exports = router