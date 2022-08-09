const express = require('express')
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

const Thought = require('../models/Thought')

/////////////////////////////
// @descrip   Show Add Page
// @route     GET /stories/add
router.get('/add', ensureAuth, (req, res) => {
  res.render('thoughts/add')
})

/////////////////////////////
// @descrip   Process add form
// @route     POST /stories
router.post('/', ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id
    await Thought.create(req.body)
    res.redirect('/dash')
  } catch (error) {
    console.error(error)
    res.render('error/500')
  }
})

/////////////////////////////
// @descrip   Show All Thoughts
// @route     POST /stories
router.get('/', ensureAuth, async (req, res) => {
  try {
    const thoughts = await Thought.find({ status: 'public' })
    .populate('user')
    .sort({ createdAt: 'desc'})
    .lean()

    console.log(thoughts)

    res.render('thoughts/index', {
      thoughts,
    })
  } catch (error) {
    console.error(error)
    res.render('error/500')
  }
})

module.exports = router