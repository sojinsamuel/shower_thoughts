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
// @route     GET /stories
router.get('/', ensureAuth, async (req, res) => {
  try {
    const thoughts = await Thought.find({ status: 'public' })
    .populate('user')
    .sort({ createdAt: 'desc'})
    .lean()

    res.render('thoughts/index', {
      thoughts,
    })
  } catch (error) {
    console.error(error)
    res.render('error/500')
  }
})

/////////////////////////////
// @descrip   Show Single Thoughts
// @route     GET /stories/:id
router.get('/:id', ensureAuth, async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id).populate('user').lean()

    if(!thought) return res.render('error/404')

    res.render('thoughts/show', {thought})
  } catch (error) {
    console.error(error)
    res.render('error/404')
  }



})

/////////////////////////////
// @descrip   Show Edit Page
// @route     GET /stories/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
  try {
    const thought = await Thought.findOne({
      _id: req.params.id,
    }).lean()

    if(!thought) return res.render('error/404')

    thought.user == req.user.id ?
      res.render('thoughts/edit', { thought }) :
      res.redirect('thoughts') ;

  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})


/////////////////////////////
// @descrip   Update Story
// @route     PUT /stories/:id
router.put('/:id', ensureAuth, async (req, res) => {
  try{
    let thought = await Thought.findById(req.params.id).lean()

    if(!thought) return res.render('error/404')
      
    if(thought.user == req.user.id) {
      thought = await Thought.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      })

      res.redirect('/dash')
    } else {
      res.redirect('thoughts') ;
    }
  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})


/////////////////////////////
// @descrip   Delete Story
// @route     DELETE /stories/:id
router.delete('/:id', ensureAuth, async (req, res) => {
  try {
    await Thought.remove({_id: req.params.id})
    res.redirect('/dash')
  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})

/////////////////////////////
// @descrip   Get all thoughts from one user
// @route     GET /thoughts/user/:id
router.get('/user/:userId', ensureAuth, async (req, res) => {
  try {
    const thoughts = await Thought.find({
      user: req.params.userId,
      status: 'public',
    }).populate('user').lean()

    res.render('thoughts/index', {
      thoughts,
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

module.exports = router